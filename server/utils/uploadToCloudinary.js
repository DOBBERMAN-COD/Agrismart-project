import { Readable } from "node:stream";
import cloudinary from "../config/cloudinary.js";

function uploadToCloudinary(buffer) {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "agrismart/waste-listings",
                resource_type: "image",
            },
            (error,result) => {
                if (error) {
                    return reject(error);
                }

                resolve(result);
            }
        );

        Readable.from(buffer).pipe(uploadStream);
    });
}

export default uploadToCloudinary;