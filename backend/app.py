from flask import Flask
from models import setup_database
import routes
from flask_cors import CORS



app = Flask(__name__)
CORS(app)


app.register_blueprint(routes.app)


@app.route('/')
def home():
    return "Library management system is running"

if __name__ == "__main__":
    setup_database()
    app.run(debug=True)