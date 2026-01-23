from flask import Flask
from api.extensions import cache
from flask_cors import CORS
from api.routes.stocks import stocks_bp
from api.routes.news import news_bp

config = {
    "DEBUG": True,
    "CACHE_TYPE": "SimpleCache",
    "CACHE_DEFAULT_TIMEOUT": 300
}
app = Flask(__name__)
CORS(app)
app.config.from_mapping(config)
cache.init_app(app)

app.register_blueprint(stocks_bp, url_prefix='/stocks')
app.register_blueprint(news_bp, url_prefix='/news')

if __name__ == '__main__':
    app.run()