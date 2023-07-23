import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './config/db.js';
import userRoute from './routes/userRoutes.js'
import chatRoute from './routes/chatRoutes.js'
import messageRoute from './routes/messageRoutes.js'
import { Server } from 'socket.io';

const app = express();
app.use(express.json())
app.use(cors())
dotenv.config()
connectDB()

app.get('/', (req,res) => {
  res.send("Working")
})

app.use('/user', userRoute)
app.use('/chat', chatRoute)
app.use('/message', messageRoute)



const server = app.listen(process.env.PORT, () => {
  console.log(`server is running on ${process.env.PORT}`)
})

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://127.0.0.1:5173",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log(userData._id)
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    let chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
   });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});