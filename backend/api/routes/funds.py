from flask import Blueprint, jsonify

from api.services.funds_service import get_all_funds
from api.services.funds_service import get_fund_detail

from api.extensions import cache

funds_bp = Blueprint('funds', __name__)

@funds_bp.route('/quote/all', methods=['GET'])
@cache.cached(timeout=50)
def list_all_funds():
    data = get_all_funds()
    
    return jsonify(data)

@funds_bp.route('/quote/<ticker>', methods=['GET'])
@cache.cached(timeout=50)
def get_fund_detail_view(ticker: str):
    data = get_fund_detail(ticker)
    return jsonify(data)