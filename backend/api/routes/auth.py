import bcrypt
from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from api.services.auth_service import register_user
from api.services.auth_service import get_user_by_email, get_user_by_id

from api.extensions import cache

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
@cache.cached(timeout=50)
def register_user_view():
    body = request.get_json()
    data = register_user(body)
    
    return jsonify(data)

@auth_bp.route('/login', methods=['POST'])
# @cache.cached(timeout=50)
def login_user_view():
    body = request.get_json()
    
    user = get_user_by_email(body["email"])
    
    if not user:
        return jsonify({"status": "error"}), 401
    
    if not bcrypt.checkpw(
        body["password"].encode(),
        user["password"].encode()
    ):
        return jsonify({"status": "error"}), 401
    
    token = create_access_token(
        identity=str(user["id"])
    )
    
    return jsonify({
        "status": "success",
        "token": token
    })

@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def me():
    user_id = int(get_jwt_identity())
    
    user = get_user_by_id(user_id)
    
    
    

@auth_bp.route('/private', methods=['GET'])
@jwt_required()
@cache.cached(timeout=0)
def private():
    user_id = int(get_jwt_identity())
    return jsonify({"user_id": user_id})
    