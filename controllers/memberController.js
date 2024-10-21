const db = require('../config/db');

const MemberController = {
    create: (req, res) => {
        const { name, email, address, phone } = req.body;

        // Validasi input
        if (!name || !email || !address || !phone) {
            return res.status(400).send({ message: 'All fields are required.' });
        }

        // Cek apakah email sudah ada
        db.query('SELECT * FROM members WHERE email = ?', [email], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error on the server.');
            }
            if (results.length > 0) {
                return res.status(400).send({ message: 'Email already exists!' });
            }

            // Jika email belum ada, tambahkan member
            db.query('INSERT INTO members (name, email, address, phone) VALUES (?, ?, ?, ?)', 
            [name, email, address, phone], (err, results) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error on the server.');
                }
                res.status(201).send({ message: 'Member added successfully!', memberId: results.insertId });
            });
        });
    },

    getAll: (req, res) => {
        const { page = 1, limit = 10 } = req.query; // Default page 1, limit 10
        const offset = (page - 1) * limit;

        // Query untuk mengambil daftar anggota dengan pagination
        db.query('SELECT * FROM members LIMIT ? OFFSET ?', [parseInt(limit), parseInt(offset)], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error on the server.');
            }
            res.status(200).send(results);
        });
    },

    getById: (req, res) => {
        const memberId = req.params.id;

        db.query('SELECT * FROM members WHERE id = ?', [memberId], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error on the server.');
            }
            if (!results.length) {
                return res.status(404).send({ message: 'Member not found.' });
            }
            res.status(200).send(results[0]);
        });
    }
};

module.exports = MemberController;
