# 🎬 SIS Portal: Full-Stack Student Information System

![ASP.NET Core 8](https://img.shields.io/badge/ASP.NET%20Core%208-512BD4?style=flat&logo=.net&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![SQL Server](https://img.shields.io/badge/SQL%20Server-CC2927?style=flat&logo=microsoft-sql-server&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)
![Netflix Style](https://img.shields.io/badge/Design-Netflix%20Style-E50914?style=flat)

## 📝 Project Overview
**SIS Portal** is a high-performance, full-stack management system designed with a **premium cinematic aesthetic**. Inspired by modern streaming platforms like Netflix, the portal provides a sleek, dark-themed interface for managing students, instructors, and course enrollments. 

The project features a robust **ASP.NET Core** backend and a lightning-fast **React (Vite)** frontend, all fully containerized for seamless deployment.

---

## 🎨 Premium Cinematic Redesign
The portal has undergone a complete UI overhaul to provide a professional and immersive experience:
- **Netflix Dark Theme**: A deep, cinematic palette using high-contrast blacks and Netflix Red accents.
- **Sleek Branding**: A custom minimalist logo featuring a geometric shield and graduation cap.
- **Glassmorphism & Animations**: Smooth transitions, hover-scaling effects, and modern card layouts.
- **Responsive Layout**: Fully optimized for Desktop, Tablet, and Mobile views.

---

## 🛠 Tech Stack

### 🖥️ Frontend (React)
- **Framework**: Vite + React
- **Styling**: Vanilla CSS with modern Flexbox/Grid and custom variables.
- **Navigation**: React Router v6
- **API Client**: Axios with JWT interceptors.

### ⚙️ Backend (ASP.NET Core)
- **API**: RESTful Web API (ASP.NET Core 8/10).
- **Database**: SQL Server 2022.
- **ORM**: Entity Framework Core (Code-First).
- **Security**: JWT Authentication & Role-Based Access Control (RBAC).

---

## 🚀 Getting Started (Docker Compose)

The easiest way to run the entire stack is using Docker Compose:

1.  **Clone the Repository**:
    ```bash
    git clone <repository-url>
    cd project
    ```

2.  **Build and Launch**:
    ```powershell
    docker compose up --build -d
    ```

3.  **Access the Portal**:
    - **Frontend**: [http://localhost:3000](http://localhost:3000)
    - **API Swagger**: [http://localhost:5000/swagger](http://localhost:5000/swagger)

---

## 🔑 Default Credentials

| Role | Username | Password |
| :--- | :--- | :--- |
| **Admin** | `admin` | `Admin@123` |

> **Note**: Students and Instructors can self-register directly through the portal's [Sign Up](http://localhost:3000/register) page.

---

## 📡 API Architecture

The backend is built using a clean, service-based architecture:
- **Identity Integration**: All students and instructors are linked to a central `User` identity for unified authentication.
- **DTO Pattern**: Ensures internal models are never exposed; all data transfer happens through optimized DTOs.
- **Role-Based Security**:
    - `Admin`: Full control over users, courses, and system settings.
    - `Instructor`: Can create courses and grade enrollments.
    - `Student`: Can browse courses and view their own enrollments/grades.

---

## 🛡 Security Standards
- **JWT Authentication**: Secure token-based access with 8-hour expiration.
- **BCrypt Hashing**: All passwords are encrypted using industry-standard salt/hashing.
- **HTTP-Only Cookies**: (Recommended for Production) To prevent XSS and token theft.

---

## 📸 Branding & Logo
The custom "SIS PORTAL" logo is integrated into the header and login screens, providing a consistent and professional brand identity. It features a flat, modern design optimized for dark mode interfaces.

---

## 📄 License
This project is for educational purposes.
