from flask import render_template
from flask import request
from flask import Blueprint
from flask import flash
from flask import redirect
from flask import url_for

from flask import jsonify

from flaskapp.config import ExampleData

from flaskapp.utils import gmaps_tool as tls

main = Blueprint("main", __name__)


@main.route("/", methods=["GET"])
def home():
    return "<h1>Homepage</h1>"


# A route to return all of the available entries in our catalog.
@main.route("/api/v1/resources/books/all", methods=["GET"])
def api_all():
    return jsonify(ExampleData.data)


@main.route("/api", methods=["GET"])
def api():
    """ Provide parameters as:
    https://www.URL.com/api?location=the-location&name=the-place-name
     """

    if "location" in request.args and "name" in request.args:
        location = str(request.args["location"])
        name = str(request.args["name"])
    else:
        return "Error: Please specify both a location and name."

    result = tls.get_ptimes_data(location, name)

    # Use the jsonify function from Flask to convert our list of
    # Python dictionaries to the JSON format.
    return jsonify(result)
