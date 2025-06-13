# 🧩 DeepMate – Express Server

This is the **Node.js + Express backend** for the **DeepMate** project — a real-time chess assistant. It handles user authentication, user management, and prediction requests by communicating with the ML microservice.

---

## 🚀 Features

- 🔐 **Authentication** (JWT-based login/register)
- 👤 **User module** (CRUD operations)
- ♟️ **Prediction module** (talks to ML API)
- 🔒 Protected routes via custom middleware
- 🧪 Built for RESTful APIs & scalable architecture

---

## 📦 Tech Stack

- **Node.js 18+**
- **Express.js** – for server and routing
- **MongoDB** + **Mongoose** – for database
- **JWT** – for authentication
- **Axios** – to call ML microservice

---

## 🧠 Modules Overview

### 🔐 Auth

| Method | Route                | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login and get token |

### 👤 Users

| Method | Route            | Description             |
| ------ | ---------------- | ----------------------- |
| GET    | `/api/users`     | Get all users           |
| GET    | `/api/users/:id` | Get user by ID          |
| POST   | `/api/users`     | Create user (internal)  |
| PUT    | `/api/users/:id` | Update user (auth only) |
| DELETE | `/api/users/:id` | Delete user (auth only) |

### ♟️ Predictions

| Method | Route          | Description                 |
| ------ | -------------- | --------------------------- |
| POST   | `/api/predict` | Get chess prediction via ML |

---

## 🛠️ How to Run Locally

```bash
# Step 1: Navigate to server directory
cd server

# Step 2: Install dependencies
npm install

# Step 3: Create .env file
cp .env.example .env
```

### Example `.env`

```env
APP_PORT=3000
APP_HOST=localhost
APP_SECRET_KEY=your_secret_key_here
APP_DATABASE_URL=your_database_url_here
DEBUG=server:*
```

```bash
# Step 4: Start development server
npm run dev
```

> Server runs at: `http://localhost:3000`

---

## 🧪 API Preview

#### 🔐 Auth Example

```json
# POST /api/auth/login
{
  "email": "hanzla@example.com",
  "password": "secure123"
}
```

---

## 📂 Project Structure

```
server/
├── controllers/     # Logic for users, auth, predictions
├── routes/          # Auth/user/prediction routers
├── models/          # Mongoose schemas
├── middleware/      # JWT auth middleware
├── db.js            # MongoDB connection
├── app.js           # Express app entry point
├── .env.example
└── README.md
```

---

## 🔒 Notes

- JWT is required in `Authorization` header for protected routes.
- Connects to ML microservice using `axios`.
- Ensure ML service is up and running before using `/api/predict`.

---

## 📬 Contact

**Muhammad Hanzla**
📧 [sayhi.hanzla@gmail.com](mailto:sayhi.hanzla@gmail.com)
🌐 [github.com/hanzala-h](https://github.com/hanzala-h)
