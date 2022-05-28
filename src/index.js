import express from 'express'

import { env } from '*/config/environtments.js'
import { connectDB} from '*/config/mongodb.js'

const hostname = env.HOST || 'localhost'
const port = env.PORT || 5000

//MODELS
import { BoardModel } from '*/models/board.model'

//ROUTES
import router  from '*/routes'

//CONNECT TO DB
connectDB()
    .then(() => console.log(`Connected successfully to MongoDB Server`))
    .then(() => startServer())
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

const startServer = () => {
    const app = express()

    app.use(express.json())
    
    app.use('/api', router)

    app.listen(port, hostname, () =>
        console.log(`Server started on ${hostname}:${port}`)
    )
}
