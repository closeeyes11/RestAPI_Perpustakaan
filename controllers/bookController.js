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


};

module.exports = BookController;
