from flask import Flask, request, jsonify
from models.ops import get_all_users, update_user, create_user, get_user_by_email, get_all_roles, get_all_features, create_feature, create_role, update_role_features, update_feature, delete_role, delete_feature
from flask_cors import CORS
from middleware import RBACMiddleWare
app = Flask(__name__)
CORS(app)
app.wsgi_app = RBACMiddleWare(app.wsgi_app)


@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    if (create_user(data.get('email'), data.get('password'))):
        return jsonify({"message": "User Registered"}), 200
    else:
        return jsonify({"message": "User Email already in use"}), 400


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = get_user_by_email(data.get('email'))
    if (user[0].fields.get('password') == data.get('password')):
        return jsonify({"status": True}), 200
    else:
        return jsonify({"message": "User Email already in use"}), 400


@app.route('/get/users/all', methods=['GET'])
def get_users():
    users = get_all_users()
    if (users):
        return jsonify(users), 200
    else:
        return jsonify({"message": "Users cannot be found."}), 400


@app.route('/update/users/<email>', methods=['PUT'])
def user_update(email):
    data = request.get_json()
    if (update_user(email, data)):
        return jsonify({"message": "User Updated"}), 200
    return jsonify({"message": "User Couldn't be Updated"}), 500


@app.route('/rbac/get/roles', methods=['GET'])
def get_roles():
    return jsonify(get_all_roles())


@app.route('/rbac/create/role', methods=['POST'])
def make_role():
    data = request.get_json()
    if (create_role(data.get('name'))):
        return jsonify({"message": "Role Created"}), 200
    return jsonify({"message": "Role Couldn't Be Created"}), 500


@app.route('/rbac/delete/role/<id>', methods=['DELETE'])
def d_role(id):
    if (delete_role(id)):
        return jsonify({"message": "Role Deleted"}), 200
    return jsonify({"message": "Role Couldn't Be Deleted"}), 500


@app.route('/rbac/get/features', methods=['GET'])
def get_features():
    return jsonify(get_all_features())


@app.route('/rbac/create/feature', methods=['POST'])
def make_feature():
    data = request.get_json()
    if (create_feature(data.get('name'), data.get('description'))):
        return jsonify({"message": "Feature Created"}), 200
    return jsonify({"message": "Feature Couldn't Be Created"}), 500


@app.route('/rbac/delete/feature/<id>', methods=['DELETE'])
def d_feature(id):
    if (delete_feature(id)):
        return jsonify({"message": "Feature Deleted"}), 200
    return jsonify({"message": "Feature Couldn't Be Deleted"}), 500


@app.route('/rbac/update/role/features', methods=['POST'])
def add_feature():
    data = request.get_json()
    if (update_role_features(data.get("id"), data.get('features'))):
        return jsonify({"message": "Features for the Role Updated"}), 200
    return jsonify({"message": "Features for the Role Couldn't be Updated"}), 500


@app.route('/rbac/update/features/<id>', methods=['PUT'])
def edit_feature(id):
    data = request.get_json()
    if (update_feature(id, data)):
        return jsonify({"message": "Feature Updated"}), 200
    return jsonify({"message": "Feature Couldn't be Updated"}), 500


if __name__ == '__main__':
    app.run(debug=True)
