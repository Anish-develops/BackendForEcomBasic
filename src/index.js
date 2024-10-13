
import app from "./app.js";
import connectDB from "./db/index.js";

const PORT = process.env.PORT || 3000;

app.on("error", (error) => {
    console.log("ERROR", error);
    throw error;
});

connectDB().then(
    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);
    })
).catch((error) => {
    console.log(error);
}); 



