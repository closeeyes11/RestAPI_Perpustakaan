const db = require('../config/db');

const BookController = {
    create: (req, res) => {
        const { title, author, publisher, year, stock } = req.body;

        if (!title || !author || !publisher || !year || stock === undefined) {
            return res.status(400).send({ message: 'All fields are required.' });
        }

        db.query('INSERT INTO books (title, author, publisher, year, stock) VALUES (?, ?, ?, ?, ?)', 
        [title, author, publisher, year, stock], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error on the server.');
            }
            res.status(201).send({ message: 'Book added successfully!', bookId: results.insertId });
        });
    },

    // Fitur pencarian buku berdasarkan judul atau penulis, sekaligus pagination
    getAll: (req, res) => {
        const { search, page = 1, limit = 10 } = req.query; // Default page 1, limit 10
        const offset = (page - 1) * limit;

        let query = 'SELECT * FROM books WHERE 1=1'; // Kondisi default
        const queryParams = [];

        // Jika ada parameter search, tambahkan kondisi untuk pencarian berdasarkan judul atau penulis
        if (search) {
            query += ' AND (title LIKE ? OR author LIKE ?)';
            queryParams.push(`%${search}%`, `%${search}%`);
        }

        // Tambahkan pagination ke query
        query += ' LIMIT ? OFFSET ?';
        queryParams.push(parseInt(limit), parseInt(offset));

        // Jalankan query ke database
        db.query(query, queryParams, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error on the server.');
            }
            res.status(200).send(results);
        });
    },

    getById: (req, res) => {
        const bookId = req.params.id;

        db.query('SELECT * FROM books WHERE id = ?', [bookId], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error on the server.');
            }
            if (!results.length) {
                return res.status(404).send({ message: 'Book not found.' });
            }
            res.status(200).send(results[0]);
        });
    },

    update: (req, res) => {
        const bookId = req.params.id;
        const { title, author, publisher, year, stock } = req.body;

        if (!title || !author || !publisher || !year || stock === undefined) {
            return res.status(400).send({ message: 'All fields are required.' });
        }

        db.query('UPDATE books SET title = ?, author = ?, publisher = ?, year = ?, stock = ? WHERE id = ?', 
        [title, author, publisher, year, stock, bookId], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error on the server.');
            }
            if (results.affectedRows === 0) {
                return res.status(404).send({ message: 'Book not found.' });
            }
            res.status(200).send({ message: 'Book updated successfully!' });
        });
    },

    delete: (req, res) => {
        const bookId = req.params.id;

        db.query('DELETE FROM books WHERE id = ?', [bookId], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error on the server.');
            }
            if (results.affectedRows === 0) {
                return res.status(404).send({ message: 'Book not found.' });
            }
            res.status(200).send({ message: 'Book deleted successfully!' });
        });
    }
};

module.exports = BookController;
