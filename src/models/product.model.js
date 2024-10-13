// models/product.model.js
import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
    {
        id: { type: String, require: true },
        name: { type: String, required: true },
        price: { type: Number, required: true }, // Changed to Number
        description: { type: String, required: true },
        imageUrl: { type: String, required: true },
        averageRating: { type: Number, default: 0, min: 0, max: 5 }, // Changed to Number with default and min/max validations
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields automatically
    }
);

export const Product = mongoose.model("Product", productSchema);
