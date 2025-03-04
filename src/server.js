import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config(); 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use('/DATA', express.static(path.join(process.cwd(), 'DATA')));

app.use('/scripts', express.static(path.join(__dirname, 'public', 'scripts')));
app.use('/styles', express.static(path.join(__dirname, 'public', 'styles')));

const isNetlify = process.env.NETLIFY || false;


app.use((req, res, next) => {
  const isNetlify = process.env.NETLIFY || false;
  if (!isNetlify && req.hostname !== 'localhost') {
    res.status(403).send('<h1>Access Denied</h1>');
  } else {
    next();
  }
});


import { router } from './routes.js';
app.use('/', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.info(`Server running at http://127.0.0.1:${PORT}`);
});
