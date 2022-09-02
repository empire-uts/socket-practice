const express = require("express");
const app = express();

const http = require("http");
const server =http.createServer(app);
const { Server, Socket } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
    },
});

const PORT = 5000;

// クライアントと通信
io.on("connection", (socket) => {
    console.log("Connected to the client!");

    socket.on("send_message", (data) => {
        console.log(data);

        io.emit("received_message", data);
    });

    socket.on("disconnect", () => {
        console.log("Disconnected to the client!");
    });
})

server.listen(PORT, () => console.log(`server is running on ${PORT}`));