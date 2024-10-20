const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'library_db'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
        throw err;  // Masih melempar error jika koneksi gagal
    }
    console.log('MySQL Connected...');
});


module.exports = db;
