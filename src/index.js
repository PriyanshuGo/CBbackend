import connectDB from "./dbConnection/db.js";
import { app } from "./app.js";
import dotenv from "dotenv"


dotenv.config();


connectDB().then(() => {
    app.listen(process.env?.PORT || 8000, () => {
        console.log(`🚀 Server running on port ${process.env?.PORT || 8000} in ${process.env.NODE_ENV} mode`);
    });
})
    .catch((err) => {
        console.log("MongoDB connection Failed!!", err);
    })