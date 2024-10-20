const express = require('express'); // Mengimpor modul express
const router = express.Router(); // Membuat router untuk menangani rute
const BookController = require('../controllers/bookController'); // Mengimpor BookController untuk mengelola logika bisnis terkait buku
const auth = require('../middlewares/auth'); // Mengimpor middleware autentikasi untuk melindungi rute

// Rute untuk menambahkan buku baru (POST /books)
router.post('/', auth, BookController.create); // Memerlukan autentikasi

// Rute untuk mendapatkan daftar semua buku (GET /books)
router.get('/', auth, BookController.getAll); // Memerlukan autentikasi

// Rute untuk mendapatkan detail buku berdasarkan ID (GET /books/:id)
router.get('/:id', auth, BookController.getById); // Memerlukan autentikasi

// Rute untuk memperbarui informasi buku (PUT /books/:id)
router.put('/:id', auth, BookController.update); // Memerlukan autentikasi

// Rute untuk menghapus buku berdasarkan ID (DELETE /books/:id)
router.delete('/:id', auth, BookController.delete); // Memerlukan autentikasi

module.exports = router; // Mengekspor router untuk digunakan di bagian lain dari aplikasi
