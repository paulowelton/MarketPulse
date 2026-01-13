from flask import Blueprint, jsonify
from api.services.stocks_service import list_stocks
from api.services.stocks_service import stock_details
from api.services.stocks_service import list_segments

from api.extensions import cache

stocks_bp = Blueprint('stocks', __name__)

@stocks_bp.route('/quote/all', methods=['GET'])
@cache.cached(timeout=50)
def get_stocks():
    data = list_stocks()
    return jsonify(data)

@stocks_bp.route('/quote/<ticker>', methods=['GET'])
@cache.cached(timeout=50)
def get_stock_details(ticker: str):
    data = stock_details(ticker)
    return jsonify(data)

@stocks_bp.route('/segments/all', methods=['GET'])
@cache.cached(timeout=50)
def get_segments():
    data = list_segments()
    return jsonify(data)
