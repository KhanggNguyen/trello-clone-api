import express from 'express'
const app = express()

import dotenv from 'dotenv'
dotenv.config()

const hostname = 'localhost'
const port = process.env.PORT || 5000

app.listen(port, hostname, () =>
    console.log(`Server started on ${hostname}:${port}`)
)
