import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import { errorHandler } from "./middlewares/error.middleware.js";
import userRouter from "./routes/user.route.js";


const app = express();

// Routes

dotenv.config(); // Automatically loads from cbbackend/.env



app.use(
  cors({
    origin: process.env?.ORIGIN, // frontend origin
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true, // if using cookies or auth headers
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ✅ Routes with prefix
app.use(`${process.env.API_PREFIX}/user`, userRouter);

//after all routes
app.use(errorHandler);

export { app };