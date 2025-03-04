import express from 'express';
import path from 'path';

export const router = express.Router();
  
app.use('/scripts', express.static(path.join(__dirname, 'public', 'scripts')));
app.use('/styles', express.static(path.join(__dirname, 'public', 'styles')));

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

router.get('/questions/:category', (req, res) => {
    res.send(`Questions category = ${req.params.category}`);
});
