import { get } from "http";
import { connectToDatabase, disconnectDatabase, getDb } from "../src/config/database";
import dotenv from 'dotenv'
dotenv.config()

beforeAll(async () => {
    if (!process.env.SESSION_SECRET) {
        throw new Error("A chave JWT deve estar definida.")
    }
    await connectToDatabase()
})

beforeEach(async () => {
    const db = getDb()
    const collections = await db.listCollections().toArray()

    for (const collection of collections) {
        const collectionInstance = db.collection(collection.name)
        await collectionInstance.deleteMany({});
    }
});

afterAll(async () => {
    await disconnectDatabase();
})