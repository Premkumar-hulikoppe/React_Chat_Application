const asyncHandler = require("express-async-handler");
const ChatModel = require("../models/chatModel");
const MessageModel = require("../models/messageModel");
const UserModel = require("../models/userModel");

const sendMessage = asyncHandler(async (req, res) => {
  const { chatId, content } = req.body;

  if (!chatId || !content) {
    throw new Error("Invalid data into request body");
    res.sendStatus(400);
  }
  try {
    var newMessage = {
      sender: req.user._id,
      content: content,
      chat: chatId,
    };
    var message = await MessageModel.create(newMessage);
    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await UserModel.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });
    await ChatModel.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });
    res.status(200).send(message);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

const allMessages = asyncHandler(async (req, res) => {
  try {
    const message = await MessageModel.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.status(200).send(message);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
module.exports = { sendMessage, allMessages };
