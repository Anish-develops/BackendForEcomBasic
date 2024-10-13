import { Router } from "express";
import {
    registerProduct,
    registerMultipleProducts,
    registerProductMany,
    getProducts,
    findProduct
} from "../controllers/product.controller.js";

const router = Router();


router.route("/post-products").post(registerProduct);
router.route("/post-products-many").post(registerProductMany);
router.route("/get-products").get(getProducts);
router.route("/get-product/:id").get(findProduct);



export default  router;