import mongoose from "mongoose";

const messageModel = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  content: { type: String, trim: true } ,
  chat:{ type: mongoose.Schema.Types.ObjectId, ref: "Chat"},
},
  {
  timestamps:true
},{ versionKey: false })

export const Message = mongoose.model("Message", messageModel)