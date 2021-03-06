from flask import Flask

# from flask.helpers import get_root_path

# from flaskapp.config import BaseConfig

# from flask_wtf.csrf import CSRFProtect

# csrf = CSRFProtect()
from flask_cors import CORS

def start_flask_server():
    server = Flask(__name__)
    CORS(server)
    # csrf.init_app(server)

    from flaskapp.main.routes import main

    # server.config.from_object(BaseConfig)
    server.register_blueprint(main)

    return server
