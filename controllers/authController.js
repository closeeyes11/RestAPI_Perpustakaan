const jwt = require('jsonwebtoken'); // Mengimpor modul jsonwebtoken untuk membuat token JWT
const bcrypt = require('bcryptjs'); // Mengimpor modul bcryptjs untuk hashing password
const db = require('../config/db'); // Mengimpor konfigurasi database

const AuthController = {
    // Fungsi untuk mendaftar pengguna baru
    register: (req, res) => {
        const { username, password } = req.body; // Mengambil username dan password dari request body
        
        // Memeriksa apakah username dan password disediakan
        if (!username || !password) {
            return res.status(400).send({ message: "Username and password are required." });
        }
        
        // Menghash password menggunakan bcrypt
        const hashedPassword = bcrypt.hashSync(password, 8);

        // Menyimpan pengguna baru ke dalam database
        db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, results) => {
            if (err) return res.status(500).send('Error on the server.'); // Menangani error saat menyimpan
            res.status(200).send({ message: 'User registered successfully!' }); // Mengirimkan respons berhasil
        });
    },

    // Fungsi untuk login pengguna
    login: (req, res) => {
        const { username, password } = req.body; // Mengambil username dan password dari request body

        // Mencari pengguna di database berdasarkan username
        db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
            if (err) return res.status(500).send('Error on the server.'); // Menangani error saat mencari pengguna
            if (!results.length) return res.status(404).send('User Not Found.'); // Jika pengguna tidak ditemukan

            const user = results[0]; // Mengambil pengguna pertama dari hasil pencarian
            // Membandingkan password yang diberikan dengan yang ada di database
            const passwordIsValid = bcrypt.compareSync(password, user.password);
            if (!passwordIsValid) return res.status(401).send({ auth: false, token: null }); // Jika password tidak valid

            // Membuat token JWT yang berisi ID pengguna
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: 86400 }); // Token berlaku selama 24 jam
            res.status(200).send({ auth: true, token }); // Mengirimkan token sebagai respons
        });
    }
};

module.exports = AuthController; // Mengekspor AuthController untuk digunakan di bagian lain aplikasi
