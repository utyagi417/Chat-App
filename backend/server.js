import path from "path"
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"

import connectToDB from "./database/mongoDB.js";
import { app, server } from "./socket/socket.js";


const __dirname = path.resolve();

dotenv.config();


app.use(cors());
const PORT = process.env.PORT || 5000


app.use(express.json()); // to parse the incoming requests with JSON payloads from req.body
app.use(cookieParser());  // to access the cookies

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);


app.use(express.static(path.join(__dirname, "/frontend/dist")));

// run frontend from server both at same localhost i.e 5000 for this project
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
})


server.listen(PORT, () => {
    connectToDB();
    console.log(`listening on port ${PORT}`)
});

