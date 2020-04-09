from flaskapp import start_flask_server

flask_server = start_flask_server()

if __name__ == "__main__":
    flask_server.run(debug=True)
