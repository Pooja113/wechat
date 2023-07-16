import express from 'express'
import { authorization } from '../middleware/authMiddleware.js';
import { createChat, createGroup, fetchChat, groupAdd, removefromGroup, renameGroup } from '../controllers/chatController.js';

const route = express.Router();

route.post('/create', authorization,createChat)
route.get('/fetchAll', authorization ,fetchChat)
route.post('/group',authorization, createGroup)
route.put('/rename', authorization, renameGroup)
route.put('/remove',authorization, removefromGroup)
route.put('/groupadd', authorization, groupAdd)

export default route