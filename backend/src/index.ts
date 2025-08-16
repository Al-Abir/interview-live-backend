// src/index.ts
import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import pool from './confiq/db.connect'
import ErrorHandling from './middleware/ErrorHandling'
import createUsertable from './models/userModel'
import userRouters from './Routes/userRoutes'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Debug middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} hit`)
  next()
})

// Middleware
app.use(express.json())
app.use(cors())

//Error Handling middlewre
app.use(ErrorHandling)

//create table before staring server
createUsertable();


// Testing postgres route
app.get('/', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT current_database()')
    console.log(result.rows) // Debug: DB query result
    res.send(`The database name is: ${result.rows[0].current_database}`)
  } catch (err) {
    console.error('DB Query Error:', err)
    res.status(500).send('Database query failed')
  }
})

//router
app.use('/api/v1',userRouters)


// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
