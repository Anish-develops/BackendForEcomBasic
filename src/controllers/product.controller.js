// controllers/product.controller.js
import { Product } from "../models/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiErrors.js";
import { ApiResponse } from "../utils/apiResponse.js";

const registerProduct = asyncHandler(async (req, res) => {
    const { id, name, price, description, imageUrl, averageRating } = req.body;

    // Creating a new product
    const product = await Product.create({
        id,
        name,
        price,
        description,
        imageUrl,
        averageRating,
    });

    // Retrieving the created product using _id
    const createdProduct = await Product.findById(product._id);

    if (!createdProduct) {
        throw new ApiError(500, "Product not created");
    }

    return res
        .status(201)
        .json(
            new ApiResponse(201, createdProduct, "Product created successfully")
        );
});

const registerProductMany = asyncHandler(async (req, res) => {
    const productArray = req.body;

    if (!Array.isArray(productArray) || productArray.length == 0) {
        throw new ApiError(400, "array is not inserted");
    }

    const createdProducts = await Product.insertMany(productArray);

    if (!createdProducts || createdProducts.length === 0) {
        throw new ApiError(500, "Products could not be created");
    }

    return res
        .status(201)
        .json(
            new ApiResponse(
                200,
                createdProducts,
                "products created successfully"
            )
        );
});

const registerMultipleProducts = asyncHandler(async (req, res) => {
    const productsArray = req.body; // Assuming req.body contains an array of products

    if (!Array.isArray(productsArray) || productsArray.length === 0) {
        throw new ApiError(
            400,
            "Input should be a non-empty array of products"
        );
    }

    // Bulk create products using insertMany for efficiency
    const createdProducts = await Product.insertMany(productsArray);

    if (!createdProducts || createdProducts.length === 0) {
        throw new ApiError(500, "Products could not be created");
    }

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                createdProducts,
                "Products created successfully"
            )
        );
});

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});

    if (!products || products.length === 0) {
        throw new ApiError(500, "products not found");
    }
    

    return res
        .status(200)
        .json(new ApiResponse(200, products, "products fetched successfully"));
});

const findProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    console.log(id);


    const findedProduct = await Product.findOne({ id });

    if (!findedProduct) {
        throw new ApiError(500 , "product couldn't be found");
    }

    return res.status(200).json(
        new ApiResponse(200 , findedProduct , "product found succesfully")
    )


});

export {
    registerProduct,
    registerMultipleProducts,
    registerProductMany,
    getProducts,
    findProduct,
};
