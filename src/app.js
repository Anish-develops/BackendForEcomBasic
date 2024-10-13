import express from "express";
import { ApiResponse } from "./utils/apiResponse.js";
import cors from "cors";


const app = express();

app.use(cors)

app.use(express.json(
    {
        limit:"32kb"
    }
))

app.use(express.urlencoded({extended: true , limit:"32kb"}))

app.use(express.static("public"))


app.get('/', (req, res) => {
    res.status(201).json(new ApiResponse(200 , {name : "anish"}, "lets see"))
});

import productRouter from './routes/product.route.js'
import userRouter from "./routes/user.route.js";
import cartRouter from "./routes/cart.route.js";

app.use("/api" , productRouter);

app.use("/api",userRouter);

app.use("/api",cartRouter)




export default app;

