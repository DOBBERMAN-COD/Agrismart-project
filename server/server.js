import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import WasteListing from "./models/WasteListing.js";
import upload from "./config/upload.js";
import uploadToCloudinary from "./utils/uploadToCloudinary.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import { protect } from "./middleware/authMiddleware.js";

const app = express();
const PORT = 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use(express.static("public"));

const listings = [
  {
    type: "Maize Stalks",
    category: "Crop Residue",
    description:
      "Fresh and high-quality maize stalks available for livestock bedding and fuel",
    price: 100,
    unit: "bag",
    location: "Nyeri",
    image:
      "http://localhost:5000/images/Maize_stalks_-_geograph.org.uk_-_5359105.jpg",
  },

  {
    type: "Coffee Husks",
    category: "Food Processing Waste",
    description:
      "quality coffee husks that can be used for compost manure and biofuel",
    price: 120,
    unit: "bag",
    location: "Kiambu",
    image: "http://localhost:5000/images/Coffee_husks.JPG",
  },

  {
    type: "Cow Manure",
    category: "Animal Waste",
    description:
      "quality cow manure that can be used as fertilizer for the farm",
    price: 150,
    unit: "bag",
    location: "Nakuru",
    image: "http://localhost:5000/images/Cow_and_Buffalo_Dung_As_Manure.jpg",
  },
];

app.get("/api/test", (req, res) => {
  res.send("AgriSmart API is running");
});

app.get("/api/listings/mine", protect, async (req,res) => {
  try{
    // Only farmers should access this endpoint
    if(req.user.role !== "farmer") {
      return res.status(403).json({
        message: "Only farmers can access their listings.",
      });
    }

    // Find listings belonging to the logged-in farmer.
    const listings = await WasteListing.find({
      farmer: req.user.userId,
    });

    return res.status(200).json({listings});
  }catch (error) {
    console.error("Error fetching farmer listings:", error.message);

    return res.status(500).json({
      message: "Failed to fetch your listings.",
    });
  }
});

app.get("/api/listings", async (req, res) => {
  try {
    const listings = await WasteListing.find();
    res.json(listings);
  } catch (error) {
    console.error("Error fetching listings:", error.message);

    res.status(500).json({
      message: "Failed to fetch waste listings",
    });
  }
});

app.put("/api/listings/:id", protect, async (req, res) => {
  try {
    const listing = await WasteListing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        message: "Waste listing not found.",
      });
    }

    if (
      req.user.role !== "farmer" ||
      listing.farmer.toString() !== req.user.userId
    ) {
      return res.status(403).json({
        message: "You are not authorized to edit this listing.",
      });
    }

    const allowedFields = [
      "type",
      "category",
      "description",
      "price",
      "unit",
      "location",
    ];
    const body = req.body ?? {};
    const fieldsToUpdate = allowedFields.filter(
      (field) => body[field] !== undefined,
    );

    if (fieldsToUpdate.length === 0) {
      return res.status(400).json({
        message: "Please provide at least one listing field to update.",
      });
    }

    for (const field of fieldsToUpdate) {
      const value = body[field];

      if (field === "price") {
        const numericPrice = Number(value);
        if (
          (typeof value !== "number" && typeof value !== "string") ||
          (typeof value === "string" && !value.trim()) ||
          !Number.isFinite(numericPrice) ||
          numericPrice < 0
        ) {
          return res.status(400).json({
            message: "Price must be a valid non-negative number.",
          });
        }

        listing.price = numericPrice;
      } else {
        if (typeof value !== "string" || !value.trim()) {
          return res.status(400).json({
            message: `${field} must be a non-empty string.`,
          });
        }

        listing[field] = value.trim();
      }
    }

    await listing.save();

    return res.status(200).json({
      message: "Waste listing updated successfully.",
      listing,
    });
  } catch (error) {
    console.error("Error updating listing:", error.message);

    return res.status(500).json({
      message: "Failed to update waste listing.",
    });
  }
});

app.delete("/api/listings/:id", protect, async (req, res) => {
  try {
    const listing = await WasteListing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        message: "Waste listing not found.",
      });
    }

    if (
      req.user.role !== "farmer" ||
      listing.farmer.toString() !== req.user.userId
    ) {
      return res.status(403).json({
        message: "You are not authorized to delete this listing.",
      });
    }

    await WasteListing.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      message: "Waste listing deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting listing:", error.message);

    return res.status(500).json({
      message: "Failed to delete waste listing.",
    });
  }
});

app.post(
  "/api/listings",
  protect,

  // Onlu farmers are allowed to create waste listings
  (req, res, next) => {
    if (req.user.role !== "farmer") {
      return res.status(403).json({
        message: "Only farmers can create waste listings.",
      });
    }

    next();
  },

  // validate and process the uploaded image
  (req, res, next) => {
    upload.single("image")(req, res, (error) => {
      if (error) {
        if (error instanceof Error && error.name === "MultiError") {
          const status = error.code === "LIMIT_FILE_SIZE" ? 413 : 400;

          return res.status(status).json({
            message:
              status === 413 ? " Image must not exceed 5 MB." : error.message,
          });
        }

        return res.status(400).json({
          message: error.message || "Invalid image upload.",
        });
      }

      next();
    });
  },
  async (req, res) => {
    try {
      const { type, category, description, price, unit, location } = req.body;

      if (
        !type?.trim() ||
        !category?.trim() ||
        !description?.trim() ||
        price === undefined ||
        price.trim?.() === "" ||
        !unit?.trim() ||
        !location?.trim()
      ) {
        return res.status(400).json({
          message: "Please Provide all required listing fields.",
        });
      }
      const numericPrice = Number(price);

      if (!Number.isFinite(numericPrice) || numericPrice < 0) {
        return res.status(400).json({
          message: "Price must be a valid non-negative number.",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          message: "Please select an image for your listing.",
        });
      }

      app.put("/api/listings/:id", protect, async (req, res) => {
        try {
          const listing = await WasteListing.findById(req.params.id);

          if (!listing) {
            return res.status(404).json({
              message: "Waste listing not found.",
            });
          }

          //Check whether the logged-in farmer owns this listing
          if (listing.farmer.toString() !== req.user.userId) {
            return res.status(403).json({
              message: "You are not authorized to edit this listing.",
            });
          }

          // Only allow these fields to be updated
          const allowedFields = [
            "type",
            "category",
            "description",
            "price",
            "unit",
            "location",
          ];

          for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
              listing[field] = req.body[field];
            }
          }

          await listing.save();

          return res.status(200).json({
            message: "Waste listing updated successfully.",
            listing,
          });
        } catch (error) {
          console.error("Error updating listing:", error.message);

          return res.status(500).json({
            message: "Failed to update waste listing.",
          });
        }
      });

      app.delete("/api/listings/:id", protect, async (req, res) => {
        try {
          const listing = await WasteListing.findById(req.params.id);

          if (!listing) {
            return res.status(404).json({
              message: "Waste listing not found",
            });
          }

          //Verify listing ownership
          if (!listing.farmer.toString() !== req.user.userId) {
            return res.status(403).json({
              message: "You are not authorized to delete this listing.",
            });
          }

          await WasteListing.findByIdAndDelete(req.params.id);

          return res.status(200).json({
            message: "Waste listing deleted successfully.",
          });
        } catch (error) {
          console.error("Error deleting listing.", error.message);

          return res.status(500).json({
            message: "Failed to delete waste listing.",
          });
        }
      });

      const imageResult = await uploadToCloudinary(req.file.buffer);

      const listing = await WasteListing.create({
        type: type.trim(),
        category: category.trim(),
        description: description.trim(),
        price: numericPrice,
        unit: unit.trim(),
        location: location.trim(),
        image: imageResult.secure_url,

        //Link this listing to the authenticated farmer
        farmer: req.user.userId,
      });

      return res.status(201).json({
        message: "Waste listing created successfully.",
        listing,
      });
    } catch (error) {
      console.error("Error creating listing:", error.message);

      return res.status(500).json({
        message: "Failed to create waste listing.",
      });
    }
  },
);

async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
