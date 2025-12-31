const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET /api/requests - Get all requests
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM requests ORDER BY created_at DESC');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// POST /api/requests - Create a request
router.post('/', async (req, res) => {
    const { title, author, notes } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO requests (title, author, notes) VALUES (?, ?, ?)',
            [title, author, notes]
        );
        res.status(201).json({ id: result.insertId, title, message: 'Request submitted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// DELETE /api/requests/:id - Delete a request
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM requests WHERE id = ?', [id]);
        res.json({ message: 'Request deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
