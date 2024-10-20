const db = require('../config/db'); // Mengimpor konfigurasi database

const Member = {
    // Fungsi untuk menambahkan anggota baru
    create: (member, callback) => {
        db.query('INSERT INTO members SET ?', member, callback); // Menambahkan anggota menggunakan query INSERT
    },

    // Fungsi untuk mendapatkan semua anggota
    getAll: (callback) => {
        db.query('SELECT * FROM members', callback); // Mengambil semua anggota menggunakan query SELECT
    },

    // Fungsi untuk mendapatkan anggota berdasarkan ID
    getById: (id, callback) => {
        db.query('SELECT * FROM members WHERE id = ?', [id], callback); // Mengambil anggota berdasarkan ID
    }
};

module.exports = Member; // Mengekspor model Member untuk digunakan di bagian lain aplikasi
