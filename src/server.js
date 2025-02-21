import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config(); 

const app = express();

app.use('/DATA', express.static(path.join(process.cwd(), 'DATA')));

// ✅ Serve static files
app.use(express.static(path.join(process.cwd(), 'public')));  
app.use(express.static(path.join(process.cwd(), 'scripts'))); 
app.use(express.static(path.join(process.cwd(), 'styles')));  

const isNetlify = process.env.NETLIFY || false;


app.use((req, res, next) => {
  if (!isNetlify && req.hostname !== 'localhost') {
    res.status(403).send('<h1>Access Denied 🚫</h1>');
  } else {
    next();
  }
});


import { router } from './routes.js';
app.use('/', router);

const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
    console.info(`🚀 Server running at http://127.0.0.1:${PORT}`);
});


