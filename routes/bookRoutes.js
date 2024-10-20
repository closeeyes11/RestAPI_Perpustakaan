const express = require('express'); // Mengimpor Express untuk membuat rute
const router = express.Router(); // Membuat instance router dari Express
const BookController = require('../controllers/bookController'); // Mengimpor BookController untuk menangani logika bisnis

// Rute untuk menambahkan buku baru
router.post('/', auth, BookController.create); // Menggunakan metode POST untuk menambahkan buku baru

module.exports = router; // Mengekspor router untuk digunakan di aplikasi utama
