import mongoose from "mongoose";

const usersModel = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  picture:{ type: String, default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"}
},
  {
  timestamps:true
  },
  { versionKey: false })

export const Users = mongoose.model("Users",usersModel)