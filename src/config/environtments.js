import 'dotenv/config'

export const env = {
    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_USER: process.env.MONGODB_USER,
    MONGODB_PASSWORD: process.env.MONGODB_PASSWORD,
    MONGODB_DBNAME: process.env.MONGODB_NAME,
    HOST: process.env.HOST,
    PORT: process.env.PORT,
}
