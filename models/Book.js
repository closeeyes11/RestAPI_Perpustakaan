const db = require('../config/db'); // Mengimpor koneksi database

const Book = {
    // Method untuk menambahkan buku baru
    create: (book, callback) => {
        // Menjalankan query untuk menyisipkan buku ke dalam tabel 'books'
        db.query('INSERT INTO books SET ?', book, callback); // Menggunakan callback untuk menangani hasil query
    },
    
    // Method untuk mendapatkan semua buku
    getAll: (callback) => {
        // Menjalankan query untuk mengambil semua data buku dari tabel 'books'
        db.query('SELECT * FROM books', callback); // Menggunakan callback untuk menangani hasil query
    },
    
    // Method untuk mendapatkan buku berdasarkan ID
    getById: (id, callback) => {
        // Menjalankan query untuk mengambil buku berdasarkan ID
        db.query('SELECT * FROM books WHERE id = ?', [id], callback); // Menggunakan parameter untuk mencegah SQL injection
    },
    
    // Method untuk memperbarui data buku
    update: (id, book, callback) => {
        // Menjalankan query untuk memperbarui data buku di tabel 'books'
        db.query('UPDATE books SET ? WHERE id = ?', [book, id], callback); // Menggunakan parameter untuk mencegah SQL injection
    },
    
    // Method untuk menghapus buku berdasarkan ID
    delete: (id, callback) => {
        // Menjalankan query untuk menghapus buku dari tabel 'books'
        db.query('DELETE FROM books WHERE id = ?', [id], callback); // Menggunakan parameter untuk mencegah SQL injection
    }
};

module.exports = Book; // Mengekspor model Book untuk digunakan di bagian lain dari aplikasi
