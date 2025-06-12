from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from contextlib import asynccontextmanager
from dotenv import dotenv_values
from app.services.predict import predict

config = dotenv_values(".env")
APP_URL = config.get("APP_URL", "http://localhost:8000")


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Starting up the DeepMate ML Service...")
    print("Listening on", APP_URL)
    yield
    print("Shutting down the DeepMate ML Service...")


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PredictionInput(BaseModel):
    white_elo: int
    black_elo: int
    white_title: str | int
    black_title: str | int
    eco: str | int
    opening: str | int
    white_material: int
    black_material: int
    material_balance: int
    num_moves: int
    num_captures: int
    num_checks: int
    castling_white: int
    castling_black: int
    termination: str | int
    eval_score: int | float


@app.get("/")
def read_root():
    return {
        "message": "Welcome to the DeepMate ML Service! Use the /v1/predict endpoint to get predictions. Made with ❤️ by Muhammad Hanzla."
    }


@app.post("/v1/predict")
def predict_endpoint(data: PredictionInput):
    data = data.model_dump()
    return predict(data)
