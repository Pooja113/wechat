import bcrypt from 'bcryptjs'
import { Users } from "../models/usersModels.js"

export const registerController = async (req, res) => {
  console.log(req)
  try {
    const { name, email, password, pic } = req.body
  
    const usersData = await Users.findOne({ email }) 
    if (usersData) {
      res.status(400).json({ message: " Email alreay exits !!"})
    }
    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(password, salt)
  
    const newUser = await Users.create({
      name,
      email,
      password: hasedPassword,
      picture: pic
    })
  
    if (newUser) {
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email : newUser.email,
        picture: newUser.picture,
      })
    }
  } catch (error) {
    res.status(400).json({message: error.message})
  }

}

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body
  
    const usersData = await Users.findOne({ email }) 
  
    if(!usersData) {
      res.status(400).json({ message: "User does not exit"})
    }
  
    const checkPass = await bcrypt.compare(password, usersData.password)
  
    if (!checkPass) {
      res.status(400).json({message: " Wrong Credentials"})
    }
  
    res.status(200).json({
      _id: usersData._id,
        name: usersData.name,
        email : usersData.email,
        picture: usersData.picture,
    })
    
  } catch (error) {
    res.status(400).json({message: error.message})
  }
 

}