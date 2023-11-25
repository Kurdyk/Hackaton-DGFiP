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
    
    solution = {
        "moving1to2" : int,
        "moving2to1" : int,
    }
    """
    problem = request.get_json()
    print(problem)

    DFVille1 = utils.DFVille1
    DFVille2 = utils.DFVille2
    

    # Liste_Activites = utils.Activites_communes(DFVille1,DFVille2)
    Liste_Activites = ['4673A','9602A','5610C','6190Z','4321A','7022Z','6420Z','4399C','86901','4789Z','4520A','4511Z','4799A','7010Z','99990']
    Li1, Li2 = utils.repartition_ent(DFVille1,DFVille2)

    index = -1
    for i in range(len(Liste_Activites)):
        if Liste_Activites[i] == problem['activity']:
            index = i
            break

    if index == -1:
        return jsonify("Invalid activity"), 400

    [b1,b2] = utils.bases_initiales(Liste_Activites, DFVille1, DFVille2)[index]

    b1 = min((b1-problem["reduction1"]) * (1-problem["exoneration1"]), b1-problem["reduction1"])
    b2 = min((b2-problem["reduction2"]) * (1-problem["exoneration2"]), b2-problem["reduction2"])

    t1 = int(DFVille1['TXCNU0'].unique()[0])
    t2 = int(DFVille2['TXCNU0'].unique()[0])
    
    activity = problem['activity']

    #L1,L2 = utils.departs_successifs(activity,Li1,Li2,b1,b2,t1,t2, seuil=0.05, seuil2=0.15, seuil_concu = 0.5)
    red1 = problem["reduction1"]
    red2 = problem["reduction2"]
    exo1 = problem["exoneration1"]
    exo2 = problem["exoneration2"]
    
    L1,L2 = utils.departs_successifs_CA(activity,Li1,Li2,t1,t2, DFVille1,DFVille2,red1,red2,exo1,exo2)

    n1i = utils.nb_ent_type(Li1,activity)
    n2i = utils.nb_ent_type(Li2,activity)

    n1 = utils.nb_ent_type(L1,activity)
    n2 = utils.nb_ent_type(L2,activity)

    solution = {
        "moving1to2" : 0,
        "moving2to1" : 0,
        "finalNb1" : n1,
        "finalNb2" : n2,
    }

    solution["moving1to2"] = max(n1i-n1,0)
    solution["moving2to1"] = max(n2i-n2,0)

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

@app.route("/optimizea", methods=["POST"])
def optimizea():
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
    
    solution = {
        "b1opt" : int,
        "b2opt" : int,
    }
    """
    problem = request.get_json()
    print(problem)
    activity = problem['activity']
    
    DFVille1 = utils.DFVille1
    DFVille2 = utils.DFVille2
    

    # Liste_Activites = utils.Activites_communes(DFVille1,DFVille2)
    Liste_Activites = ['4673A','9602A','5610C','6190Z','4321A','7022Z','6420Z','4399C','86901','4789Z','4520A','4511Z','4799A','7010Z','99990']
    Li1, Li2 = utils.repartition_ent(DFVille1,DFVille2)

    index = -1
    for i in range(len(Liste_Activites)):
        if Liste_Activites[i] == problem['activity']:
            index = i
            break

    if index == -1:
        return jsonify("Invalid activity"), 400

    [b1,b2] = utils.bases_initiales(Liste_Activites, DFVille1, DFVille2)[index]
    
    
    solution = {
        "b1opt" : 0,
        "b2opt" : 0,
    }

    t1 = int(DFVille1['TXCNU0'].unique()[0])
    t2 = int(DFVille2['TXCNU0'].unique()[0])

    b1opt,b2opt = utils.bases_optimales(activity,b1,t1,b2,t2,Li1,Li2,prop = 0.5,eps = 0.15)


    solution["b1opt"] = b1opt
    solution["b2opt"] = b2opt

    return make_response(jsonify(solution), 200)


@app.route("/pareto", methods=["POST"])
def pareto():
    import pareto
    json = request.get_json()
    try:
        problem = utils.parse_json(json)
    except ValueError:
        return jsonify("Bad request"), 400
    try:
        pareto = pareto.find_pareto(problem)
    except ValueError:
        return jsonify("Invalid problem"), 400
    return make_response(jsonify(pareto), 200)


if __name__ == "__main__":
    app.run(host="localhost", port=4444, debug=True)
