import express from 'express';
import { router } from './routes.js';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config(); 

const app = express();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));

app.use(express.static(path.join(process.cwd(), 'public')));
app.use('/', router);

const server = app.listen(PORT, '127.0.0.1', () => {
    console.log(`🚀 Server virkar á http://127.0.0.1:${PORT}`);
});

process.on('SIGINT', () => {
    console.log('❌ Server shutting down...');
    server.close(() => {
        console.log('✅ Server closed.');
        process.exit(0);
    });
});
