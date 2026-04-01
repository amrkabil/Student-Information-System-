# 🎓 Student Information System API

![ASP.NET Core 8](https://img.shields.io/badge/ASP.NET%20Core%208-512BD4?style=flat&logo=.net&logoColor=white)
![Entity Framework Core](https://img.shields.io/badge/EF%20Core%208-512BD4?style=flat&logo=dotnet&logoColor=white)
![SQL Server](https://img.shields.io/badge/SQL%20Server-CC2927?style=flat&logo=microsoft-sql-server&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=json-web-tokens&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=flat&logo=swagger&logoColor=black)

## 📝 Project Description
This is a professional **RESTful Web API** built with **ASP.NET Core 8** designed for managing students, instructors, courses, and enrollments. The system features secure **JWT authentication** and **Role-Based Access Control** (Admin, Instructor, Student) to protect sensitive data. It utilizes **Entity Framework Core** with **SQL Server** for persistence and is fully containerized with **Docker** for seamless deployment across environments.

## 🛠 Technologies Used

| Technology | Version | Description |
| :--- | :--- | :--- |
| **ASP.NET Core Web API** | 8.0 | High-performance framework for building cross-platform REST services. |
| **Entity Framework Core** | 8.0.0 | Modern Object-Database Mapper for handling database operations. |
| **SQL Server 2022** | Latest | Industrial-strength relational database for data persistence. |
| **JWT Authentication** | 8.0.0 | Stateless security framework for token-based authorization. |
| **BCrypt.Net-Next** | 4.0.3 | Industry-standard password hashing algorithm (Blowfish-based). |
| **Swagger/OpenAPI** | 6.5.0 | Interactive API specification and testing documentation. |
| **Docker** | Latest | Container platform for package management and isolation. |
| **Docker Compose** | Latest | Orchestration tool for multi-container application setups. |

## 📂 Project Structure
```text
project/
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── README.md
└── StudentSystem.API/
    ├── StudentSystem.API.csproj
    ├── Program.cs
    ├── appsettings.json
    ├── Controllers/
    │   ├── AuthController.cs
    │   ├── StudentsController.cs
    │   ├── CoursesController.cs
    │   ├── EnrollmentsController.cs
    │   └── InstructorsController.cs
    ├── Data/
    │   └── AppDbContext.cs
    ├── DTOs/
    │   └── Dtos.cs
    ├── Models/
    │   ├── Student.cs
    │   └── Entities.cs
    └── Services/
        ├── StudentService.cs
        ├── CourseService.cs
        ├── EnrollmentService.cs
        └── InstructorService.cs
```

## 🔗 Entity Relationships
The system architect utilizes EF Core Fluent API to enforce three core database relationships:
1.  **One-to-One**: `Instructor` ↔ `InstructorProfile` (Each instructor has a unique professional biography and office locale).
2.  **One-to-Many**: `Instructor` → `Courses` (A single instructor can teach multiple courses).
3.  **Many-to-Many**: `Students` ↔ `Courses` via the `Enrollment` join table (Students enroll in multiple courses, and courses host multiple students).

## 🚀 How to Run with Docker
Follow these steps to deploy the full stack on your local machine:

1.  **Prerequisites**: Ensure **Docker Desktop** is installed and running.
2.  **Clone the Repository**:
    ```bash
    git clone <repository-url>
    ```
3.  **Navigate to Project Folder**: Open your terminal in the directory containing `docker-compose.yml`.
4.  **Clear Docker Cache**:
    ```powershell
    docker builder prune -f
    ```
5.  **Build and Start**:
    ```powershell
    docker compose up --build
    ```
6.  **Initialization**: Wait 30-60 seconds for SQL Server to initialize and for the API to apply automatic migrations.
7.  **Open Swagger**: Navigate to [http://localhost:5000/swagger/index.html](http://localhost:5000/swagger/index.html).

## 🔑 Default Login Credentials

| Role | Username | Password |
| :--- | :--- | :--- |
| **Admin** | `admin` | `Admin@123` |
| **Instructor** | `instructor1` | `Instructor@123` |
| **Student** | `student1` | `Student@123` |

## 🛡 How to Authenticate in Swagger
1.  Open [http://localhost:5000/swagger/index.html](http://localhost:5000/swagger/index.html).
2.  Find the **POST `/api/auth/login`** endpoint and click **"Try it out"**.
3.  Enter the `admin` credentials (or any role) and click **"Execute"**.
4.  Copy the long string in the `token` field of the JSON response.
5.  Click the **"Authorize"** button (lock icon) at the top right of the page.
6.  In the text box, type `Bearer ` (with a space) and then **paste your token**.
7.  Click **"Authorize"** then **"Close"** — all protected endpoints are now unlocked.

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description | Role Required |
| :--- | :--- | :--- | :--- |
| POST | `/api/auth/login` | Authenticate user and get JWT | Public |
| POST | `/api/auth/register` | Register a new user | Public |

### Students
| Method | Endpoint | Description | Role Required |
| :--- | :--- | :--- | :--- |
| GET | `/api/students` | List all students | Authorized |
| GET | `/api/students/{id}` | Get student by ID | Authorized |
| POST | `/api/students` | Create new student | Admin |
| PUT | `/api/students/{id}` | Update student data | Admin |
| DELETE | `/api/students/{id}` | Remove student | Admin |

### Courses
| Method | Endpoint | Description | Role Required |
| :--- | :--- | :--- | :--- |
| GET | `/api/courses` | List all available courses | Authorized |
| GET | `/api/courses/{id}` | Get course details | Authorized |
| POST | `/api/courses` | Create new course | Admin, Instructor |
| PUT | `/api/courses/{id}` | Update course info | Admin, Instructor |
| DELETE | `/api/courses/{id}` | Remove course | Admin |

### Enrollments
| Method | Endpoint | Description | Role Required |
| :--- | :--- | :--- | :--- |
| GET | `/api/enrollments` | View all enrollments | Authorized |
| POST | `/api/enrollments` | Enroll student in course | Admin, Instructor |
| PUT | `/api/enrollments/{id}/grade` | Update student grade | Admin, Instructor |
| DELETE | `/api/enrollments/{id}` | Remove enrollment | Admin |

### Instructors
| Method | Endpoint | Description | Role Required |
| :--- | :--- | :--- | :--- |
| GET | `/api/instructors` | List all instructors | Public |
| POST | `/api/instructors` | Create instructor | Admin |
| POST | `/api/instructors/{id}/profile` | Add/Update Bio & Office | Admin |
| DELETE | `/api/instructors/{id}` | Remove instructor | Admin |

## 🌟 Key Technical Features

-   **Dependency Injection**: All logic is decoupled using interfaces; services are registered as `Scoped` to match the HTTP request lifecycle.
-   **DTO Pattern**: The API utilizes separate DTOs for creation, updates, and reads, ensuring internal database entities are never exposed directly to the client.
-   **DTO Validation**: Leverages System.ComponentModel.DataAnnotations to enforce business rules at the entry point, automatically returning `400 Bad Request` for invalid data.
-   **LINQ Optimization**: High-performance queries using `.Select()` for direct projection and `.AsNoTracking()` for read-only requests to bypass EF Core tracking overhead.
-   **JWT Authentication**: Implements stateless, token-based authentication with a secure 8-hour expiry and standard Bearer header validation.
-   **Role-Based Authorization**: Fine-grained access control using ASP.NET Identity roles (Admin, Instructor, Student) to restrict destructive operations.
-   **Auto Migration**: A robust startup retry loop (10 retries) ensures the API waits for SQL Server to be ready before applying migrations or ensuring database creation.

## 🍪 Why HTTP-Only Cookies are a Security Standard
In a professional production environment, **HTTP-only cookies** are considered the industry standard for securing authentication tokens over alternatives like `localStorage`. Because HTTP-only cookies are inaccessible to client-side JavaScript, they provide a primary defense against **Cross-Site Scripting (XSS)** attacks, where a malicious script could otherwise steal the token. Furthermore, when combined with the `SameSite` attribute, they mitigate **Cross-Site Request Forgery (CSRF)** risks by controlling how cookies are sent in cross-site requests. Most modern security-conscious frameworks default to this approach because it isolates sensitive credentials from the browser's scriptable environment.

## 🌍 Environment Variables

The following variables are managed via `docker-compose.yaml`:

| Variable | Value | Description |
| :--- | :--- | :--- |
| `ConnectionStrings__DefaultConnection` | `Server=sqlserver,1433;Database=...` | Connection to the SQL Server container. |
| `Jwt__Key` | `StudentSystemSuperSecretKey...` | 256-bit secret key for signing JWTs. |
| `Jwt__Issuer` | `StudentSystemAPI` | Token authority identifier. |
| `Jwt__Audience` | `StudentSystemClient` | Expected token recipient. |
| `ASPNETCORE_URLS` | `http://+:8080` | Internal port binding for the Kestrel server. |

## 📸 Screenshots
> Swagger UI and Postman screenshots go here after running the project.
