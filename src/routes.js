import express from 'express';
import path from 'path';

export const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'index.html')); 
});

router.use('/main.js', express.static(path.join(process.cwd(), 'scripts', 'main.js')));
router.use('/auth.js', express.static(path.join(process.cwd(), 'scripts', 'auth.js')));
router.use('/styles.css', express.static(path.join(process.cwd(), 'styles', 'styles.css')));

router.get('/questions/:category', (req, res) => {
    res.send(`Questions category = ${req.params.category}`);
});
