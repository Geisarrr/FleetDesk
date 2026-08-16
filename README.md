# 🚗 FleetDesk

[![Development Status](https://img.shields.io/badge/status-active--development-orange.svg)]()
[![Backend](https://img.shields.io/badge/Backend-Laravel%2012%20%7C%20PHP%208.2+-red.svg)]()
[![Frontend](https://img.shields.io/badge/Frontend-React%20%7C%20Vite-blue.svg)]()
[![Database](https://img.shields.io/badge/Database-MySQL-blue.svg)]()

**FleetDesk** is an enterprise-grade fleet management and vehicle booking platform designed to streamline operational vehicle allocation, booking requests, and multi-tier approval workflows.

The platform provides a unified command center for real-time fleet tracking, booking request lifecycle management, and transparent multi-level approval hierarchies.

> 🚧 **Development Notice**: This project is actively under development. Core architecture, business workflows, and API integrations are operational, while UI/UX polishing and analytics features are currently being finalized.

---

## 📑 Table of Contents
- [Key Features](#-key-features)
- [System Architecture & Workflow](#-system-architecture--workflow)
- [Tech Stack](#-tech-stack)
- [Repository Structure](#-repository-structure)
- [Database Entities](#-database-entities)
- [API Endpoints Overview](#-api-endpoints-overview)
- [Development Milestones](#-development-milestones)
- [Getting Started & Installation](#-getting-started--installation)
- [Environment Requirements](#-environment-requirements)
- [License](#-license)

---

## ✨ Key Features

### 🔐 Authentication & Access Control
- Token-based API authentication via **Laravel Sanctum**.
- Granular Role-Based Access Control (**RBAC**).
- Dedicated role personas: **Admin**, **Approver**, and **Requester**.
- Secure API route protection and middleware enforcement.

### 🚙 Fleet & Asset Management
- Comprehensive vehicle inventory management (availability status, vehicle type, license plate).
- Driver allocation and contact management.
- Geographic hierarchy: Multi-site, regional branch, and depot mapping.

### 📅 Booking Lifecycle Management
- Self-service vehicle requisition creation.
- Real-time booking tracking and status transitions.
- Complete audit logs and historical booking logs.

### ⚡ Multi-Level Approval Engine
- Hierarchical, multi-tier approval workflow.
- Dedicated **Approver Center** dashboard for one-click reviews (Approve/Reject).
- Automated audit trails documenting decision timestamps and notes.

### 📊 Operations Dashboard
- Real-time KPI summaries: Total fleet, active bookings, approval backlogs.
- Vehicle availability and status monitors.
- Recent booking feed and fleet utilization metrics.

---

## 🔄 System Architecture & Workflow

```text
[ User / Requester ] ──► ( Submit Booking Request )
                                  │
                                  ▼
[ Approval Engine ]  ──► ( Multi-Tier Approver Review )
                                  │
                  ┌───────────────┴───────────────┐
                  ▼                               ▼
            [ APPROVED ]                    [ REJECTED ]
                  │                               │
                  ▼                               ▼
       ( Allocate Vehicle/Driver )     ( Notify Requisitioner )
                  │
                  ▼
   [ Real-Time Fleet Dashboard & Telemetry ]
```

---

## 🛠️ Tech Stack

### Backend
- **Framework:** Laravel 12 (PHP 8.2+)
- **Authentication:** Laravel Sanctum
- **Database / ORM:** MySQL / Eloquent ORM
- **Architecture:** RESTful API & Service-Repository Pattern

### Frontend
- **Framework:** React (Vite-powered)
- **State & Networking:** React Hooks, Axios
- **Design System:** Custom Dark Glass Enterprise UI (CSS Modules / Vanilla CSS Tokens)
- **Icons:** Lucide React

---

## 📁 Repository Structure

```text
FleetDesk/
├── backend/
│   ├── app/
│   │   ├── Http/Controllers/    # API Controllers
│   │   ├── Models/              # Eloquent Models
│   │   └── Services/            # Core business & approval logic
│   ├── database/
│   │   ├── migrations/          # Schema definitions
│   │   └── seeders/             # Initial dummy & role seeds
│   └── routes/
│       └── api.php              # RESTful API routing
│
└── frontend/
    ├── src/
    │   ├── components/          # Reusable UI tokens (GlassCard, StatsCard, etc.)
    │   ├── pages/               # Functional view modules (Dashboard, Booking, Fleet)
    │   ├── services/            # Axios API instances & service calls
    │   └── styles/              # Design tokens, variables & theme stylesheets
    ├── index.html
    └── vite.config.js
```

---

## 🗄️ Database Entities

- `users` — User profiles and credentials
- `roles` — System access permission tiers
- `regions` & `sites` — Geographic locations & operating depots
- `vehicles` & `vehicle_types` — Fleet asset inventory
- `drivers` — Assigned vehicle operators
- `bookings` — Vehicle requisition requests
- `booking_approvals` — Approval steps and sign-off records
- `activity_logs` — System event auditing

---

## 🔌 API Endpoints Overview

### Authentication
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/login` | Authenticate user & issue Sanctum bearer token |
| `POST` | `/api/logout` | Revoke active access token |
| `GET` | `/api/me` | Fetch authenticated user profile and roles |

### Dashboard & Analytics
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/dashboard` | Retrieve aggregated fleet statistics and operational summary |

### Approvals
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/approvals` | Retrieve pending and reviewed approval queue |
| `POST` | `/api/booking-approvals/{id}/approve` | Approve a specific requisition tier |
| `POST` | `/api/booking-approvals/{id}/reject` | Decline a requisition with remarks |

### Bookings
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/bookings` | List all bookings (filterable by status/date) |
| `POST` | `/api/bookings` | Create a new vehicle requisition |
| `PUT` | `/api/bookings/{id}` | Update booking details |
| `DELETE`| `/api/bookings/{id}` | Cancel/delete a booking request |

---

## 📈 Development Milestones

### ✅ Completed
- [x] Sanctum authentication & RBAC middleware.
- [x] Full CRUD operations for Fleet (Vehicles, Drivers, Sites).
- [x] Booking state machine & multi-level approval engine.
- [x] Approver review portal & decision handling.
- [x] Core Dashboard metrics API & React integration.

### 🚧 In Progress
- [ ] UI Design System alignment (*Glass Enterprise standard*).
- [ ] Interactive trend graphs & fleet utilization calculations.
- [ ] Mobile responsive layout refinements.

### 📌 Planned
- [ ] Automated email/in-app approval notifications.
- [ ] Excel/PDF operational report generation.
- [ ] Interactive calendar booking interface.
- [ ] Advanced role & permission management matrix.

---

## 🚀 Getting Started & Installation

### 1. Prerequisites
- **PHP** >= 8.2 & Composer
- **Node.js** >= 18.x & npm
- **MySQL** >= 8.0

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install PHP dependencies
composer install

# Environment configuration
cp .env.example .env

# Generate application encryption key
php artisan key:generate

# Configure database credentials in .env, then run migrations & seeds
php artisan migrate --seed

# Start the Laravel development server
php artisan serve
```

### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install Node dependencies
npm install

# Start the Vite development server
npm run dev
```

---

## 📄 License
This project is currently developed for internal and organizational purposes. All rights reserved.
