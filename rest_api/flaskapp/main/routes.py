from flask import render_template
from flask import request
from flask import Blueprint
from flask import flash
from flask import redirect
from flask import url_for

main = Blueprint("main", __name__)


@main.route("/")
@main.route("/home")
def home():
    return render_template("home.html")
