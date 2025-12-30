const express = require('express');
const router = express.Router();
const db = require('../config/db');
const multer = require('multer');
const path = require('path');

// Configure Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// GET /api/books - Get all books
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM books ORDER BY created_at DESC');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// POST /api/books - Add a book
router.post('/', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'pdfFile', maxCount: 1 }]), async (req, res) => {
    try {
        const { title, price, category, description } = req.body;

        // Get file paths
        const image = req.files['image'] ? `/uploads/${req.files['image'][0].filename}` : req.body.image || ''; // Fallback to URL if not uploaded
        const pdf_file = req.files['pdfFile'] ? `/uploads/${req.files['pdfFile'][0].filename}` : '';

        const [result] = await db.query(
            'INSERT INTO books (title, price, category, description, image, pdf_file) VALUES (?, ?, ?, ?, ?, ?)',
            [title, price, category, description, image, pdf_file]
        );
        res.status(201).json({ id: result.insertId, title, price, category, image, pdf_file });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// GET /api/books/search - Search books (Optional, filtering can be done on frontend if small dataset)
router.get('/search', async (req, res) => {
    const { q, category } = req.query;
    let query = 'SELECT * FROM books WHERE 1=1';
    const params = [];

    if (q) {
        query += ' AND title LIKE ?';
        params.push(`%${q}%`);
    }
    if (category && category !== 'All') {
        query += ' AND category = ?';
        params.push(category);
    }

    try {
        const [rows] = await db.query(query, params);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// DELETE /api/books/:id - Delete a book
router.delete('/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM books WHERE id = ?', [req.params.id]);
        res.json({ message: 'Book deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
