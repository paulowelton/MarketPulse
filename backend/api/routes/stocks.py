from flask import Blueprint, jsonify
from api.services.stocks_service import list_stocks

stocks_bp = Blueprint('stocks', __name__)

@stocks_bp.route('/stocks/quote/all', methods=['GET'])
def get_stocks():
    data = list_stocks()
    return jsonify(data)

