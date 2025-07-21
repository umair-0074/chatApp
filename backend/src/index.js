import express from "express";
import dotenv from "dotenv";
import authroute from "./routes/authroute.js";
import messageroutes from "./routes/messageroute.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/auth", authroute);
app.use("/api/messages", messageroutes);

server.listen(PORT, () => {
  console.log("server is running on PORT :" + PORT);
  connectDB();
});
