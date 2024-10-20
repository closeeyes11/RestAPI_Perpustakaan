const db = require('../config/db'); // Mengimpor koneksi database

const BookController = {
    // Method untuk menambahkan buku baru
    create: (req, res) => {
        const { title, author, publisher, year, stock } = req.body; // Mengambil data buku dari request body

        // Validasi: Pastikan semua field diisi
        if (!title || !author || !publisher || !year || stock === undefined) {
            return res.status(400).send({ message: 'All fields are required.' }); // Mengembalikan status 400 jika ada field yang kosong
        }

        // Query untuk menambahkan buku ke dalam database
        db.query('INSERT INTO books (title, author, publisher, year, stock) VALUES (?, ?, ?, ?, ?)', 
        [title, author, publisher, year, stock], (err, results) => {
            if (err) {
                console.error(err); // Menampilkan error di console
                return res.status(500).send('Error on the server.'); // Mengembalikan status 500 jika terjadi error
            }
            res.status(201).send({ message: 'Book added successfully!', bookId: results.insertId }); // Mengembalikan status 201 jika berhasil
        });
    },

    // Method untuk mendapatkan semua buku
    getAll: (req, res) => {
        db.query('SELECT * FROM books', (err, results) => {
            if (err) {
                console.error(err); // Menampilkan error di console
                return res.status(500).send('Error on the server.'); // Mengembalikan status 500 jika terjadi error
            }
            res.status(200).send(results); // Mengembalikan status 200 dan data buku
        });
    },

    // Method untuk mendapatkan buku berdasarkan ID
    getById: (req, res) => {
        const bookId = req.params.id; // Mengambil ID buku dari parameter URL

        db.query('SELECT * FROM books WHERE id = ?', [bookId], (err, results) => {
            if (err) {
                console.error(err); // Menampilkan error di console
                return res.status(500).send('Error on the server.'); // Mengembalikan status 500 jika terjadi error
            }
            if (!results.length) {
                return res.status(404).send({ message: 'Book not found.' }); // Mengembalikan status 404 jika buku tidak ditemukan
            }
            res.status(200).send(results[0]); // Mengembalikan status 200 dan data buku
        });
    },

    // Method untuk memperbarui data buku
    update: (req, res) => {
        const bookId = req.params.id; // Mengambil ID buku dari parameter URL
        const { title, author, publisher, year, stock } = req.body; // Mengambil data buku dari request body

        // Validasi: Pastikan semua field diisi
        if (!title || !author || !publisher || !year || stock === undefined) {
            return res.status(400).send({ message: 'All fields are required.' }); // Mengembalikan status 400 jika ada field yang kosong
        }

        // Query untuk memperbarui buku di database
        db.query('UPDATE books SET title = ?, author = ?, publisher = ?, year = ?, stock = ? WHERE id = ?', 
        [title, author, publisher, year, stock, bookId], (err, results) => {
            if (err) {
                console.error(err); // Menampilkan error di console
                return res.status(500).send('Error on the server.'); // Mengembalikan status 500 jika terjadi error
            }
            if (results.affectedRows === 0) {
                return res.status(404).send({ message: 'Book not found.' }); // Mengembalikan status 404 jika buku tidak ditemukan
            }
            res.status(200).send({ message: 'Book updated successfully!' }); // Mengembalikan status 200 jika berhasil
        });
    },

    // Method untuk menghapus buku
    delete: (req, res) => {
        const bookId = req.params.id; // Mengambil ID buku dari parameter URL

        // Query untuk menghapus buku dari database
        db.query('DELETE FROM books WHERE id = ?', [bookId], (err, results) => {
            if (err) {
                console.error(err); // Menampilkan error di console
                return res.status(500).send('Error on the server.'); // Mengembalikan status 500 jika terjadi error
            }
            if (results.affectedRows === 0) {
                return res.status(404).send({ message: 'Book not found.' }); // Mengembalikan status 404 jika buku tidak ditemukan
            }
            res.status(200).send({ message: 'Book deleted successfully!' }); // Mengembalikan status 200 jika berhasil dihapus
        });
    }
};

module.exports = BookController; // Mengekspor BookController untuk digunakan di bagian lain dari aplikasi
