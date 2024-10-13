import { Router } from "express";


import { registerUser } from "../controllers/user.controller.js"; 

import { addToCart, viewCart } from "../controllers/cart.controller.js";


const router = Router();


router.route("/register-user").post(registerUser)

//router.route("/user-cart").post(addToCart)



export default router;