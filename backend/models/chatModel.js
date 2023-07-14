import mongoose from 'mongoose'

const chatModel = new mongoose.Schema({
  chatName: { type: String, trim: true },
  isGroupChat: { type: Boolean, default: false },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
  messages: { type: mongoose.Schema.Types.ObjectId, ref: "Messages" },
  groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "Users" }
},
  {
  timestamps: true,
  },
  { versionKey: false });

export const Chat = mongoose.model("Chat", chatModel)
