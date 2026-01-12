from flask import Flask
from api.routes.stocks import stocks_bp

app = Flask(__name__)

app.register_blueprint(stocks_bp, url_prefix='/api')

if __name__ == '__main__':
    app.run(debug=True)