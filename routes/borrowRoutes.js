const express = require('express'); // Mengimpor Express untuk membuat instance router
const router = express.Router(); // Membuat instance router untuk mendefinisikan rute-rute endpoint
const BorrowController = require('../controllers/borrowController'); // Mengimpor BorrowController untuk memproses logika peminjaman dan pengembalian
const auth = require('../middlewares/auth'); // Mengimpor middleware auth untuk otentikasi JWT sebelum menjalankan rute

// Endpoint untuk meminjam buku
// Metode POST digunakan untuk membuat catatan peminjaman baru
// 'auth' middleware digunakan untuk memverifikasi token pengguna sebelum mengakses endpoint
// 'BorrowController.borrowBook' adalah fungsi yang akan dijalankan ketika permintaan POST dikirim ke endpoint ini
router.post('/', auth, BorrowController.borrowBook);

// Endpoint untuk mengembalikan buku
// Metode PUT digunakan untuk memperbarui status buku yang dipinjam menjadi 'returned'
// 'auth' middleware juga digunakan untuk memastikan pengguna yang terotentikasi dapat mengakses fitur ini
// 'BorrowController.returnBook' adalah fungsi yang akan dijalankan ketika permintaan PUT dikirim ke endpoint ini
router.put('/return/:id', auth, BorrowController.returnBook);

module.exports = router; // Mengekspor router agar bisa digunakan oleh server utama
