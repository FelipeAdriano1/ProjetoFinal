import { getDb } from '../config/database';

interface User {
    email: string,
    passwd: string
}

export async function createUser(user: User) {
    const db = getDb();
    const now = new Date()
    const userWithTimestamps = {
        ...user,
        createdAt: now,
        updatedAt: now
    }
    const result = await db.collection('users').insertOne(userWithTimestamps);
    return result.insertedId;
}

export async function findUserByEmail(email: string){
    const db = getDb()
    return db.collection<User>('users').findOne({email})
    //RETORNA O USUÁRIO COM O EMAIL PASSADO POR PARÂMETRO
}