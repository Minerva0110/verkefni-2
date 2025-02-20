import express from 'express';

export const router = express.Router();

router.get('/', (req, res) => {
    res.send('Foo!');
});

router.get('/questions/:category', (req, res) => {
    res.send(`Questionscategory = ${req.params.category}`);
});
