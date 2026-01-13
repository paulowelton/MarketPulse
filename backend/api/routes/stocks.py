from flask import Blueprint, jsonify
from api.services.stocks_service import list_stocks
from api.services.stocks_service import stock_details
from api.services.stocks_service import list_segments

stocks_bp = Blueprint('stocks', __name__)

@stocks_bp.route('/stocks/quote/all', methods=['GET'])
def get_stocks():
    data = list_stocks()
    return jsonify(data)

@stocks_bp.route('/stocks/quote/<ticker>', methods=['GET'])
def get_stock_details(ticker: str):
    data = stock_details(ticker)
    return jsonify(data)

@stocks_bp.route('/stocks/segments/all', methods=['GET'])
def get_segments():
    data = list_segments()
    return jsonify(data)
