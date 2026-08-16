# 🚗 FleetDesk

> **FleetDesk** is a modern Fleet Management System designed to streamline company vehicle operations, manage driver assignments, handle vehicle booking requests, and automate multi-level approval workflows.

![Development Status](https://img.shields.io/badge/Status-Active%20Development-orange?style=for-the-badge&logo=git)
![Backend](https://img.shields.io/badge/Backend-Laravel%20%7C%20PHP-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![Frontend](https://img.shields.io/badge/Frontend-React%20%7C%20Vite-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Database](https://img.shields.io/badge/Database-MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

---

## 📌 Project Overview

**FleetDesk** provides an end-to-end solution for corporate fleet administration. It bridges the gap between operational employees requesting transport and fleet managers supervising vehicle availability, maintenance, and administrative approval.

### Primary Objectives:
- **Centralized Fleet Management:** Simplify tracking of vehicles, drivers, regions, and operational sites.
- **Structured Booking Requests:** Facilitate vehicle reservations with clear scheduling, destination, and purpose tracking.
- **Multi-Level Approval Workflow:** Ensure operational governance through tiered approval stages before vehicle dispatch.
- **Operational Dashboard & Monitoring:** Provide real-time operational statistics, summaries, and booking tracking.

> ⚠️ **Project Status & Disclaimer:**
> FleetDesk is currently under **Active Development**. The core backend logic, database schema, and essential booking/approval workflows are fully operational. However, some frontend interfaces, analytics features, and report generation modules are being actively refined. **This project is not yet production-ready.**

---

## 🛠️ Tech Stack

### Backend
- **Language:** PHP 8+
- **Framework:** [Laravel](https://laravel.com/)
- **Authentication:** [Laravel Sanctum](https://laravel.com/docs/sanctum) (Token-based API authentication)
- **Database:** MySQL
- **Architecture:** RESTful API Architecture
- **Capabilities Implemented:**
  - Token Authentication & Session Management
  - Role-Based Access Control (RBAC) via Middleware
  - CRUD operations for Fleet Master Data (Vehicles, Drivers, Types, Sites, Regions)
  - State-driven Booking Request Lifecycle
  - Multi-tier Approval Logic & Decision Logging
  - Aggregated Metrics for Dashboard Endpoints

### Frontend
- **Library/Framework:** [React](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **HTTP Client:** [Axios](https://axios-http.com/) with interceptors
- **Styling:** Modular Custom CSS
- **Architecture:** Component-Driven Architecture with an isolated API Service Layer
- **Capabilities Implemented:**
  - Responsive Admin Dashboard layout
  - Dedicated Approver Action Dashboard
  - Dynamic Form Handling & Validation

---

## 🏗️ System Architecture

FleetDesk follows a decoupled client-server architecture. The React frontend interacts with the Laravel backend strictly via JSON-based REST APIs.

```text
┌───────────────────────────────┐
│     React Frontend (Vite)     │
│   (Admin & Approver Dashboards)│
└──────────────┬────────────────┘
               │
          HTTP / REST API
          (JSON Payload)
               │
┌──────────────▼────────────────┐
│        Laravel Backend        │
│  (Sanctum Auth, RBAC, Logic)  │
└──────────────┬────────────────┘
               │
          Eloquent ORM
               │
┌──────────────▼────────────────┐
│         MySQL Database        │
│  (Relational Storage & Logs)  │
└───────────────────────────────┘
```

---

## 🗄️ Database Design

The database schema is structured to ensure relational integrity, auditability, and traceability for every vehicle request.

### Core Tables Summary

| Table | Description | Key Attributes |
| :--- | :--- | :--- |
| `users` | Stores system users and credentials | `id`, `role_id`, `name`, `email`, `password`, `is_active` |
| `roles` | Defines user privilege levels | `id`, `name` *(e.g., Admin, Approver)* |
| `regions` | Master data of operational areas | `id`, `name`, `description` |
| `sites` | Specific branch/office operational locations | `id`, `region_id`, `name`, `address` |
| `vehicle_types` | Classifications of fleet units | `id`, `name` *(e.g., Passenger, Cargo, Heavy)* |
| `vehicles` | Fleet inventory details and current status | `id`, `vehicle_type_id`, `site_id`, `license_plate`, `brand`, `model`, `year`, `ownership`, `status` |
| `drivers` | Registered vehicle drivers | `id`, `name`, `phone`, `license_number`, `status` |
| `bookings` | Core vehicle reservation requests | `id`, `booking_code`, `requester_id`, `region_id`, `site_id`, `vehicle_id`, `driver_id`, `booking_date`, `start_time`, `end_time`, `destination`, `purpose`, `notes`, `status` |
| `booking_approvals`| Multi-level approval decisions & audit notes | `id`, `booking_id`, `approver_id`, `level`, `decision`, `note`, `decided_at` |
| `activity_logs` | System-wide audit trails and action history | `id`, `user_id`, `action`, `description`, `ip_address`, `created_at` |

### Entity Relationship Overview

```text
User
 └── Role

Booking
 ├── Requester (User)
 ├── Vehicle ── Vehicle Type
 ├── Driver
 ├── Region
 ├── Site
 └── Booking Approvals (1-to-Many with Approver User)
```

---

## 🚀 Features Status

### ✅ Completed Features
- [x] **Authentication & Security:** Login, Logout, and Token Verification (`/api/me`) via Laravel Sanctum.
- [x] **Authorization & RBAC:** Role middleware enforcing distinct access privileges (Admin vs. Approver).
- [x] **Fleet Master Data:** Comprehensive management for Vehicle Types, Vehicles (status & ownership), and Drivers.
- [x] **Booking Workflow:** Request creation, validation, unique booking code generation, and status handling.
- [x] **Multi-Level Approval:** Approval queue, tiered decision flow (Approve/Reject with notes), and audit timestamps.
- [x] **Dashboard Foundation:** Metrics endpoints providing fleet counts, approval statuses, and recent booking logs.

### 🚧 In Development
- [ ] Dashboard UI polish and responsive layout refinement.
- [ ] Advanced visual analytics and fleet utilization rate calculations.
- [ ] Booking volume trend charts and time-series visualizations.
- [ ] In-app and asynchronous email notification system.
- [ ] Tabular report generation and data export.

---

## 📁 Project Structure

```text
FleetDesk/
├── backend/
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/       # API Resource Controllers
│   │   │   └── Middleware/        # RBAC & Auth Middleware
│   │   └── Models/                # Eloquent Models & Relationships
│   ├── database/
│   │   ├── migrations/            # Table Schemas
│   │   └── seeders/               # Initial Roles & Dummy Data
│   └── routes/
│       └── api.php                # REST API Endpoint Definitions
│
└── frontend/
    └── src/
        ├── components/            # Reusable UI Components
        ├── pages/                 # Dashboard, Booking, and Approval Views
        ├── services/              # Axios API Service Modules
        └── styles/                # Custom CSS Stylesheets
```

---

## 📡 API Documentation Preview

Key REST endpoints available in the system:

### 🔐 Authentication
```http
POST /api/login      # Authenticate user and return Bearer Token
POST /api/logout     # Revoke current access token
GET  /api/me         # Retrieve authenticated user profile & role
```

### 📊 Dashboard
```http
GET  /api/dashboard  # Fetch aggregate fleet counts, active bookings, & summaries
```

### 📝 Bookings
```http
GET  /api/bookings   # List booking requests (filterable by status/date)
POST /api/bookings   # Submit a new vehicle booking request
```

### ✍️ Approvals
```http
GET  /api/approvals                         # Retrieve pending approval requests
POST /api/booking-approvals/{id}/approve    # Approve booking request (Level N)
POST /api/booking-approvals/{id}/reject     # Reject booking request with reason note
```

---

## ⚙️ Installation & Setup

### Prerequisites
- **PHP:** >= 8.1
- **Composer:** >= 2.0
- **Node.js:** >= 18.x & **npm**
- **MySQL Database Server**

---

### 1. Backend Setup

```bash
# Clone the repository
git clone https://github.com/your-username/fleetdesk.git
cd fleetdesk/backend

# Install PHP dependencies
composer install

# Environment configuration
cp .env.example .env

# Generate application key
php artisan key:generate
```

Configure your database connection inside `.env`:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=fleetdesk_db
DB_USERNAME=root
DB_PASSWORD=your_password
```

Run database migrations and seed initial data:
```bash
php artisan migrate --seed

# Start Laravel development server
php artisan serve
```
Backend API will be accessible at: `http://127.0.0.1:8000`

---

### 2. Frontend Setup

```bash
# Navigate to the frontend directory
cd ../frontend

# Install JavaScript dependencies
npm install

# Start Vite development server
npm run dev
```
Frontend application will be accessible at: `http://localhost:5173`

---

## 🔄 Development Workflow

The typical lifecycle of a booking in FleetDesk:

```text
[ User Login ] 
      │
      ▼
[ Create Booking Request ] ───► Status: Pending
      │
      ▼
[ Approval Workflow ] ────────► Approver reviews request
      │
      ├───► [ Approved ] ─────► Status: Approved / Dispatched
      └───► [ Rejected ] ─────► Status: Rejected (Reason Logged)
      │
      ▼
[ Dashboard Monitoring ] ─────► Live metrics & fleet status update
```

---

## 🗺️ Future Roadmap

- [ ] **Automated Notifications:** Email triggers on booking submission, approval, or rejection.
- [ ] **Report Exporting:** Export operational data to Excel (`.xlsx`) and PDF formats.
- [ ] **Interactive Calendar View:** Visual schedule showing vehicle availability and overlap prevention.
- [ ] **Predictive Fleet Maintenance:** Service interval alerts based on usage logs.
- [ ] **Granular User & Organization Management:** Self-serve department and site configuration.
- [ ] **Production Readiness:** Containerization with Docker & CI/CD pipeline automation.

---

## 📄 License & Usage

Currently developed for internal operational testing, educational portfolio demonstration, and continuous improvement.  
All rights reserved © 2026.
