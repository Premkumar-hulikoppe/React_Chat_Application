// Jai shreeram Jai devi Jaganmata
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const chats = require("./data/data");

dotenv.config();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("api is running");
});

app.get("/api/chats", (req, res) => {
  res.send(chats);
});

app.get("/api/chats/:id", (req, res) => {
  const singleChat = chats.find((e) => e._id === req.params.id);
  res.send(singleChat);
});

app.listen(PORT, (req, res) => {
  console.log(`port ${PORT} is running successfully`);
});

//  updated
