import jwt from "jsonwebtoken";
import { Users } from "../models/usersModels.js";

export const authorization = async (req,res,next) => {
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1]
      console.log(req.headers.authorization)
      const decode = jwt.verify(token, process.env.SECRET_KEY)
      req.user = await Users.findById(decode.userId).select("-password")
      next()
    } catch(error) {
      res.status(401).json({message: error.message})
    }
  }

  if(!token) {
    res.status(401).json({message: "Not Authorized"})

  }
}