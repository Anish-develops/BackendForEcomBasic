import { User } from "../models/user.model.js";

import { asyncHandler } from "../utils/asyncHandler.js";

import { ApiError } from "../utils/apiErrors.js";

import { ApiResponse } from "../utils/apiResponse.js";


const registerUser = asyncHandler( async (req , res)=>{

    const {name , id} = req.body;


    const existingUser = await User.findOne({id});
    if(existingUser){
        throw new ApiError(400 , "user already exisit");
    }
    
    const user = await User.create({
        name,
        id,
        cart:[],
    })

    const createdUser = await User.findById(user._id);

    if(!createdUser){
        throw new ApiError(500 , "the user didn't get created please check your process")
    }
    return res.status(201).json(
        new ApiResponse(200 , createdUser , "user created succesfully")
    )


})




export {registerUser};

