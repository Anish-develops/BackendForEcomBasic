import mongoose from "mongoose";

import { dbname } from "../constants.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}/${dbname}`
        );

        console.log(
            `MONGOOSE CONNECTED SUCCESSFULLY TO MONGODB !!!!!!!!!!!!`,
            `${connectionInstance.connection.host}`
        );
    } catch (error) {
        console.log("error occured while connecting  to database");

        process.exit(1);
    }
};

export default connectDB;
