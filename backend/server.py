from flask import Flask
from app.routes import register_routes
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Register routes from routes.py
register_routes(app)

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')

