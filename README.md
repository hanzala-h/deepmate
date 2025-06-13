# ♟️ DeepMate – AI-Powered Chess Companion _(In Progress)_

[![ML Service Status](https://github.com/hanzala-h/deepmate/actions/workflows/python-app.yml/badge.svg)](https://github.com/hanzala-h/deepmate/actions/workflows/python-app.yml)
[![Backend Status](https://github.com/hanzala-h/deepmate/actions/workflows/express-server.yml/badge.svg)](https://github.com/hanzala-h/deepmate/actions/workflows/express-server.yml)
[![Last Commit](https://img.shields.io/github/last-commit/hanzala-h/deepmate?color=blue)](https://github.com/hanzala-h/deepmate/commits/main)
[![Repo Size](https://img.shields.io/github/repo-size/hanzala-h/deepmate)](https://github.com/hanzala-h/deepmate)
[![License](https://img.shields.io/github/license/hanzala-h/deepmate)](https://github.com/hanzala-h/deepmate/blob/main/LICENSE)
[![Issues](https://img.shields.io/github/issues/hanzala-h/deepmate)](https://github.com/hanzala-h/deepmate/issues)

---

**DeepMate** is a full-stack AI-powered chess companion that delivers **real-time win probability predictions** using machine learning. Designed for learners and competitors, it combines chess intelligence with a modern tech stack.

> 🚀 **Current Progress**  
> ✅ ML Microservice – ✅ Backend (Auth, User, Prediction APIs) – ⏳ Frontend in progress

---

## 🖼️ Demo (Coming Soon)

> A visual preview will be added once the frontend is functional.

<img src="assets/demo.png" alt="DeepMate UI Preview" width="100%" />

---

## 🧠 Features

- 💡 Real-time **win/draw/loss predictions**
- 🧠 ML-powered chess insights
- 🎮 PvP Chessboard with legal move validation (coming soon)
- 📂 PGN upload-based prediction
- 📈 Post-game summary & analysis _(planned)_
- 🔐 User authentication with JWT
- 🗂️ Modular REST APIs (Users, Auth, Predictions)

---

## 🏗️ Tech Stack

| Layer        | Technology               |
| ------------ | ------------------------ |
| Frontend     | React + TailwindCSS      |
| Backend      | Node.js + Express        |
| Database     | MongoDB                  |
| ML Service   | FastAPI + scikit-learn   |
| Chess Engine | Stockfish + python-chess |

---

## 📁 Project Structure

```

deepmate/
├── client/ # React frontend (in progress)
├── server/ # Node.js backend with Auth, Users, Predictions
├── ml-service/ # FastAPI ML microservice
├── .gitignore
├── LICENSE
└── README.md

```

---

## ⚙️ Getting Started

### 🔧 Prerequisites

- Node.js & npm
- Python 3.12.6+
- MongoDB (local or Atlas)
- (Optional) Stockfish binary

---

### 🛠️ Installation

1. **Clone the repository**

```bash
git clone https://github.com/hanzala-h/deepmate.git
cd deepmate
```

2. **Start ML Microservice**

```bash
cd ml-service
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

3. **Start Backend Server**

```bash
cd ../server
npm install
npm run dev
```

4. **Start Frontend App**

```bash
cd ../client
npm install
npm run dev
```

Then open: [http://localhost:3000](http://localhost:3000)

---

## 📡 API Overview

### 🔹 ML Microservice — `POST /v1/predict`

- Accepts chess game input (e.g., FEN, PGN)
- Returns `win/draw/loss` probabilities
- See [`ml-service/README.md`](ml-service/README.md)

---

### 🔹 Backend API — `/api`

| Route                     | Description             |
| ------------------------- | ----------------------- |
| `POST /auth/register`     | Register a new user     |
| `POST /auth/login`        | User login (JWT)        |
| `GET /users/`             | Fetch all users         |
| `PUT /users/:id`          | Update user (auth)      |
| `DELETE /users/:id`       | Delete user (auth)      |
| `GET /predictions/`       | List all predictions    |
| `POST /predictions/`      | Create a new prediction |
| `PUT /predictions/:id`    | Update prediction       |
| `DELETE /predictions/:id` | Delete prediction       |

---

## 🛣️ Roadmap

| Feature                       | Status      |
| ----------------------------- | ----------- |
| ✅ ML Prediction Microservice | Done        |
| ✅ Auth Module                | Done        |
| ✅ User Module                | Done        |
| ✅ Prediction Module          | Done        |
| ⏳ PvP Chess UI               | In Progress |
| ⏳ PGN Upload Prediction      | In Progress |
| ❌ Real-time Move Prediction  | Planned     |
| ❌ Post-game Analysis         | Planned     |
| ❌ Tournaments & Chat         | Planned     |

---

## 🤝 Contributing

Pull requests are welcome!

1. Fork the repo
2. Create a new feature branch
3. Submit your PR ✅

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 🌐 Connect

[![GitHub](https://img.shields.io/badge/GitHub-hanzala--h-181717?logo=github)](https://github.com/hanzala-h)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-hanzala--h-0077B5?logo=linkedin)](https://www.linkedin.com/in/hanzala-h/)
[![Email](https://img.shields.io/badge/Email-sayhi.hanzla@gmail.com-D14836?logo=gmail)](mailto:sayhi.hanzla@gmail.com)

---

## 🙏 Acknowledgements

- [Stockfish Chess Engine](https://stockfishchess.org/)
- [python-chess](https://python-chess.readthedocs.io/en/latest/)

---

## 📚 References

- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [scikit-learn Docs](https://scikit-learn.org/)
- [React Docs](https://reactjs.org/)
- [TailwindCSS Docs](https://tailwindcss.com/)
- [Express Docs](https://expressjs.com/)

---

## 📝 Notes

- Backend now includes **auth**, **user**, and **prediction** modules.
- Frontend development will begin next using Figma-based designs.
- Bugs or ideas? [Open an issue](https://github.com/hanzala-h/deepmate/issues).
