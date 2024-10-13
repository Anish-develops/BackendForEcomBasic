import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        id: { type: String, required: true },
        cart: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    },
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
