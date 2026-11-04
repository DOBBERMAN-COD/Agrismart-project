import mongoose from "mongoose";
import connectDB from "../config/db.js";
import WasteListing from "../models/WasteListing.js";

const sampleListings = [
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
      "Quality coffee husks that can be used for compost manure and biofuel",
    price: 120,
    unit: "bag",
    location: "Kiambu",
    image: "http://localhost:5000/images/Coffee_husks.JPG",
  },
  {
    type: "Cow Manure",
    category: "Animal Waste",
    description:
      "Quality cow manure that can be used as fertilizer for the farm",
    price: 150,
    unit: "bag",
    location: "Nakuru",
    image:
      "http://localhost:5000/images/Cow_and_Buffalo_Dung_As_Manure.jpg",
  },
];

async function seedListings() {
    try {
        await connectDB();

        //Update matching records or insert them if they don't exist
        for (const listing of sampleListings) {
            await WasteListing.updateOne(
                {type: listing.type }, 
                { $set:listing },
                { upsert: true, runValidators:true}
            );
        }

        console.log("Sample listings seeded successfully");
    } catch (error) {
        console.error("Seeding failed", error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
}

seedListings();