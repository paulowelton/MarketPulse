from flask import Flask
from api.extensions import cache
from api.routes.stocks import stocks_bp

config = {
    "DEBUG": True,
    "CACHE_TYPE": "SimpleCache",
    "CACHE_DEFAULT_TIMEOUT": 300
}
app = Flask(__name__)
app.config.from_mapping(config)
cache.init_app(app)

app.register_blueprint(stocks_bp, url_prefix='/stocks')

if __name__ == '__main__':
    app.run()