from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import utils

app = Flask(__name__)
CORS(app)

# Exemple
# @app.route("/login", methods=["POST"])
# def login():
#     json = request.get_json()
#     try:
#         user = utils.parse_json(json)
#     except ValueError:
#         return jsonify("Bad request"), 400
#     try:
#         user = utils.verify_login(user)
#         token = utils.generate_token(user)
#     except ValueError:
#         return jsonify("Invalid password"), 401
#     except KeyError:
#         return jsonify("User not found"), 404
#     return make_response(jsonify({"token":token}), 200)

@app.route("/solve", methods=["POST"])
def solve():
    """
    APPROX 
    Expects a json with the following structure:
    {
        "postalCode1" : "string",
        "postalCode2" : "string",
        "exoneration1" : int, (%)
        "exoneration2" : int, (%)
        "reduction1" : int,
        "reduction2" : int,
        "activity" : "string", 
    } sends back a json with the following structure:
    {
        "optExoneration1" : int, (%)
        "optExoneration2" : int, (%)
        "optReduction1" : int,
        "optReduction2" : int,
        "moving1to2" : int,
        "moving2to1" : int,
    }
    """
    # TODO
    json = request.get_json()
    try:
        problem = utils.parse_json(json)
    except ValueError:
        return jsonify("Bad request"), 400
    try:
        solution = utils.solve(problem)
    except ValueError:
        return jsonify("Invalid problem"), 400
    return make_response(jsonify(solution), 200)

@app.route("/evaluate", methods=["POST"])
def evaluate():
    # TODO
    json = request.get_json()
    try:
        problem = utils.parse_json(json)
    except ValueError:
        return jsonify("Bad request"), 400
    try:
        evaluation = utils.evaluate(problem)
    except ValueError:
        return jsonify("Invalid problem"), 400
    return make_response(jsonify(evaluation), 200)

@app.route("/pareto", methods=["POST"])
def pareto():
    # TODO
    json = request.get_json()
    try:
        problem = utils.parse_json(json)
    except ValueError:
        return jsonify("Bad request"), 400
    try:
        pareto = utils.pareto(problem)
    except ValueError:
        return jsonify("Invalid problem"), 400
    return make_response(jsonify(pareto), 200)



if __name__ == "__main__":
    app.run(host="localhost", port=4444, debug=True)