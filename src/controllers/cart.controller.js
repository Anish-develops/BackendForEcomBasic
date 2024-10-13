import { User } from "../models/user.model.js";
import { Product } from "../models/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiErrors.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { query } from "express";

const addToCart = asyncHandler(async (req, res) => {
    const { userId, productId } = req.body;

    // Find the user by their custom id
    const user = await User.findOne({ id: userId });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Find the product by its custom id
    const product = await Product.findOne({ id: productId });

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    // Add the product's ObjectId (_id) to the user's cart

    user.cart.push(product._id);

    // Save the updated user document
    await user.save();

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Product added to cart"));
});

const viewCart = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    // Find the user and populate the cart with product details
    const user = await User.findOne({ id: userId }).populate("cart");

    if (!user) {
        throw new ApiError(404, `User with ID ${userId} not found`);
    }

    return res
        .status(200)
        .json(new ApiResponse(200, user.cart, "Cart fetched successfully"));
});

// const removeFromCart = asyncHandler(async (req, res) => {
//     const { userId, productId } = req.body;

//     // Find the user by their custom id
//     const user = await User.findOne({ id: userId });

//     if (!user) {
//         throw new ApiError(404, "User not found");
//     }

//     // Find the product by its custom id
//     const product = await Product.findOne({ id: productId });

//     if (!product) {
//         throw new ApiError(404, "Product not found");
//     }

//     const productToRemove = product._id;

//     user.cart = user.cart.filter((cartItem) => cartItem != productToRemove);

//     // Save the updated user document
//     await user.save();

//     return res
//         .status(200)
//         .json(
//             new ApiResponse(
//                 200,
//                 user.cart,
//                 "Product removed from cart successfully"
//             )
//         );
// });
const removeFromCart = asyncHandler(async (req, res) => {
    const { userId, productId } = req.body;

    // Find the user by their custom id
    const user = await User.findOne({ id: userId });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Find the product by its custom id
    const product = await Product.findOne({ id: productId });

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    const productToRemove = product._id;

    // Filter out the product from the user's cart
    user.cart = user.cart.filter(
        (cartItem) => cartItem.toString() !== productToRemove.toString()
    );

    // Save the updated user document
    await user.save();

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                user.cart,
                "Product removed from cart successfully"
            )
        );
});


export { addToCart, viewCart, removeFromCart };
