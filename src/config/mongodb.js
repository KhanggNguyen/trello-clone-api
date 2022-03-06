import { MongoClient} from 'mongodb'
import { env } from '*/config/environtments.js';

const user = env.MONGODB_USER
const password = env.MONGODB_PASSWORD
const dbname = env.MONGODB_NAME

const uri = `mongodb+srv://${user}:${password}@cluster0.q8e4v.mongodb.net/${dbname}?retryWrites=true&w=majority`
console.log(uri)
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

export async function connectDB() {
    try {
        await client.connect()
        console.log(`Connected successfullyto Mongo Server`)

        //Show list of databases
        //await showDatabaseList(client);
    } finally {
        await client.close()
    }
}

export const showDatabaseList = async (client) => {
    const databaseList = await client.db().admin().listDatabases()

    databaseList.databases.forEach((db) => console.log(` - ${db.name}`))
}
