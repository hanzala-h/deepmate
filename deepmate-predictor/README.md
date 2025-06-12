# ♟️ DeepMate Predictor — Chess Win Probability Model

Welcome to the official machine learning model of **DeepMate**, a real-time chess win prediction platform. This model is trained to predict the win probability of a player based on game data, move history, and board evaluation.

## 🔍 About

DeepMate is an AI-powered chess web app that helps players assess their winning chances live during a game. This model is the prediction engine that powers DeepMate’s backend ML service.

It can be used for:

- Real-time win probability prediction
- Post-game analysis
- Integrating ML insights into chess apps

## 🧠 Model Details

- **Framework**: Scikit-learn
- **Input features**: Board evaluation, turn, phase, piece counts, etc.
- **Output**: Win probability (float between 0 and 1)

## 🚀 Usage

To use this model in your Python project:

```python
from huggingface_hub import hf_hub_download
import joblib

# Download model from the Hugging Face hub
model_path = hf_hub_download(repo_id="hanzalaaa/deepmate-predictor", filename="model.pkl")

# Load the model
model = joblib.load(model_path)

sample_input = [[2300, 2200, "CM", "N/A", "C20", "King's Pawn Game", 39, 38, 1, 35, 5, 2, 1, 0, "Normal", 0.65]]

prediction = model.predict_proba(sample_input)
print("Win probability:", prediction[0][1])
```

You can integrate this into any backend service including **FastAPI**, Flask, or Django.

## 🌐 Used In

This model is used in the **[DeepMate](https://github.com/hanzala-h/deepmate)** project:

> A MERN + ML powered live chess platform with real-time win prediction.

## 🛠️ API Example

The model is served via FastAPI in the `/v1/predict` endpoint:

```http
POST /v1/predict
Content-Type: application/json

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

Returns:

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

## 📂 Files

- `model.pkl` — Trained model file (scikit-learn)
- `eco_opening_encoder.pkl` — Encoding for ECO openings
- `title_encoder.pkl` — Encoding for player titles
- `termination_encoder.pkl` — Encoding for game termination types
- `README.md` — You're reading it!

## 🧪 Example Use Case

This model can help chess platforms:

- Predict game outcomes
- Enhance player experience with real-time AI

## 🙌 Contributing

Got a better model? Want to improve accuracy? Fork the repo and create a PR or open an issue.

## 📄 License

MIT License. Feel free to use it in your projects.

## 📣 Citation

If you use this model or Deep Mate in research, please cite:

```
@software{hanzla_deepmate_2025,
  author = {Muhammad Hanzla},
  title = {Deep Mate: Real-time Chess Win Probability Predictor},
  year = 2025,
  url = {https://huggingface.co/hanzalaaa/deepmate-predictor}
}
```
