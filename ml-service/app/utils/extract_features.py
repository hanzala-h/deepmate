import chess.pgn
import chess.engine
import hashlib
from numpy import nan


PIECE_VALUES = {
    chess.PAWN: 1,
    chess.KNIGHT: 3,
    chess.BISHOP: 3,
    chess.ROOK: 5,
    chess.QUEEN: 9,
    chess.KING: 0,
}


def get_material_count(board, color):
    material = 0
    for piece_type in PIECE_VALUES:
        material += len(board.pieces(piece_type, color)) * PIECE_VALUES[piece_type]
    return material


def extract_features(game, engine=None, debug=False):
    header = game.headers

    # Game metadata
    event = header.get("Event", "Unknown")
    site = header.get("Site", "Unknown")
    date = header.get("Date", "Unknown")
    white_player = header.get("White", "Unknown")
    black_player = header.get("Black", "Unknown")
    game_metadata = f"{event}_{site}_{date}_{white_player}_{black_player}"
    game_id = int(hashlib.sha256(game_metadata.encode()).hexdigest(), 16) % (10**8)

    # Pre-game features
    white_elo = header.get("WhiteElo", nan)
    black_elo = header.get("BlackElo", nan)
    result = header.get("Result", "1/2-1/2")
    opening = header.get("Opening", "Unknown")
    eco = header.get("ECO", "Unknown")
    termination = header.get("Termination", "Normal")
    rated = header.get("Rated", "True") == "True"
    white_title = header.get("WhiteTitle", "N/A")
    black_title = header.get("BlackTitle", "N/A")

    result_map = {"1-0": 1, "0-1": -1, "1/2-1/2": 0, "*": 0}
    result_value = result_map.get(result, 0)

    board = game.board()
    node = game

    num_moves = 0
    num_captures = 0
    num_checks = 0
    num_promotions = 0
    num_en_passant = 0
    castling_white = False
    castling_black = False

    eval_score = None  # Final eval score

    while not node.is_end():
        next_node = node.variation(0)
        if next_node is None:
            break

        move = next_node.move
        san = board.san(move)

        is_capture = board.is_capture(move)
        is_en_passant = board.is_en_passant(move)
        is_promotion = move.promotion is not None

        board.push(move)
        is_check = board.is_check()

        num_moves += 1
        if is_capture:
            num_captures += 1
        if is_check:
            num_checks += 1
        if is_promotion:
            num_promotions += 1
        if is_en_passant:
            num_en_passant += 1

        if move == chess.Move.from_uci("e1g1") or move == chess.Move.from_uci("e1c1"):
            castling_white = True
        if move == chess.Move.from_uci("e8g8") or move == chess.Move.from_uci("e8c8"):
            castling_black = True

        if debug:
            print(
                f"Move {num_moves}: {san} | "
                f"Capture: {is_capture}, Check: {is_check}, "
                f"Promotion: {is_promotion}, En Passant: {is_en_passant}"
            )

        node = next_node

    # Post-game board stats
    white_material = get_material_count(board, chess.WHITE)
    black_material = get_material_count(board, chess.BLACK)
    material_balance = white_material - black_material

    if engine is not None:
        info = engine.analyse(board, chess.engine.Limit(depth=10))
        score = info["score"].white()
        eval_score = score.score(mate_score=10000)

    if debug:
        print("\nFinal Summary:")
        print(f"Total Moves: {num_moves}")
        print(f"Captures: {num_captures}")
        print(f"Checks: {num_checks}")
        print(f"Promotions: {num_promotions}")
        print(f"En Passant Captures: {num_en_passant}")
        print(f"Castling - White: {castling_white}, Black: {castling_black}")

    return {
        "game_id": game_id,
        "white_elo": white_elo,
        "black_elo": black_elo,
        "white_title": white_title,
        "black_title": black_title,
        "rated": rated,
        "opening": opening,
        "eco": eco,
        "white_material": white_material,
        "black_material": black_material,
        "material_balance": material_balance,
        "num_moves": num_moves,
        "num_captures": num_captures,
        "num_checks": num_checks,
        "castling_white": castling_white,
        "castling_black": castling_black,
        "termination": termination,
        "result": result_value,
        "eval_score": eval_score,
    }
