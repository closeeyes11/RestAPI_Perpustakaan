const db = require('../config/db'); // Mengimpor konfigurasi koneksi database

const BorrowController = {

    // Fungsi untuk meminjam buku
    borrowBook: (req, res) => {
        const { member_id, book_id, borrow_date, return_date } = req.body;

        // Validasi input - Memastikan semua field wajib diisi
        if (!member_id || !book_id || !borrow_date || !return_date) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Cek stok buku berdasarkan book_id
        db.query('SELECT stock FROM books WHERE id = ?', [book_id], (err, results) => {
            if (err) {
                // Jika terjadi error saat mengambil data buku, kirim pesan error
                return res.status(500).json({ message: 'Error fetching book data.', error: err });
            }
            if (!results.length || results[0].stock <= 0) {
                // Jika buku tidak ditemukan atau stok kosong, kirim pesan error
                return res.status(400).json({ message: 'Book is out of stock.' });
            }

            // Jika stok cukup, kurangi stok buku
            db.query('UPDATE books SET stock = stock - 1 WHERE id = ?', [book_id], (err) => {
                if (err) {
                    // Jika terjadi error saat memperbarui stok, kirim pesan error
                    return res.status(500).json({ message: 'Error updating book stock.', error: err });
                }

                // Menyimpan catatan peminjaman di tabel borrow
                const query = 'INSERT INTO borrow (member_id, book_id, borrow_date, return_date) VALUES (?, ?, ?, ?)';
                db.query(query, [member_id, book_id, borrow_date, return_date], (err, results) => {
                    if (err) {
                        // Jika terjadi error saat membuat catatan peminjaman, kirim pesan error
                        return res.status(500).json({ message: 'Error creating borrow record.', error: err });
                    }
                    // Jika berhasil, kirimkan respons sukses dengan ID peminjaman
                    res.status(201).json({ message: 'Book borrowed successfully!', borrowId: results.insertId });
                });
            });
        });
    },

    // Fungsi untuk mengembalikan buku
    returnBook: (req, res) => {
        const borrowId = req.params.id; // Mengambil borrowId dari parameter URL

        // Cek apakah peminjaman ada dan statusnya 'borrowed'
        db.query('SELECT * FROM borrow WHERE id = ? AND status = "borrowed"', [borrowId], (err, results) => {
            if (err) {
                // Jika terjadi error saat mengambil data peminjaman, kirim pesan error
                return res.status(500).json({ message: 'Error fetching borrow record.' });
            }
            if (!results.length) {
                // Jika catatan peminjaman tidak ditemukan atau sudah dikembalikan, kirim pesan error
                return res.status(404).json({ message: 'Borrow record not found or already returned.' });
            }

            const bookId = results[0].book_id; // Ambil ID buku dari catatan peminjaman

            // Update status peminjaman menjadi 'returned'
            db.query('UPDATE borrow SET status = "returned" WHERE id = ?', [borrowId], (err) => {
                if (err) {
                    // Jika terjadi error saat memperbarui status peminjaman, kirim pesan error
                    return res.status(500).json({ message: 'Error updating borrow record.' });
                }

                // Tambahkan stok buku kembali
                db.query('UPDATE books SET stock = stock + 1 WHERE id = ?', [bookId], (err) => {
                    if (err) {
                        // Jika terjadi error saat memperbarui stok buku, kirim pesan error
                        return res.status(500).json({ message: 'Error updating book stock.' });
                    }
                    // Jika berhasil, kirimkan respons sukses
                    res.status(200).json({ message: 'Book returned successfully!' });
                });
            });
        });
    }
};

module.exports = BorrowController;
