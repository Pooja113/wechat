import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
      }
    );
    console.log("Mongo DB Connected Successfully")
  } catch (error) {
    console.log(`DB connection fail due to :  ${error.message}`)
    process.exit()
  }
}