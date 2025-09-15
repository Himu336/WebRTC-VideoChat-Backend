import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import ServerConfig from "./config/serverConfig.js";
import roomHandler from "./handlers/roomHandler.js";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
    roomHandler(socket); // pass the socket to the room handler for room creation and joining
    socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
    });
});

server.listen(ServerConfig.PORT, () => {
    console.log(`Server is running on port ${ServerConfig.PORT}`);
});
