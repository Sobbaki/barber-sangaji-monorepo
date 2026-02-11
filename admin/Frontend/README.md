# BarberSangaji Frontend 

Frontend untuk BarberSangaji, dibuat menggunakan **React.js**.

-----

## Konfigurasi Environment

Salin dan konfigurasi *environment variable* untuk backend.

### Konfigurasi File `.env`

1.  Salin file *template environment* dan ubah namanya menjadi **`.env`** di *root* proyek.

    ```bash
    cp .env.example .env
    ```

2.  Buka file **`.env`** dan isi *variable* `VITE_BACKEND_URL` dengan *link* **Backend API**.

    ```bash
    VITE_BACKEND_URL=http://url-backend
    ```

-----

##  Menjalankan Aplikasi Lokal

Setelah konfigurasi `.env` selesai, Jalankan *frontend* secara lokal.

### Instalasi & Menjalankan Server

```bash
npm install
npm start
```

## Struktur Folder

Struktur folder standar React biasanya mencakup:

```

📂 Struktur Folder
Proyek frontend ini menggunakan struktur folder standar React (dengan TypeScript).

.
├── src/
│   ├── /components/        # Komponen UI spesifik halaman atau layout utama.
│   │   └── /ui/            # Komponen UI **reusable** (Button, Card, Input, dll.).
│   ├── /hooks/             # **Custom React Hooks** (misalnya: useFetch, useAuth).
│   ├── /lib/               # Utility/helper functions (misalnya: formatters, konfigurasi **API client**).
│   ├── /models/            # Definisi **Typescript Interfaces/Types** untuk data (User, Content, Testimonial).
│   ├── /pages/             # **Komponen utama** yang merepresentasikan *page* atau *route* (misalnya: Home, Login, ContentList).
│   ├── App.tsx             # Komponen utama untuk konfigurasi *routing*.
│   └── main.tsx            # Entry point aplikasi (render App).
├── **public/**               # **File statis** yang disajikan secara langsung (misalnya: index.html, favicon, images, manifest).
├── .env.example            # Template environment variables.
└── package.json            # Daftar dependensi dan scripts.
```