const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function getCategories() {
    const result = await pool.query('SELECT * FROM categories');
    return result.rows;
}

async function getQuestionsByCategory(categoryId) {
    const result = await pool.query(
        `SELECT q.id, q.question, a.answer, a.is_correct 
         FROM questions q
         JOIN answers a ON q.id = a.question_id
         WHERE q.category_id = $1`, 
        [categoryId]
    );
    return result.rows;
}

async function insertQuestion(question, categoryId, answers) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query(
            'INSERT INTO questions (question, category_id) VALUES ($1, $2) RETURNING id',
            [question, categoryId]
        );

        const questionId = result.rows[0].id;

        for (const answer of answers) {
            await client.query(
                'INSERT INTO answers (answer, question_id, is_correct) VALUES ($1, $2, $3)',
                [answer.text, questionId, answer.isCorrect]
            );
        }

        await client.query('COMMIT');
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
}

module.exports = { getCategories, getQuestionsByCategory, insertQuestion };
