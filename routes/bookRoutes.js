const express = require('express');
const router = express.Router();
const db = require('../config/db');
const multer = require('multer');
const path = require('path');

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const uploadFields = upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'pdf_file', maxCount: 1 }
]);

// ===============================
// GET /api/books - Get all books
// ===============================
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query(
            'SELECT * FROM books ORDER BY created_at DESC'
        );
        res.json(rows);
    } catch (err) {
        console.error("FETCH BOOKS ERROR:", err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// ===============================
// POST /api/books - Add a book (Multipart)
// ===============================
router.post('/', uploadFields, async (req, res) => {
    try {
        const { title, author, price, category, description } = req.body;
        const image = req.files['image'] ? `/uploads/${req.files['image'][0].filename}` : '';
        const pdf_file = req.files['pdf_file'] ? `/uploads/${req.files['pdf_file'][0].filename}` : '';

        // Basic validation
        if (!title || !price || !category) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const [result] = await db.query(
            `INSERT INTO books 
            (title, author, price, category, description, image, pdf_file) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                title,
                author || '',
                price,
                category,
                description || '',
                image,
                pdf_file
            ]
        );

        res.status(201).json({
            id: result.insertId,
            title,
            author,
            price,
            category,
            description,
            image,
            pdf_file
        });

    } catch (err) {
        console.error("ADD BOOK ERROR:", err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// ===============================
// PUT /api/books/:id - Update a book (Multipart)
// ===============================
router.put('/:id', uploadFields, async (req, res) => {
    try {
        const { title, author, price, category, description } = req.body;
        const id = req.params.id;

        // Fetch existing data to keep old files if new ones aren't uploaded
        const [existing] = await db.query('SELECT image, pdf_file FROM books WHERE id = ?', [id]);
        if (existing.length === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const image = req.files['image'] ? `/uploads/${req.files['image'][0].filename}` : existing[0].image;
        const pdf_file = req.files['pdf_file'] ? `/uploads/${req.files['pdf_file'][0].filename}` : existing[0].pdf_file;

        await db.query(
            `UPDATE books 
             SET title = ?, author = ?, price = ?, category = ?, description = ?, image = ?, pdf_file = ?
             WHERE id = ?`,
            [title, author, price, category, description, image, pdf_file, id]
        );

        res.json({ id, title, author, price, category, description, image, pdf_file });

    } catch (err) {
        console.error("UPDATE BOOK ERROR:", err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// ===============================
// GET /api/books/search
// ===============================
router.get('/search', async (req, res) => {
    const { q, category } = req.query;
    let query = 'SELECT * FROM books WHERE 1=1';
    const params = [];

    if (q) {
        query += ' AND (title LIKE ? OR author LIKE ?)';
        params.push(`%${q}%`, `%${q}%`);
    }

    if (category && category !== 'All') {
        query += ' AND category = ?';
        params.push(category);
    }

    try {
        const [rows] = await db.query(query, params);
        res.json(rows);
    } catch (err) {
        console.error("SEARCH ERROR:", err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// ===============================
// DELETE /api/books/:id
// ===============================
router.delete('/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM books WHERE id = ?', [req.params.id]);
        res.json({ message: 'Book deleted' });
    } catch (err) {
        console.error("DELETE ERROR:", err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
