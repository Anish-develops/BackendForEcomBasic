// routes/user.route.js
import express from "express";
import { addToCart, removeFromCart, viewCart } from "../controllers/cart.controller.js";

const router = express.Router();

// Add route to view cart


// router.get("/users/:userId/cart", viewCart);

router.route("/user/add-to-cart").post(addToCart);


router.route("/users/:userId/cart").get(viewCart);

router.route("/users/:userId/cart").delete(removeFromCart);

export default router;
