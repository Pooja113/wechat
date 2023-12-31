import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Users } from "../models/usersModels.js"
import { loginValidaton, registerValidation } from '../validators/index.js'

export const registerController = async (req, res) => {
  try {
    const { name, email, password, pic } = req.body
    await registerValidation.validate(req.body)
    const usersData = await Users.findOne({ email }) 

    if (usersData) {
      res.status(400).json({ message: " Email already exits !!"})
    }
    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(password, salt)

    const newUser = await Users.create({
      name,
      email,
      password: hasedPassword,
      picture: pic,
    })

    const token = jwt.sign({ userId: newUser._id, email }, process.env.SECRET_KEY, {
      expiresIn:"1d"
    })

    if (newUser) {
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email : newUser.email,
        picture: newUser.picture,
        token
      })
    }
  } catch (error) {
    res.status(400).json({message: error.message})
  }

}

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body
    await loginValidaton.validate(req.body)
    const usersData = await Users.findOne({ email }) 
  
    if(!usersData) {
      res.status(400).json({ message: "User does not exit"})
    }
  
    const checkPass = await bcrypt.compare(password, usersData.password)
  
    if (!checkPass) {
      res.status(400).json({message: " Wrong Credentials"})
    }
  
    const token = jwt.sign({ userId: usersData._id, email }, process.env.SECRET_KEY, {
      expiresIn:"1d"
    })

    res.status(200).json({
      _id: usersData._id,
      name: usersData.name,
      email : usersData.email,
      picture: usersData.picture,
      token
    })
    
  } catch (error) {
    res.status(400).json({message: error.message})
  }
 

}


export const allUsers = async (req, res) => {
  try {
    const search = req.query.search ? {
      $or: [
        { name: {$regex: req.query.search, $options:"i"}},
        {email: {$regex: req.query.search, $options:"i"} }
      ]
    } : {}
    

    const users = await Users.find(search).find({_id: {$ne: req.user.id}})
    res.status(200).send(users)
    
  } catch (error) {
    res.status(400).json({message: error.message})
  }
 

}