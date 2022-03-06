import { MongoClient } from 'mongodb'
import { env } from '*/config/environtments.js'

const user = env.MONGODB_USER
const password = env.MONGODB_PASSWORD
const dbname = env.MONGODB_DBNAME

const client = new MongoClient(env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

let dbInstance = null

export const connectDB = async () => {
    await client.connect()

    dbInstance = client.db(env.MONGODB_DBNAME)
}

export const getDB = () => {
    if (!dbInstance) throw new Error('Please connect to DB first')

    return dbInstance
}
