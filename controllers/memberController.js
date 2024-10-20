const db = require('../config/db'); // Mengimpor konfigurasi database

const MemberController = {
    // Fungsi untuk menambahkan anggota baru
    create: (req, res) => {
        const { name, email, address, phone } = req.body; // Mendestrukturisasi data dari body request

        // Validasi input
        if (!name || !email || !address || !phone) {
            return res.status(400).send({ message: 'All fields are required.' }); // Mengembalikan kesalahan jika ada field yang kosong
        }

        // Cek apakah email sudah ada di database
        db.query('SELECT * FROM members WHERE email = ?', [email], (err, results) => {
            if (err) {
                console.error(err); // Menampilkan kesalahan di server
                return res.status(500).send('Error on the server.'); // Mengembalikan kesalahan server
            }
            if (results.length > 0) {
                return res.status(400).send({ message: 'Email already exists!' }); // Mengembalikan kesalahan jika email sudah terdaftar
            }

            // Jika email belum ada, tambahkan member
            db.query('INSERT INTO members (name, email, address, phone) VALUES (?, ?, ?, ?)', 
            [name, email, address, phone], (err, results) => {
                if (err) {
                    console.error(err); // Menampilkan kesalahan di server
                    return res.status(500).send('Error on the server.'); // Mengembalikan kesalahan server
                }
                // Mengembalikan respon sukses setelah anggota ditambahkan
                res.status(201).send({ message: 'Member added successfully!', memberId: results.insertId });
            });
        });
    },

    // Fungsi untuk mendapatkan semua anggota
    getAll: (req, res) => {
        db.query('SELECT * FROM members', (err, results) => {
            if (err) {
                console.error(err); // Menampilkan kesalahan di server
                return res.status(500).send('Error on the server.'); // Mengembalikan kesalahan server
            }
            // Mengembalikan daftar semua anggota
            res.status(200).send(results);
        });
    },

    // Fungsi untuk mendapatkan anggota berdasarkan ID
    getById: (req, res) => {
        const memberId = req.params.id; // Mendapatkan ID anggota dari parameter request

        db.query('SELECT * FROM members WHERE id = ?', [memberId], (err, results) => {
            if (err) {
                console.error(err); // Menampilkan kesalahan di server
                return res.status(500).send('Error on the server.'); // Mengembalikan kesalahan server
            }
            if (!results.length) {
                return res.status(404).send({ message: 'Member not found.' }); // Mengembalikan kesalahan jika anggota tidak ditemukan
            }
            // Mengembalikan data anggota
            res.status(200).send(results[0]);
        });
    }
};

module.exports = MemberController; // Mengekspor MemberController untuk digunakan di bagian lain aplikasi
