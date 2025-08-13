import {DatabaseConnectionError} from './errors/database-connection-error'
//IMPORTAÇÃO DO APP
import { app } from './app';
//DATABASE
import { connectToDatabase } from './config/database';
import https from 'https';
import fs from 'fs';
import { config } from 'dotenv';
config()

const start = () => {
    if (!process.env.SESSION_SECRET) {
        throw new Error("A chave JWT deve estar definida.")
    }

    const keyPath = process.env.SSL_KEY_PATH!;
    const certPath = process.env.SSL_CERT_PATH!;

    const httpsOptions = {
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath)
    };

    connectToDatabase()
        .then(() => {
            https.createServer(httpsOptions, app).listen(process.env.PORT, () => {
                console.log(`Auth service listening on https://localhost:${process.env.PORT}`);
            });
        })
        .catch((err) => {
            throw new DatabaseConnectionError(err.message)
        })
}

start()