const mongoose = require("mongoose");

const chatSchema = new Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, defualt: false },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
  },
  {
    versionKeys: false,
    timeStamps: true,
  }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;

// schema for a chat model contains
// chatName
// isGroupChat
// users
// groupAdmin
// latestMessage
