const express = require('express'); // Mengimpor express untuk membuat router
const router = express.Router(); // Membuat instance router dari express
const AuthController = require('../controllers/authController'); // Mengimpor AuthController

// Route untuk mendaftar pengguna baru
router.post('/register', AuthController.register); // Memetakan POST /register ke fungsi register di AuthController

// Route untuk login pengguna
router.post('/login', AuthController.login); // Memetakan POST /login ke fungsi login di AuthController

module.exports = router; // Mengekspor router untuk digunakan di bagian lain aplikasi
