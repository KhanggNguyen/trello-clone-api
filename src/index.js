import express from 'express'
const app = express()
import { env } from '*/config/environtments.js';
import { connectDB } from './config/mongodb.js'

const hostname = 'localhost'
const port = env.PORT || 5000

connectDB().catch(console.log)

app.listen(port, hostname, () =>
    console.log(`Server started on ${hostname}:${port}`)
)
