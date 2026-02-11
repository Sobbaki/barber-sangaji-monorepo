# BarberSangaji Repository

Repository ini berisi dua bagian utama:

* **Backend API** (Node.js + Express + MongoDB)
* **Frontend** (React.js + Vite)

---

## BarberSangaji Backend API

Backend untuk BarberSangaji, dibangun menggunakan **Node.js + Express + MongoDB**.
Menyediakan API untuk:

* Autentikasi (register/login)
* Upload file ke Vercel Blob Storage
* CRUD konten (foto & video)
* CRUD testimonial pelanggan
* Dokumentasi API berbasis OpenAPI (via Scalar)

---

### Persiapan Awal

#### 1. Install Dependencies

```bash
npm install
```

---

#### 2. Setup MongoDB Atlas

1. Buka [https://cloud.mongodb.com](https://cloud.mongodb.com)

2. Buat akun dan login.

3. Buat **Project** baru dan **Cluster**.

4. Tambahkan **Database User**:

   ```
   Username: barberadmin
   Password: strongpassword
   ```

5. Tambahkan IP whitelist: `0.0.0.0/0`

6. Klik **Connect → Drivers → Node.js** dan salin connection string, misalnya:

   ```
   mongodb+srv://barberadmin:<password>@cluster0.mongodb.net/barberdb?retryWrites=true&w=majority
   ```

---

#### 3. Setup Vercel Blob Storage

1. Login ke [https://vercel.com](https://vercel.com)

2. Pastikan project sudah dibuat atau deploy dulu project FE-nya.

3. Jalankan perintah:

   ```bash
   vercel blob ls
   ```

   Jika belum punya token, buat dengan:

   ```bash
   vercel login
   vercel blob token
   ```

4. Salin token yang dihasilkan dan isi di `.env` sebagai `BLOB_READ_WRITE_TOKEN`.

5. (Opsional) Dapatkan domain publik Blob kamu dari dashboard Vercel, contoh:

   ```
   barbersangaji.public.blob.vercel-storage.com
   ```

   Masukkan ke `.env` sebagai `NEXT_PUBLIC_VERCEL_BLOB_DOMAIN`.

---

### Konfigurasi Environment

Copy file `.env.example` dan ganti nama jadi `.env` di root proyek dan isi seperti berikut:

```bash
# Environment
APP_ENV=dev

# Port lokal
PORT=3000

# MongoDB connection
MONGODB_URI=mongodb+srv://<dbUser>:<dbPass>@cluster0.mongodb.net/barberdb?retryWrites=true&w=majority

# JWT secret
JWT_SECRET=replace_with_a_strong_random_string_here

# Vercel Blob token
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token_here

# (Optional) public domain
NEXT_PUBLIC_VERCEL_BLOB_DOMAIN=your-blob-domain

# (Optional) admin password for seed script
SEED_ADMIN_PASSWORD=admin123
```

---

### Menjalankan Server Lokal

```bash
npm run dev
```

Aplikasi akan berjalan di:

```
http://localhost:3000
```

Dokumentasi API (Scalar) tersedia di:

```
http://localhost:3000/docs
```

---

### Struktur Folder

```
backend/
├── index.js
├── docs/
│   └── openapi.yaml
├── lib/
│   ├── auth.js
│   └── mongoose.js
├── controller/
│   ├── authController.js
│   ├── blobController.js
│   ├── contentController.js
│   └── testimonialsController.js
├── models/
│   ├── User.js
│   ├── Content.js
│   └── Testimonial.js
└── routes/
    ├── auth.js
    ├── blob.js
    ├── content.js
    └── testimonials.js
```

---

### Endpoint Utama

| Route                | Method             | Deskripsi                    |
| :------------------- | :----------------- | :--------------------------- |
| `/auth/register`     | POST               | Register user baru           |
| `/auth/login`        | POST               | Login & dapatkan JWT token   |
| `/blob/upload`       | POST               | Upload file ke blob storage  |
| `/content`           | GET / POST         | Ambil atau buat konten       |
| `/content/{id}`      | GET / PUT / DELETE | Operasi konten spesifik      |
| `/testimonials`      | GET / POST         | Ambil atau buat testimonial  |
| `/testimonials/{id}` | GET / PUT / DELETE | Operasi testimonial spesifik |

Semua endpoint dengan `security: BearerAuth` memerlukan header Authorization:

```
Authorization: Bearer <JWT_TOKEN>
```

File upload menggunakan `multipart/form-data` (field: `file`).

---

### Dokumentasi API

Dokumentasi berbasis **OpenAPI v3.0.3** tersedia di file:

```
backend/docs/openapi.yaml
```

Atau akses melalui browser di:

```
http://localhost:3000/docs
```

---

## BarberSangaji Frontend

Frontend untuk BarberSangaji, dibuat menggunakan **React.js (Vite)**.

---

### Konfigurasi Environment

1. Salin file *template environment* dan ubah namanya menjadi `.env` di root proyek.

   ```bash
   cp .env.example .env
   ```

2. Buka file `.env` dan isi variabel `VITE_BACKEND_URL` dengan link **Backend API**.

   ```bash
   VITE_BACKEND_URL=http://url-backend
   ```

   Contoh: `VITE_BACKEND_URL=http://localhost:3000`

---

### Menjalankan Aplikasi Lokal

Setelah konfigurasi `.env` selesai, jalankan frontend secara lokal.

```bash
npm install
npm start
```

Aplikasi akan berjalan di:

```
http://localhost:5173
```

---

### Struktur Folder

```
frontend/
├── src/
│   ├── components/       # Komponen UI spesifik halaman atau layout utama
│   │   └── ui/           # Komponen UI reusable (Button, Card, Input, dll)
│   ├── hooks/            # Custom React Hooks (misalnya: useFetch, useAuth)
│   ├── lib/              # Utility/helper functions (API client, formatters, dll)
│   ├── models/           # Definisi TypeScript Interfaces/Types
│   ├── pages/            # Komponen utama (Home, Login, ContentList, dll)
│   ├── App.tsx           # Komponen utama untuk konfigurasi routing
│   └── main.tsx          # Entry point aplikasi
├── public/               # File statis (index.html, favicon, images, dll)
├── .env.example          # Template environment variables
└── package.json          # Daftar dependensi dan scripts
```

---

### Catatan

* Pastikan variabel `VITE_BACKEND_URL` mengarah ke server backend yang aktif.
* Build produksi dapat dijalankan dengan:

  ```bash
  npm run build
  npm run preview
  ```

---