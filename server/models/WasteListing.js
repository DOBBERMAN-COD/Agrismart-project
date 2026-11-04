import mongoose from "mongoose";

const wasteListingSchema = new mongoose.Schema({
    type:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true, 
    },
    price: {
        type:Number,
        required: true,
        min: 0,
    },
    unit: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
});

const WasteListing = mongoose.model(
    "WasteListing",
    wasteListingSchema
);

export default WasteListing;