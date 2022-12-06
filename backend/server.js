// Jai shreeram Jai devi Jaganmata
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const chats = require("./data/data");
const connect = require("./config/db");
const colors = require("colors");
const userRoutes = require("./Routes/userRoutes");
const chatRoutes = require("./Routes/chatRoutes");
const cors = require("cors");
const { notFound, errorHandler } = require("./middlewares/errorMiddleWare");
const messageRoutes = require("./Routes/messgeRoutes");

dotenv.config();
app.use(cors());
app.use(express.json()); // to make server to accept json data
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("api is running");
});

app.use("/api/user", userRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);

app.use(notFound);
app.use(errorHandler);

const server = app.listen(PORT, async (req, res) => {
  try {
    connect();
    console.log(`port ${PORT} is running successfully`.green.bold);
  } catch (err) {
    console.log(`Error: ${err.message}`.red.bold);
  }
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log("user id", userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room); // room is a selected chat at client
    console.log("user joined room : ", room);
  });

  // for typing indicator
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  // send or new message
  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;
    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) {
        return;
      } else {
        socket.in(user._id).emit("message recieved", newMessageRecieved);
      }
    });
  });
});
//  updated
