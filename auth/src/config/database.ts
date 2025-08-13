import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

let client: MongoClient
let db: Db

export async function connectToDatabase() {
    const isTestEnv = process.env.NODE_ENV === 'development'
    
    if (!client) {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI deve estar definida no ambiente.');
        }
        
        if (!isTestEnv && !process.env.MONGODB_DBNAME) {
            throw new Error('MONGODB_DBNAME deve estar definida no ambiente de produção.');
        }
        
        const uri = process.env.MONGODB_URI;
        const dbName = isTestEnv ? process.env.MONGODB_DBNAME! : 'test';
        
        const clientOptions = {
            tls: true,
            serverSelectionTimeoutMS: isTestEnv ? 2000 : 10000,
            connectTimeoutMS: isTestEnv ? 2000 : 10000,
            socketTimeoutMS: isTestEnv ? 2000 : 30000,
            maxPoolSize: 10,
            minPoolSize: 1,
            maxIdleTimeMS: 30000,
            retryWrites: true,
            retryReads: true
        };
        
        client = new MongoClient(uri, clientOptions);
        
        try {
            await client.connect();
            db = client.db(dbName);
            console.log(`✅ Conectado ao MongoDB! | Database: ${dbName} | Ambiente: ${isTestEnv ? 'Teste' : 'Produção'}`);
            await db.admin().ping();
            console.log('✅ Ping ao MongoDB realizado com sucesso!');
        } catch (error) {
            console.error('❌ Erro ao conectar ao MongoDB:', error);
            throw error;
        }
    }
    return db;
}

export async function disconnectDatabase() {
    try {
        if (client) {
            await client.close();
            console.log('✅ Conexão com o MongoDB fechada.');
        }
    } catch (error) {
        console.error('❌ Erro ao desconectar do MongoDB:', error);
    } finally {
        client = undefined as unknown as MongoClient;
        db = undefined as unknown as Db;
    }
}

export function getDb(): Db {
    if (!db) {
        throw new Error('Banco de dados não conectado. Chame connectToDatabase primeiro.');
    }
    return db;
}