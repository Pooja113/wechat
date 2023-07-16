import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './config/db.js';
import userRoute from './routes/userRoutes.js'

const app = express();
app.use(express.json())
app.use(cors())
dotenv.config()
connectDB()

app.get('/', (req,res) => {
  res.send("Working")
})

app.use('/user', userRoute)

app.listen(process.env.PORT, () => {
  console.log(`server is running on ${process.env.PORT}`)
})