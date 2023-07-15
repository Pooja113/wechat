import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';

const app = express();
dotenv.config()
connectDB()

app.get('/', (req,res) => {
  res.send("Working")
})

app.listen(process.env.PORT, () => {
  console.log(`server is running on ${process.env.PORT}`)
})