# ♟️ DeepMate – AI-Powered Chess Companion _(In Progress)_

[![Build Status](https://github.com/hanzala-h/deepmate/actions/workflows/python-app.yml/badge.svg)](https://github.com/hanzala-h/deepmate/actions)
[![Last Commit](https://img.shields.io/github/last-commit/hanzala-h/deepmate?color=blue)](https://github.com/hanzala-h/deepmate/commits/main)
[![Repo Size](https://img.shields.io/github/repo-size/hanzala-h/deepmate)](https://github.com/hanzala-h/deepmate)
[![License](https://img.shields.io/github/license/hanzala-h/deepmate)](https://github.com/hanzala-h/deepmate/blob/main/LICENSE)
[![Issues](https://img.shields.io/github/issues/hanzala-h/deepmate)](https://github.com/hanzala-h/deepmate/issues)

---

**DeepMate** is a full-stack AI-powered chess companion that delivers **real-time win probability predictions** using machine learning. Designed for learners and competitors, it combines chess intelligence with a modern tech stack.

> 🚧 **Project Status:**  
> ✅ ML Microservice — ⏳ Frontend/Backend in Progress

---

## 🖼️ Demo (Coming Soon)

> A visual preview will be added once the frontend is functional.

<img src="assets/demo.png" alt="DeepMate UI Preview" width="100%" />

---

## 🧠 Features

- 💡 Real-time **win/draw/loss predictions**
- 🎮 Interactive PvP chessboard with legal move logic
- 📂 PGN-based **pre-game prediction**
- 📈 Post-game summary and analysis _(planned)_
- ⚡ FastAPI microservice + MERN stack integration

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
├── client/ # React frontend
├── server/ # Express backend
├── ml-service/ # FastAPI ML microservice
├── .gitignore
├── LICENSE
└── README.md

````

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
````

2. **Start ML Microservice**

```bash
cd ml-service
python -m venv venv
source venv/bin/activate  # For Windows: venv\Scripts\activate
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

Visit: [http://localhost:3000](http://localhost:3000)

---

## 📡 API Overview

### 🔹 ML Microservice — `POST /v1/predict`

- Accepts a JSON payload representing a chess game state
- Returns predicted probabilities for win/draw/loss

➡️ See [`ml-service/README.md`](ml-service/README.md) for full documentation.

### 🔹 Backend API — `/api/chess`

- In development

---

## 🛣️ Roadmap

| Feature                    | Status         |
| -------------------------- | -------------- |
| ML Prediction Microservice | ✅ Done        |
| PvP Chess UI               | ⏳ In Progress |
| PGN Upload Prediction      | ⏳ In Progress |
| Real-time Move Prediction  | ⏳ Planned     |
| Post-game Review & Graphs  | ❌ Planned     |
| Auth, Chat, Tournaments    | ❌ Planned     |

---

## 🤝 Contributing

Pull requests are welcome!
To contribute:

1. Fork the repo
2. Create a new branch
3. Submit a PR 🎉

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

- The ML microservice is production-ready and independently testable.
- Frontend and backend development are active and evolving.
- For bugs or feature suggestions, [open an issue](https://github.com/hanzala-h/deepmate/issues).

