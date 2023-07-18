import { Chat } from "../models/chatModel.js"
import { Users } from "../models/usersModels.js"

export const createChat = async (req, res) => {
  const { userId } = req.body
  if (!userId) {
    res.status(400).json({message: "User Id is required"})
  }
  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user.id } } },
      { users: {$elemMatch: { $eq: userId }}}
    ]
  }).populate("users", "-password").populate("messages")
  
  isChat = await Users.populate(isChat, {
    path: 'messages.sender',
    select: "name pic email",
  })

  if(isChat.length>0) {
    res.status(200).json({ data: isChat[0]})
  } else {
    let chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user.id, userId]
    }
    try {
      const newChat = await Chat.create(chatData)
      const fullChat = await Chat.findOne({ _id: newChat._id }).populate("users", "-password")
      res.status(200).send(fullChat)
    } catch (error) {
      res.status(400).json({data: error.message})
    }
  }
}


export const fetchChat = async (req, res) => {
  try {
    let fullChat = await Chat.find({ users: { $elemMatch: { $eq: req.user.id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("messages")
      .sort({ updateAt: -1 })
    
    fullChat = await Users.populate(fullChat, {
      path: 'messages.sender',
      select: "name pic email",
    })
    res.status(200).send(fullChat)
  } catch (error) {
    res.status(400).json({data: error.message})
  }
 
}

export const createGroup = async (req, res) => {
  if(!req.body.users || !req.body.name) {
    res.status(400).json({message: "Please Fill the required Fields"})
  }

  var users = JSON.parse(req.body.users)
  if(users.length < 2) {
    res.status(400).json({message: "Should be more than 2 users"})
  }
  users.push(req.user);

  try {
    const groupdChat = await Chat.create(
      {
        chatName: req.body.name,
        users: users,
        isGroupChat: true,
        groupAdmin: req.user
      })
    const fullGroupChat = await Chat.findOne({ _id: groupdChat._id }).populate("users", "-password")
      .populate("groupAdmin", "-password")    
    res.status(200).json(fullGroupChat)
  } catch (error) {
    res.status(400).json({data: error.message})
  }
 
 
}

export const renameGroup = async (req, res) => {
  const { chatId, chatName } = req.body
  try {
    const renameGroup = await Chat.findByIdAndUpdate(
        chatId,
      { chatName },
      { new: true}
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password")  
    
    if(!renameGroup) {
      res.status(404).json({message:"Chat Not found"})
    } else {
      res.status(200).json(renameGroup)

    }
  } catch (error) {
    res.status(400).json({data: error.message})
  }
 
 
}
export const removefromGroup = async (req, res) => {
  const { chatId, userId } = req.body
  try {
    const removed = await Chat.findByIdAndUpdate(
        chatId,
      { $pull: { users: userId } },
      { new: true}
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password")  
    
    if(!removed) {
      res.status(404).json({message:"Chat Not found"})
    } else {
      res.status(200).json(removed)

    }
  } catch (error) {
    res.status(400).json({data: error.message})
  }
}


export const groupAdd = async (req, res) => {
  const { chatId, userId } = req.body
  try {
    const added = await Chat.findByIdAndUpdate(
        chatId,
      { $push: { users: userId } },
      { new: true}
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password")  
    
    if(!added) {
      res.status(404).json({message:"Chat Not found"})
    } else {
      res.status(200).json(added)

    }
  } catch (error) {
    res.status(400).json({data: error.message})
  }
 
}