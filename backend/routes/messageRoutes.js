import express from 'express'
import { authorization } from '../middleware/authMiddleware.js';
import { sendMessage, allMessages } from '../controllers/messageControllers.js';

const route = express.Router();

route.get("/:chatId",authorization, allMessages);
route.post("/",authorization, sendMessage);

export default route