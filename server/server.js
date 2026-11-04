import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import WasteListing from "./models/WasteListing.js";
import upload from './config/upload.js';
import uploadToCloudinary from "./utils/uploadToCloudinary.js";


const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));


const listings = [
    
       { 
        type:"Maize Stalks",
        category: "Crop Residue",
        description:"Fresh and high-quality maize stalks available for livestock bedding and fuel",
        price: 100,
        unit:"bag",
        location: "Nyeri",
        image:"http://localhost:5000/images/Maize_stalks_-_geograph.org.uk_-_5359105.jpg"
    },

       {
         type:"Coffee Husks",
        category:"Food Processing Waste",
        description: "quality coffee husks that can be used for compost manure and biofuel",
        price: 120,
        unit: "bag",
        location:"Kiambu",
        image:"http://localhost:5000/images/Coffee_husks.JPG"
    },

        {
        type:"Cow Manure",
        category: "Animal Waste",
        description:"quality cow manure that can be used as fertilizer for the farm",
        price: 150,
        unit:"bag",
        location: "Nakuru",
        image:"http://localhost:5000/images/Cow_and_Buffalo_Dung_As_Manure.jpg"
    }
    
]


app.get("/api/test",(req,res)=>{
    res.send("AgriSmart API is running")
});

app.get('/api/listings', async (req,res) => {
   try {
    const listings = await WasteListing.find();
    res.json(listings)
   } catch(error) {
    console.error("Error fetching listings:", error.message);

    res.status(500).json({
        message: "Failed to fetch waste listings",
    });
   }
});

app.post("/api/listings", (req,res,next) =>{
    upload.single("image")(req,res,(error) => {
        if (error) {
            if (error instanceof Error && error.name === "MulterError") {
                const status = error.code === "LIMIT_FILE_SIZE" ? 413 :400;

                return res.status(status).json({
                    message:
                    status === 413
                    ? "Image must not exceed 5 MB."
                    : error.message,
                });
            }

            return res.status(400).json({
                message: error.message || "Invalid image upload.",
            });
        }

        next();
    });
}, async (req,res) => {try {
    const {type, category, description, price, unit, location} = req.body;
    if(
        !type?.trim() ||
        !category?.trim() ||
        !description?.trim() ||
        price === undefined || 
        price.trim?.() === "" ||
        !unit?.trim() ||
        !location?.trim()
    ){
        return res.status(400).json({
            message: "Please Provide all required listing fields.",
        });
    }
    const numericPrice = Number(price);

    if(!Number.isFinite(numericPrice) || numericPrice <0) {
        return res.status(400).json({
            message: "Price must be a vaid non-negative number.",
        });
    }

    if(!req.file){
        return res.status(400).json({
            message: "Please select an image for your listing.",
        });
    }

    const imageResult = await uploadToCloudinary(req.file.buffer);

    const listing = await WasteListing.create({
        type: type.trim(),
        category: category.trim(),
        description: description.trim(),
        price: numericPrice,
        unit: unit.trim(),
        location: location.trim(),
        image: imageResult.secure_url,
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
});

async function startServer() {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}


startServer();