import { Chat } from "../models/chatModel.js";
import { Message } from "../models/messageModel.js";
import { Users } from "../models/usersModels.js";
import { allChatValidation } from "../validators/index.js";


export const allMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


export const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;
  try {
    await allChatValidation.validate(req.body)
    var newMessage = {
      sender: req.user._id,
      content: content,
      chat: chatId,
    };
    let message = await Message.create(newMessage); 
    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await  Users.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { messages: message });

    res.json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
