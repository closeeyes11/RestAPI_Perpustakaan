const db = require('../config/db'); // Mengimpor koneksi database

const BookController = {
    // Fungsi untuk menambahkan buku
    create: (req, res) => {
        // Mendestructuring data dari body request
        const { title, author, publisher, year, stock } = req.body;

        // Validasi input: pastikan semua field diperlukan terisi
        if (!title || !author || !publisher || !year || stock === undefined) {
            return res.status(400).send({ message: 'All fields are required.' }); // Mengembalikan status 400 jika ada field yang kosong
        }

        // Query untuk menambahkan buku ke dalam tabel 'books'
        db.query('INSERT INTO books (title, author, publisher, year, stock) VALUES (?, ?, ?, ?, ?)', 
        [title, author, publisher, year, stock], (err, results) => {
            if (err) {
                console.error(err); // Menampilkan error di console
                return res.status(500).send('Error on the server.'); // Mengembalikan status 500 jika terjadi error
            }
            // Mengembalikan status 201 dan ID buku yang baru ditambahkan
            res.status(201).send({ message: 'Book added successfully!', bookId: results.insertId });
        });
    },
};

module.exports = BookController; // Mengekspor BookController untuk digunakan di bagian lain aplikasi
