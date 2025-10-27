import express from "express";
import cors from "cors"
import dotenv from "dotenv"

const app = express();


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



export { app };