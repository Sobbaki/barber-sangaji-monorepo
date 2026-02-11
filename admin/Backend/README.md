# BarberSangaji Backend API

Backend service untuk aplikasi **BarberSangaji**.
API ini menyediakan:

* Autentikasi pengguna (register & login)
* Upload file ke Vercel Blob Storage
* CRUD konten (foto & video)
* CRUD testimonial pelanggan
* Dokumentasi API berbasis OpenAPI menggunakan Scalar

---

## Persiapan Awal

### 1. Install dependencies

```bash
npm install
```

---

## Setup MongoDB Atlas

1. Buka [https://cloud.mongodb.com](https://cloud.mongodb.com)

2. Buat akun atau login.

3. Buat **Project** baru dan **Cluster**.

4. Tambahkan **Database User**:

   * Username: `barberadmin`
   * Password: `strongpassword`

5. Tambahkan IP whitelist:

   ```
   0.0.0.0/0
   ```

6. Klik **Connect → Drivers → Node.js** lalu salin connection string, contoh:

   ```
   mongodb+srv://barberadmin:<password>@cluster0.mongodb.net/barberdb?retryWrites=true&w=majority
   ```

---

## Setup Vercel Blob Storage

1. Login ke [https://vercel.com](https://vercel.com)

2. Pastikan sudah memiliki project (biasanya frontend).

3. Jalankan perintah berikut di lokal:

   ```bash
   vercel blob ls
   ```

4. Jika belum login atau belum punya token:

   ```bash
   vercel login
   vercel blob token
   ```

5. Salin token dan simpan sebagai environment variable `BLOB_READ_WRITE_TOKEN`.

6. (Opsional) Salin domain publik Blob dari dashboard Vercel, contoh:

   ```
   barbersangaji.public.blob.vercel-storage.com
   ```

   Simpan sebagai `NEXT_PUBLIC_VERCEL_BLOB_DOMAIN`.

---

## Konfigurasi Environment

Salin file `.env.example` menjadi `.env`, lalu sesuaikan nilainya:

```bash
# Environment
PORT=3000

# MongoDB
MONGODB_URI=mongodb+srv://<dbUser>:<dbPass>@cluster0.mongodb.net/barberdb?retryWrites=true&w=majority

# JWT
JWT_SECRET=replace_with_a_strong_random_string_here

# Vercel Blob
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token_here
NEXT_PUBLIC_VERCEL_BLOB_DOMAIN=your-blob-domain-or-store

# Optional: admin seed password
SEED_ADMIN_PASSWORD=admin123

# API Documentation
ENABLE_DOCS=true     # Set to 'false' untuk disable dokumentasi API
```

Catatan:

* Untuk deployment (Railway / cloud), **jangan gunakan tanda petik** pada value environment variable.
* Pastikan MongoDB Atlas sudah mengizinkan koneksi dari `0.0.0.0/0`.
* `ENABLE_DOCS=false` berguna untuk production agar API documentation tidak terbuka ke publik.

---

## Menjalankan Server Lokal

```bash
npm run dev
```

Server akan berjalan di:

```
http://localhost:3000
```

Dokumentasi API (jika ENABLE_DOCS=true):

```
http://localhost:3000/api/docs
```

---

## Deployment (Railway)

Backend ini dapat dideploy ke Railway menggunakan GitHub repository.

Konfigurasi penting di Railway:

* Source Directory: `backend` (jika monorepo)
* Start Command: `npm start`
* Pastikan environment variables sudah di-set di dashboard Railway
* Gunakan domain publik `*.up.railway.app` untuk akses API

---

## Struktur Folder

```
.
├── api/
│   └── index.js
├── docs/
│   └── openapi.yaml
├── controller/
│   ├── authController.js
│   ├── blobController.js
│   ├── contentController.js
│   └── testimonialsController.js
├── lib/
│   ├── auth.js
│   └── mongoose.js
├── models/
│   ├── User.js
│   ├── Content.js
│   └── Testimonial.js
├── routes/
│   ├── auth.js
│   ├── blob.js
│   ├── content.js
│   └── testimonials.js
├── .env.example
└── package.json
```

---

## Endpoint Utama

| Route                | Method             | Deskripsi                          |
| -------------------- | ------------------ | ---------------------------------- |
| `/auth/register`     | POST               | Register user baru                 |
| `/auth/login`        | POST               | Login dan mendapatkan JWT          |
| `/blob/upload`       | POST               | Upload file ke Blob Storage        |
| `/content`           | GET / POST         | Ambil atau buat konten             |
| `/content/{id}`      | GET / PUT / DELETE | Operasi konten berdasarkan ID      |
| `/testimonials`      | GET / POST         | Ambil atau buat testimonial        |
| `/testimonials/{id}` | GET / PUT / DELETE | Operasi testimonial berdasarkan ID |

---

## Catatan Penting

* Endpoint yang dilindungi memerlukan header:

  ```
  Authorization: Bearer <JWT_TOKEN>
  ```

* Upload file menggunakan `multipart/form-data` dengan field `file`.

* URL file hasil upload akan dikembalikan langsung oleh API.

---

## Dokumentasi API

Dokumentasi berbasis **OpenAPI v3.0.3** menggunakan Scalar tersedia di:

```
/api/docs
```

Atau melalui browser:

```
http://localhost:3000/api/docs
```

Catatan:
* Dokumentasi hanya muncul jika `ENABLE_DOCS=true` di environment variable.
* Di production, disarankan untuk set `ENABLE_DOCS=false` agar dokumentasi tidak terbuka ke publik.
