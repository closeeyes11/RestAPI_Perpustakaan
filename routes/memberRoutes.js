const express = require('express');
const router = express.Router(); // Membuat router baru menggunakan express
const MemberController = require('../controllers/memberController'); // Mengimpor MemberController yang menangani logika CRUD anggota
const auth = require('../middlewares/auth'); // Middleware untuk verifikasi token JWT (authentication)

// Endpoint untuk menambahkan anggota baru
router.post('/', auth, MemberController.create);
// Endpoint untuk mendapatkan semua anggota
router.get('/', auth, MemberController.getAll);
// Endpoint untuk mendapatkan anggota berdasarkan ID
router.get('/:id', auth, MemberController.getById);

module.exports = router; // Mengekspor router untuk digunakan di file lain
