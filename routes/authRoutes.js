const express = require('express');
const router = express.Router();
const db = require('../config/db');

// POST /api/auth/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const [rows] = await db.query('SELECT * FROM admins WHERE email = ?', [email]);

        if (rows.length > 0) {
            const admin = rows[0];
            if (admin.password === password) {
                return res.json({ success: true, user: { email: admin.email } });
            }
        }

        res.status(401).json({ success: false, message: 'Invalid credentials' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !email.includes('@')) {
        return res.status(400).json({ success: false, message: 'Invalid email address' });
    }

    try {
        await db.query('INSERT INTO admins (email, password) VALUES (?, ?)', [email, password]);
        res.json({ success: true, message: 'Admin created successfully' });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ success: false, message: 'Email already exists' });
        }
        console.error('Signup Error:', err);
        res.status(500).json({
            success: false,
            message: 'Server Error',
            details: err.message
        });
    }
});


module.exports = router;
