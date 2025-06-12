import os
import joblib


def load_any(file_path, prefix="models"):
    base_dir = os.path.dirname(os.path.dirname(__file__))
    path = os.path.join(base_dir, prefix, file_path)
    return joblib.load(path)


def load_model(model_path):
    return load_any(model_path)


def load_encoder(encoder_path):
    return load_any(encoder_path)


def get_y_map(cls):
    y_map = {
        0: "draw",
        1: "white",
        -1: "black",
    }
    return y_map.get(cls, "draw")
