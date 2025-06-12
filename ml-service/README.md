# ♟️ DeepMate – ML Service

This is the **Machine Learning microservice** for the **DeepMate** project – a real-time chess assistant. This service provides win probability predictions based on input features from a chess position or game state.

---

## 🚀 Features

- Exposes a single endpoint: `POST /v1/predict`.
- Accepts game state features as input in JSON format.
- Returns predicted outcome along with class probabilities (white win, draw, black win).
- Built with `scikit-learn` and served using `FastAPI`.

---

## 📦 Tech Stack

- **Python 3.12+**
- **FastAPI** – for building the API.
- **scikit-learn** – for the machine learning model.
- **Uvicorn** – for running the application.

---

## 🧠 Model Description

The model is trained on real chess game data and uses features such as player ratings, material balance, and evaluation scores to predict the outcome of a game.

It returns:

- `prediction`: the predicted winner (white, draw, black).
- `prediction_proba`: probabilities for each class (white, draw, black)

---

## 📨 API Endpoint

### `POST /v1/predict`

#### ✅ Request Body (JSON)

The input should include game features as shown below:

```json
{
  "white_elo": 2300,
  "black_elo": 2200,
  "white_title": "CM",
  "black_title": "N/A",
  "eco": "C20",
  "opening": "King's Pawn Game",
  "white_material": 39,
  "black_material": 38,
  "material_balance": 1,
  "num_moves": 35,
  "num_captures": 5,
  "num_checks": 2,
  "castling_white": 1,
  "castling_black": 0,
  "termination": "Normal",
  "eval_score": 0.65
}
```

#### 📤 Response (JSON)

```json
{
  "prediction": "white",
  "prediction_proba": {
    "black": 0.31,
    "draw": 0.32,
    "white": 0.37
  }
}
```

---

## 🛠️ How to Run Locally

```bash
# Step 1: Create virtual environment
python -m venv venv
source venv/bin/activate      # On Windows: venv\Scripts\activate

# Step 2: Install dependencies
pip install -r requirements.txt

# Step 3: Download the model
mkdir -p app/models
curl -o app/models/model.pkl <url> # will be added later

# Step 4: Copy .env.example to .env
cp .env.example .env

# Step 5: Run the FastAPI app
uvicorn app.main:app --reload
```

---

## 🔒 Notes

- This is a **backend-only microservice** — no UI is included.
- Make sure the input data matches the expected schema shown above.
- Titles, ECO codes, and openings are string-based categorical features and must be consistent with the trained model.

---

## 📬 Contact

For questions, suggestions, or contributions, contact:
**Muhammad Hanzla** – [sayhi.hanzla@gmail.com](mailto:sayhi.hanzla@gmail.com)
