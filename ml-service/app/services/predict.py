import pandas as pd
from app.utils.extras import load_model, load_encoder, get_y_map

model_path = "random_forest_clf_v1.pkl"
termination_encoder_path = "termination_encoder.pkl"
eco_opening_encoder_path = "eco_opening_encoder.pkl"
title_encoder_path = "title_encoder.pkl"


def predict(data):
    model = load_model(model_path)
    termination_encoder = load_encoder(termination_encoder_path)
    eco_opening_encoder = load_encoder(eco_opening_encoder_path)
    title_encoder = load_encoder(title_encoder_path)

    df = pd.DataFrame([data])

    df["termination"] = termination_encoder.transform(df["termination"])
    df[["eco", "opening"]] = eco_opening_encoder.transform(df[["eco", "opening"]])
    df[["white_title", "black_title"]] = title_encoder.transform(
        df[["white_title", "black_title"]]
    )

    df = df[model.feature_names_in_]
    prediction = model.predict(df)
    prediction_proba = model.predict_proba(df)
    return {
        "prediction": get_y_map(prediction[0]),
        "prediction_proba": {
            get_y_map(cls): float(prob)
            for cls, prob in zip(model.classes_, prediction_proba[0])
        },
    }


if __name__ == "__main__":
    # Example usage
    example_data = {
        "white_elo": 1500,
        "black_elo": 1500,
        "white_title": "GM",
        "black_title": "IM",
        "eco": "C20",
        "opening": "King's Pawn Game",
        "white_material": 10,
        "black_material": 10,
        "material_balance": 0,
        "num_moves": 30,
        "num_captures": 5,
        "num_checks": 3,
        "castling_white": 1,
        "castling_black": 0,
        "termination": "Normal",
        "eval_score": 100,
    }
    result = predict(example_data)
    print(result)
