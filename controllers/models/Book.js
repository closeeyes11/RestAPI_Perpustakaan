const db = require('../config/db'); // Mengimpor koneksi database

const Book = {
    // Fungsi untuk menambahkan buku
    create: (book, callback) => {
        // Melakukan query INSERT untuk menambahkan buku ke dalam tabel 'books'
        db.query('INSERT INTO books SET ?', book, callback); // Menggunakan '?' untuk mencegah SQL injection
    },
};

module.exports = Book; // Mengekspor model Book untuk digunakan di controller atau bagian lain dari aplikasi
