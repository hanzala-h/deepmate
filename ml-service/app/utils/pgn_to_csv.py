import os
import glob
import chess.engine
import chess.pgn
import pandas as pd
from extract_features import extract_features


def process_games(pgn_path, max_games=None):
    features = []

    engine = chess.engine.SimpleEngine.popen_uci(r"E:\stockfish\stockfish.exe")
    print("Stockfish engine started.")

    with open(pgn_path, encoding="utf-8") as pgn:
        game_count = 0
        while True:
            if max_games is not None and game_count >= max_games:
                break

            game = chess.pgn.read_game(pgn)
            if game is None:
                break

            if game_count == 2:
                debug = True
            else:
                debug = False

            features.append(extract_features(game, engine=engine, debug=debug))
            game_count += 1

            if game_count % 10000 == 0:
                df = pd.DataFrame(features)
                df.to_csv(
                    f"../data/raw/chess_features_{game_count//10000}.csv", index=False
                )
                features = []
                print(f"{game_count} games processed.")

    engine.quit()
    print("Stockfish engine stopped.")


def concat_csvs(path, to_csv="chess_features_combined.csv"):
    all_files = glob.glob(os.path.join(path, "chess_features_*.csv"))
    df_list = [pd.read_csv(f) for f in all_files]
    combined_df = pd.concat(df_list, ignore_index=True)
    combined_df.to_csv(to_csv, index=False)


def main():
    process_games("../data/raw/games.pgn", max_games=100000)
    concat_csvs("../data/raw", to_csv="../data/processed/games.csv")


if __name__ == "__main__":
    main()
