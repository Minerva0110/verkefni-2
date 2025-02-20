import express from 'express';
import { router } from './routes.js';

const app = express();

app.use('/', router);

app.get('/redirect', (req, res) => {
    res.redirect('/foo');
});

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}/`);
});