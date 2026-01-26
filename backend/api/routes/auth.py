from flask import Blueprint, jsonify, request

from api.services.auth_service import register_user

from api.extensions import cache

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
@cache.cached(timeout=50)
def register_user_view():
    body = request.get_json()
    data = register_user(body)
    
    return jsonify(data), 200