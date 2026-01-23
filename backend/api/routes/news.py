from flask import Blueprint, jsonify

from api.services.news_service import list_everthing_news

from api.extensions import cache

news_bp = Blueprint('news', __name__)

@news_bp.route('/<subject>', methods=['GET'])
@cache.cached(timeout=50)
def list_news(subject: str):
    data = list_everthing_news(subject)
    return jsonify(data)