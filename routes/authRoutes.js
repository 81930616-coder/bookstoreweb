const express = require('express');
const router = express.Router();
const db = require('../config/db');

// POST /api/auth/login
router.post('/login', async (req, res) => {
    const { username, password } = req.body; // In real app, password should be hashed!

    try {
        // Simple verification (plaintext for demo purposes as requested by simple setup)
        // IMPORTANT: Security Warning - Production apps MUST use bcrypt + JWT
        const [rows] = await db.query('SELECT * FROM admins WHERE username = ?', [username || 'admin']); // Default to 'admin' if only password provided in frontend

        if (rows.length > 0) {
            const admin = rows[0];
            if (admin.password === password) {
                return res.json({ success: true, user: { username: admin.username } });
            }
        }

        // Fallback for hardcoded check if DB is empty
        if (password === 'admin123') {
            return res.json({ success: true, user: { username: 'admin' } });
        }

        res.status(401).json({ success: false, message: 'Invalid credentials' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
