import https from 'https';
import fs from 'fs';
import { config } from 'dotenv';
import { connectToDatabase } from './config/database';
import app from './app';

config();
const PORT = process.env.PORT!
const keyPath = process.env.SSL_KEY_PATH
const certPath = process.env.SSL_CERT_PATH 

const httpsOptions = {
  key: fs.readFileSync(keyPath!),
  cert: fs.readFileSync(certPath!),
};

connectToDatabase()
  .then(() => {
    https.createServer(httpsOptions, app).listen(PORT, () => {
      console.log(`Backend de despesas rodando em https://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });