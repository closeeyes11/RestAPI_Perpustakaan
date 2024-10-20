const jwt = require('jsonwebtoken'); // Mengimpor modul jsonwebtoken untuk memverifikasi token

// Middleware untuk memverifikasi token JWT
function verifyToken(req, res, next) {
    // Mengambil token dari header Authorization
    const token = req.headers['authorization'];

    // Memeriksa apakah token ada
    if (!token) {
        // Jika tidak ada token, kirim respon dengan status 403 (Forbidden)
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    }

    // Memisahkan 'Bearer' dari token
    const bearerToken = token.split(' ')[1]; 

    // Memverifikasi token menggunakan kunci rahasia
    jwt.verify(bearerToken, 'your_jwt_secret', (err, decoded) => {
        // Jika ada kesalahan saat memverifikasi token
        if (err) {
            // Kirim respon dengan status 500 (Internal Server Error)
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }
        // Jika token valid, simpan id pengguna di request untuk digunakan di middleware berikutnya
        req.userId = decoded.id;
        // Melanjutkan ke middleware berikutnya
        next();
    });
}

module.exports = verifyToken; // Mengekspor middleware untuk digunakan di bagian lain dari aplikasi
