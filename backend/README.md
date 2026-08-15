# 🚗 FleetDesk Backend API

<p align="center">
  <b>Fleet Management & Vehicle Booking System</b>
</p>

<p align="center">
  Backend REST API untuk pengelolaan kendaraan operasional, driver, booking kendaraan, approval workflow, dan audit activity log menggunakan Laravel.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" alt="Laravel" />
  <img src="https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white" alt="PHP" />
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
  <img src="https://img.shields.io/badge/Sanctum-Authentication-blue?style=for-the-badge" alt="Sanctum" />
</p>

---

## 📌 Overview

**FleetDesk** merupakan sistem manajemen kendaraan operasional terpadu yang dirancang untuk membantu perusahaan dalam mengelola armada, pengemudi, hingga proses administrasi peminjaman dan perizinan secara otomatis dan transparan.

Sistem ini mencakup:
- 🚙 **Data Kendaraan Operasional** (Master data, tipe, kepemilikan, & status ketersediaan)
- 👨‍✈️ **Data Driver** (Informasi SIM, lisensi, & status jadwal)
- 📍 **Lokasi & Pool Operasional** (Region & Site)
- 📅 **Sistem Booking Otomatis** (Validasi bentrok jadwal kendaraan & driver)
- 🔄 **Approval Workflow Bertingkat** (Multi-level authorization flow)
- 📝 **Audit Trail & Activity Log** (Pencatatan riwayat aksi secara komprehensif)

---

## 🚀 Main Features

### 🔐 Authentication & Security
- Menggunakan **Laravel Sanctum** untuk pengelolaan API token.
- Login dengan email dan password.
- Generate access token per-session.
- Revoke token & secure logout.
- Endpoint current user profile (`/api/me`).

### 👥 Role-Based Authorization
FleetDesk menerapkan *Role-Based Access Control* (RBAC) ketat:
- **👨‍💼 Admin**: Mengelola master data (kendaraan, driver, tipe), membuat reservasi/booking, dan memantau log aktivitas.
- **✅ Approver**: Memverifikasi dan menyetujui/menolak pengajuan booking sesuai tingkatan otorisasi (*Level 1* & *Level 2*).

---

## 🚘 Vehicle & Driver Management

### 🚘 Vehicle Management
- **Fitur**: CRUD (Create, Read, Update, Delete/Nonaktifkan) data kendaraan operasional.
- **Atribut Data**: `Vehicle Type`, `License Plate`, `Brand`, `Model`, `Year`, `Ownership`, `Status`.

### 👤 Driver Management
- **Fitur**: CRUD (Create, Read, Update, Delete/Nonaktifkan) data driver/pengemudi.
- **Atribut Data**: `Employee ID`, `Name`, `Phone`, `License Number`, `License Expiry`, `Status`.

---

## 📅 Booking & Approval Workflow

### 📅 Booking Conflict Prevention
Sistem secara otomatis memeriksa validasi bentrok sebelum booking dibuat:
1. Pengecekan ketersediaan kendaraan pada rentang waktu yang dipilih.
2. Pengecekan ketersediaan driver pada jadwal yang sama.
3. Pencegahan *double-booking* atau bentrok jadwal operasional.

### 🔄 Multi-Level Approval Pipeline
```text
[ DRAFT ] ──► [ PENDING_LEVEL_1 ] ──► [ PENDING_LEVEL_2 ] ──► [ APPROVED ]
                    │                       │
                    └──► [ REJECTED ]       └──► [ REJECTED ]
```

Setiap proses persetujuan akan:
1. Memperbarui status booking.
2. Mencatat entri approval history beserta catatan approver.
3. Menulis jejak audit ke dalam **Activity Log**.

---

## 📝 Activity Log & Audit Trail

Mencatat seluruh mutasi dan aksi penting pengguna ke database untuk keperluan audit:
- **Tipe Aksi**: `CREATE`, `SUBMIT`, `APPROVE_LEVEL_1`, `APPROVE_LEVEL_2`, `REJECT`, `UPDATE`, `CANCEL`.
- **Metadata**: Menyimpan User ID, Action Type, Entity Affected, Description, JSON Metadata, dan Timestamp.

---

## 🛠 Tech Stack

| Technology | Role / Purpose |
| :--- | :--- |
| **Laravel 10.x / 11.x** | Backend Web Framework & API Architecture |
| **PHP 8.2+** | Server-side Scripting Language |
| **MySQL 8.0+** | Relational Database Management System |
| **Laravel Sanctum** | API Token Authentication |
| **Eloquent ORM** | Relational Mapping & Query Building |

---

## 📂 Project Structure

```text
fleetdesk-backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/       # API Controllers (Auth, Vehicle, Driver, Booking, Approval)
│   │   ├── Middleware/        # Auth & Role-based Middleware
│   │   └── Requests/          # Custom Form Request Validations
│   ├── Models/                # Eloquent Models & Relationships
│   └── Services/              # Business Logic & Availability Checkers
├── database/
│   ├── migrations/            # Database schema migrations
│   └── seeders/               # Master & Dummy Data Seeders
├── routes/
│   └── api.php                # REST API Route Declarations
└── tests/                     # Automated feature & unit test scripts
```

---

## ⚙️ Installation & Setup

### 1. Clone & Dependencies
```bash
# Clone repository
git clone <repository-url>
cd backend

# Install PHP dependencies
composer install
```

### 2. Environment Setup
```bash
# Salin template environment
cp .env.example .env

# Generate Application Key
php artisan key:generate
```
> **Catatan**: Sesuaikan konfigurasi database (`DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`) pada file `.env`.

### 3. Database Migration & Seeding
Jalankan migrasi database beserta seeder bawaan:
```bash
php artisan migrate:fresh --seed
```
*Seeder akan otomatis menginisialisasi role Admin & Approver, Region, Site, Dummy Vehicle Type, Unit Kendaraan, dan Data Driver.*

---

## 👨‍💻 Default Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@test.com` | `password123` |
| **Approver** | `approver@test.com` | `password123` |

---

## ▶️ Running the Server

```bash
php artisan serve
```
Base API URL: `http://127.0.0.1:8000`

---

## 🔌 API Endpoint Reference

### 🔐 Authentication
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/login` | Login user & return Bearer token | No |
| `POST` | `/api/logout` | Revoke current user token | Yes |
| `GET` | `/api/me` | Get authenticated user profile | Yes |

### 🚘 Vehicles
| Method | Endpoint | Description | Role |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/vehicles` | List all vehicles | Authenticated |
| `POST` | `/api/vehicles` | Create new vehicle | Admin |
| `GET` | `/api/vehicles/{id}` | Get vehicle detail | Authenticated |
| `PUT` | `/api/vehicles/{id}` | Update vehicle | Admin |
| `DELETE` | `/api/vehicles/{id}` | Deactivate/Delete vehicle | Admin |

### 👤 Drivers
| Method | Endpoint | Description | Role |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/drivers` | List all drivers | Authenticated |
| `POST` | `/api/drivers` | Create new driver | Admin |
| `GET` | `/api/drivers/{id}` | Get driver detail | Authenticated |
| `PUT` | `/api/drivers/{id}` | Update driver | Admin |
| `DELETE` | `/api/drivers/{id}` | Deactivate/Delete driver | Admin |

### 📅 Bookings & Approval
| Method | Endpoint | Description | Role |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/bookings` | List bookings | Authenticated |
| `POST` | `/api/bookings` | Create new booking | Admin / User |
| `GET` | `/api/bookings/{id}` | Get booking details | Authenticated |
| `PUT` | `/api/bookings/{id}` | Update draft booking | Admin / User |
| `DELETE` | `/api/bookings/{id}` | Cancel/Delete booking | Admin / User |
| `POST` | `/api/bookings/{id}/submit` | Submit draft booking to approval workflow | Admin / User |
| `POST` | `/api/booking-approvals/{id}/approve` | Approve booking level | Approver |

---

## 🧪 Automated Testing

Proyek ini telah dilengkapi dengan bash test script untuk menguji alur integrasi end-to-end secara otomatis:
```bash
chmod +x test_booking_workflow.sh
./test_booking_workflow.sh
```

**Alur Pengujian:**
```text
[CREATE BOOKING] ──► [SUBMIT] ──► [APPROVE LEVEL 1] ──► [APPROVE LEVEL 2] ──► [VERIFY APPROVED & AUDIT LOG]
```

---

## 🔒 Security Measures
- ✅ **Token-based Authentication** via Laravel Sanctum.
- ✅ **Route Guard & Authorization Middleware** untuk pembagian akses Admin/Approver.
- ✅ **Strict Request Validation** menggunakan Laravel Form Requests.
- ✅ **SQL Injection & XSS Prevention** melalui Eloquent ORM parameterized queries.

---

## 🎯 Future Enhancements
- 📊 Interactive Frontend Dashboard & Analytics.
- 🔔 Real-time Email & In-App Notification System.
- 📅 Interactive Calendar View for Vehicle Scheduling.
- 📑 Export Reports (PDF & Excel / Spreadsheet).

---

## 👨‍💻 Author & License
- **Developed by**: FleetDesk Development Team
- **Status**: *Backend API Ready for Production / Demonstration*
