import express from 'express'

const app = express();

app.listen(process.env.PORT, () => {
  console.log(`server is running on ${process.env.PORT}`)
})