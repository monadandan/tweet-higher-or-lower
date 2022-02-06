from flask import Flask, send_from_directory

def create_app():
    app = Flask(__name__, static_url_path="", static_folder='frontend/build')

    @app.route("/")
    def serve_index():
        return send_from_directory(str(app.static_folder), 'index.html')

    from api.BackendApiHandler import backendApi
    app.register_blueprint(backendApi)

    return app
