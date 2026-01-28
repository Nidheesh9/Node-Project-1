# 📝 Task Management API (Node.js + Express + Sequelize)

A RESTful Task Management API with **JWT authentication**, **task CRUD**, **filtering**, **sorting**, **pagination**, and **centralized error handling**.

---

## 🚀 Tech Stack

- Node.js
- Express.js
- MySQL
- Sequelize ORM
- JWT (Authentication)
- bcrypt (Password hashing)
- dotenv (Environment variables)

---

## 📁 Project Structure

```
├── config/
│   ├── database.js
│   ├── logger.js
|   └── index.js
├── controllers/
│   ├── authController.js
│   └── taskController.js
├── models/
│   ├── index.js
│   ├── user.js
│   └── task.js
├── routes/
│   ├── authRoutes.js
│   ├── taskRoutes.js
|   └── index.js
├── middleware/
│   ├── authMiddleware.js
│   └── errorHandlerMiddleware.js
├── utils/
│   ├── CustomError.js
│   ├── catchAsync.js
│   └── utils.js
├── .env
├── app.js
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone <repository-url>
cd task-manager-api
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 4️⃣ Run Database Migrations

```bash
npx sequelize-cli db:migrate
```

---

### 5️⃣ Start the Server

```bash
npm run dev
```

## 🗄️ Database Design

### User Table

| Field     | Type      | Description                 |
| --------- | --------- | --------------------------- |
| id        | INT       | Primary key, auto-increment |
| username  | STRING    | Unique, required            |
| email     | STRING    | Unique, required            |
| password  | STRING    | Hashed, required            |
| createdAt | TIMESTAMP | Auto-generated              |
| updatedAt | TIMESTAMP | Auto-generated              |

---

### Task Table

| Field       | Type      | Description                 |
| ----------- | --------- | --------------------------- |
| id          | INT       | Primary key, auto-increment |
| title       | STRING    | Required                    |
| description | TEXT      | Optional                    |
| priority    | ENUM      | low, medium, high           |
| dueDate     | DATE      | Required                    |
| status      | ENUM      | pending, completed          |
| userId      | INT       | Foreign key → User          |
| createdAt   | TIMESTAMP | Auto-generated              |
| updatedAt   | TIMESTAMP | Auto-generated              |

---

## 🔐 Authentication APIs

### Register User

```
POST /auth/register
```

### Login User

```
POST /auth/login
```

Response:

```json
{
  "token": "jwt-token"
}
```

---

## 📝 Task APIs

### Create Task

```
POST /tasks
Authorization: Bearer <token>
```

### Get All Tasks (with filtering, sorting, pagination)

```
GET /tasks?priority=high&status=pending&sortBy=dueDate&order=asc&page=1&limit=10
Authorization: Bearer <token>
```

### Get Task by ID

```
GET /tasks/:id
Authorization: Bearer <token>
```

### Update Task

```
PUT /tasks/:id
Authorization: Bearer <token>
```

### Delete Task

```
DELETE /tasks/:id
Authorization: Bearer <token>
```

---

## 🔍 Filtering & Sorting

### Filters

- priority: low | medium | high
- status: pending | completed
- startDate & endDate (YYYY-MM-DD)

### Sorting

- sortBy: dueDate | priority
- order: asc | desc

---

## ❌ Error Handling

Standard error response format:

```json
{
  "status": "fail",
  "message": "Error description"
}
```

Handled cases:

- Invalid input data
- Unauthorized access
- Resource not found
- Validation errors
- Internal server errors

---

## 🛡️ Middleware

- **Authentication Middleware** – Protects routes using JWT
- **Global Error Handler** – Centralized error handling with consistent responses

---

## 🧠 Best Practices

- Password hashing using bcrypt
- JWT-based authentication
- Centralized error handling
- Modular folder structure
- Sequelize migrations for DB consistency
- UTC date storage (timezone safe)

---
