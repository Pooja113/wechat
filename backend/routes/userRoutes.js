import express from 'express'
import { allUsers, loginController, registerController } from '../controllers/userControllers.js'
import { authorization } from '../middleware/authMiddleware.js';
const route = express.Router()

route.get('/all', authorization, allUsers)
route.post('/register', registerController);
route.post('/login', loginController)

export default route