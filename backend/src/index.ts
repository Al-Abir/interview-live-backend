import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

// app create and port create
const app = express()
const PORT = process.env.PORT || 5000

//middleware
app.use(express())
app.use(cors())

//routes
app.get('/', (req: Request, res: Response) => {
  const a = 20

  res.send(a)
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

app.listen(PORT, () => {
  console.log(`Server is Running  ${PORT}`)
})
