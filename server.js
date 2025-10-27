import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  console.log("🟢 A user connected");

  socket.on("joinRoom", (room) => {
    socket.join(room);
    socket.room = room;
    socket.username = "User" + Math.floor(Math.random() * 1000);
    socket.to(room).emit("message", `${socket.username} joined the room.`);
  });

  socket.on("chatMessage", (msg) => {
    io.to(socket.room).emit("message", `${socket.username}: ${msg}`);
  });

  socket.on("disconnect", () => {
    if (socket.room) {
      io.to(socket.room).emit("message", `${socket.username} left the chat.`);
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
