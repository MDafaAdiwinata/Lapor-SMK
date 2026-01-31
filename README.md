# LaporSMK - Sistem Pelaporan Sekolah

<p align="center">
    <img src="https://skillicons.dev/icons?i=laravel" height="80" alt="laravel logo"  />
    <img width="20" />
    <img src="https://skillicons.dev/icons?i=react" height="80" alt="react logo"  />
    <img width="20" />
    <img src="https://skillicons.dev/icons?i=typescript" height="80" alt="typescript logo"  />
    <img width="20" />
    <img src="https://skillicons.dev/icons?i=mysql" height="80" alt="typescript logo"  />
    <img width="20" />
    <img src="https://skillicons.dev/icons?i=tailwind" height="80" alt="Tailwind logo"  />
</p>

## Project Description

**LaporSMK** adalah sistem manajemen pelaporan berbasis web yang dirancang khusus untuk Sekolah Menengah Kejuruan (SMK). Platform ini memungkinkan siswa dan staff sekolah untuk melaporkan berbagai masalah, keluhan, atau saran dengan mudah dan terstruktur. Sistem ini dilengkapi dengan dashboard admin yang powerful untuk mengelola seluruh aspek pelaporan secara real-time.

---

## Feature

### Landing Page
- Halaman beranda yang informatif dan responsif
- Informasi lengkap tentang sistem pelaporan
- Halaman Contact untuk feedback dari pengunjung
- Desain modern dengan UX/UI yang user-friendly

### Authentication
- **Login** - Sistem login yang aman dengan validasi
- **Register** - Registrasi user baru
- **Role-Based Access Control** - 2 role permission (Admin & User)

### Feat for Users Role
- ✅ Membuat laporan baru dengan kategori
- 📋 Melihat daftar laporan yang telah dibuat
- 🔍 Filter dan search laporan
- 📊 Status tracking laporan (Pending, Proses, Selesai)

### Feat for Admin Role
- **User Management**
  - Create, Read, Update, Delete (CRUD) data users
  - Manage role & permissions
  - Aktivasi/deaktivasi akun user

- **Kategori Laporan Management**
  - CRUD kategori laporan
  - Pengaturan jenis-jenis laporan

- **Laporan Management**
  - CRUD semua laporan dari users
  - Update status laporan
  - Assign laporan ke staff terkait
  - Export laporan ke PDF/Excel

- **Feedback Management**
  - CRUD data feedback dari contact page
  - Respond to feedback
  - Arsip feedback

---

## Tech Stack or Framework

### Backend
- **Laravel 11.x** - PHP Framework untuk backend API
- **PHP 8.2+** - Programming language
- **MySQL** - Database management system
- **Inertia.js** - Modern monolith architecture

### Frontend
- **React 18.x** - JavaScript library untuk UI
- **TypeScript** - Type-safe JavaScript
- **TailwindCSS** - Utility-first CSS framework
- **Shadcn UI** - Re-usable component library
- **Inertia.js** - Client-side framework

### Tools & Libraries
- **Vite** - Frontend build tool
- **Axios** - HTTP client
- **React Hook Form** - Form validation
- **Zod** - Schema validation

---

## Installation

### Prerequisites
Pastikan Anda sudah menginstall:
- PHP >= 8.4
- Composer
- Node.js >= 20.x
- NPM
- MySQL

### Langkah Instalasi

1. **Clone repository**
```bash
git clone https://github.com/MDafaAdiwinata/Lapor-SMK.git
cd laporsmk
```

2. **Install dependencies PHP**
```bash
composer install
```

3. **Install dependencies JavaScript**
```bash
npm install
```

4. **Copy environment file**
```bash
cp .env.example .env
```

5. **Generate application key**
```bash
php artisan key:generate
```

6. **Konfigurasi database**
Edit file `.env` dan sesuaikan dengan database Anda:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laporsmk
DB_USERNAME=root
DB_PASSWORD=
```

7. **Jalankan migration & seeder**
```bash
php artisan migrate --seed
```

8. **Build assets**
```bash
npm run dev
```

9. **Jalankan aplikasi**
```bash
php artisan serve
```

Aplikasi akan berjalan di `http://localhost:8000`

---

## 👥 Default Login Credentials

### Admin
```
Email: admin@gmail.com
Password: admin123
```

### User
```
Silahkan daftar akun sendiri yh
```

---

## Screenshots

### Landing Page
![Landing Page](public/storage/landingpage.png)

### Dashboard Admin
![Dashboard Admin](public/storage/dashboardadmin.png)

### User Reports
![User Reports](public/storage/dashboardsiswa.png)

---

## Deployment

### Production Build
```bash
npm run build
php artisan optimize
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Server Requirements
- PHP >= 8.4
- MySQL >= 5.7 atau MariaDB >= 10.3
- Apache
- SSL Certificate (recommended)

---

## License

Project ini dilisensikan di bawah [MIT License](LICENSE)

---

## Kontak

Muhammad Dafa Adiwinata - [https://www.instagram.com/adzzz_21](https://www.instagram.com/adzzz_21)

Project Link: [https://github.com/MDafaAdiwinata/Lapor-SMK.git](https://github.com/MDafaAdiwinata/Lapor-SMK.git)

---

## Acknowledgments

- [Laravel](https://laravel.com)
- [React](https://react.dev)
- [Inertia.js](https://inertiajs.com)
- [TailwindCSS](https://tailwindcss.com)
- [Shadcn UI](https://ui.shadcn.com)
- [TypeScript](https://www.typescriptlang.org)
