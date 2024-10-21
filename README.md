markdown
Copy code
# Library Management System

## Deskripsi
Library Management System adalah aplikasi berbasis REST API untuk mengelola data perpustakaan, termasuk buku, anggota, peminjaman, dan pengembalian. Aplikasi ini dilengkapi dengan autentikasi JWT (JSON Web Token) untuk memastikan keamanan saat mengakses API. Fitur pencarian buku berdasarkan judul atau penulis dan pagination juga didukung.

## Fitur Utama
- **CRUD Buku**: Tambah, lihat, ubah, dan hapus data buku.
- **CRUD Anggota**: Tambah, lihat, ubah, dan hapus data anggota perpustakaan.
- **Peminjaman Buku**: Meminjam buku dengan validasi stok buku.
- **Pengembalian Buku**: Mengembalikan buku yang sudah dipinjam dan menambah stok buku.
- **Autentikasi JWT**: Sistem login dan registrasi dengan token JWT untuk melindungi akses API.
- **Pencarian Buku**: Pencarian buku berdasarkan judul atau penulis.
- **Pagination**: Membatasi jumlah data yang diambil dalam satu permintaan.

## Prasyarat
- **Node.js** (v12 ke atas)
- **MySQL** untuk basis data
- **Postman** atau alat lain untuk menguji API

## Instalasi
1. **Clone Repository**
   ```bash
   git clone https://github.com/your-username/library-management-system.git
   cd library-management-system

## Install Dependencies Pastikan Anda berada di root directory aplikasi
npm install


## Konfigurasi Database

**Buat database MySQL dengan nama library_db.**
**Jalankan script SQL berikut untuk membuat tabel-tabel yang diperlukan:**

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    address TEXT NOT NULL,
    phone VARCHAR(20) NOT NULL
);

CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    publisher VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    stock INT NOT NULL
);

CREATE TABLE borrow (
    id INT AUTO_INCREMENT PRIMARY KEY,
    member_id INT,
    book_id INT,
    borrow_date DATE,
    return_date DATE,
    status ENUM('borrowed', 'returned') DEFAULT 'borrowed',
    FOREIGN KEY (member_id) REFERENCES members(id),
    FOREIGN KEY (book_id) REFERENCES books(id)
);


**Konfigurasi File .env Buat file .env di root directory untuk menyimpan variabel lingkungan:**

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=library_db
JWT_SECRET=your_jwt_secret


**Jalankan Aplikasi Setelah melakukan instalasi dan konfigurasi, Anda dapat menjalankan aplikasi dengan:**

npm start


**Endpoints API**
**Autentikasi**
1. **Register User**

Endpoint: POST /auth/register
Body:

{
  "username": "your_username",
  "password": "your_password"
}


**Login User**

Endpoint: POST /auth/login
Body:

{
  "username": "your_username",
  "password": "your_password"
}

*
**Buku**
**Tambah Buku**

Endpoint: POST /books
Body:

{
  "title": "Book Title",
  "author": "Author Name",
  "publisher": "Publisher Name",
  "year": 2024,
  "stock": 10
}


**Dapatkan Semua Buku**

Endpoint: GET /books?page=1&limit=10
Query Parameters:
page: Nomor halaman yang ingin diambil (default: 1).
limit: Jumlah buku per halaman (default: 10).


**Dapatkan Buku Berdasarkan ID**

Endpoint: GET /books/:id


**Cari Buku**

Endpoint: GET /books?search=<keyword>


**Update Buku**

Endpoint: PUT /books/:id
Body:

{
  "title": "Updated Book Title",
  "author": "Updated Author Name",
  "publisher": "Updated Publisher Name",
  "year": 2025,
  "stock": 5
}


**Hapus Buku**

Endpoint: DELETE /books/:id


**Anggota**
**Tambah Anggota**

Endpoint: POST /members
Body:

{
  "name": "Member Name",
  "email": "member@example.com",
  "address": "Member Address",
  "phone": "123456789"
}


**Dapatkan Semua Anggota**

Endpoint: GET /members?page=1&limit=10


**Dapatkan Anggota Berdasarkan ID**

Endpoint: GET /members/:id

