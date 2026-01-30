import os
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from api.extensions import cache
from api.routes.stocks import stocks_bp
from api.routes.news import news_bp
from api.routes.auth import auth_bp
from api.routes.funds import funds_bp

config = {
    "DEBUG": True,
    "CACHE_TYPE": "SimpleCache",
    "CACHE_DEFAULT_TIMEOUT": 300,
    "JWT_SECRET_KEY": os.getenv("JWT_SECRET_KEY")
}

app = Flask(__name__)
app.config.from_mapping(config)
cache.init_app(app)
jwt = JWTManager(app)

CORS(app)

app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(stocks_bp, url_prefix='/stocks')
app.register_blueprint(funds_bp, url_prefix='/funds')
app.register_blueprint(news_bp, url_prefix='/news')

if __name__ == '__main__':
    app.run()