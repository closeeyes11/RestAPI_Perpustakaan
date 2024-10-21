const db = require('../config/db'); // Mengimpor koneksi database dari file konfigurasi

// Objek Borrow berisi dua metode: create dan returnBook
const Borrow = {

    // Metode create digunakan untuk membuat catatan peminjaman buku baru
    // Parameter 'borrow' adalah objek yang berisi data peminjaman seperti member_id, book_id, borrow_date, dll.
    // 'callback' adalah fungsi yang dijalankan setelah query ke database berhasil atau terjadi kesalahan
    create: (borrow, callback) => {
        // Menyisipkan data peminjaman ke dalam tabel 'borrows'
        // Query SQL menggunakan sintaks INSERT INTO dengan SET untuk memasukkan objek borrow
        db.query('INSERT INTO borrows SET ?', borrow, callback);
    },

    // Metode returnBook digunakan untuk memperbarui status pengembalian buku
    // Parameter 'id' mengacu pada id catatan peminjaman yang ingin di-update
    // 'callback' akan dijalankan setelah query selesai
    returnBook: (id, callback) => {
        // Query SQL untuk mengubah status pengembalian pada catatan peminjaman berdasarkan id
        // 'returned' diset ke 1 yang mungkin menandakan buku telah dikembalikan
        db.query('UPDATE borrows SET returned = 1 WHERE id = ?', [id], callback);
    }
};

module.exports = Borrow; // Mengekspor objek Borrow agar bisa digunakan di bagian lain aplikasi
