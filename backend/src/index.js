import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import todoRoutes from "./routes/todo.routes.js";

dotenv.config();
const PORT = 5000;
const app = express();
const MONGO_URL = process.env.MONGO_URL;

console.log(MONGO_URL);

//conecting mongodb
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log("MongoDB Connection Failed"));

const allowedOrigins = ["http://localhost:5173"];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());

//routes
app.use("/api/todo", todoRoutes);
app.use("/api/user", todoRoutes);
app.listen(PORT, (req, res) => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
