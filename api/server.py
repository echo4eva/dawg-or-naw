from flask import Flask, jsonify, request
from flask_cors import CORS
from gradio_client import Client
import os

client = Client("https://echo4eva-minimal.hf.space/--replicas/prg82/")

app = Flask(__name__)
CORS(app)

@app.route("/api/testget", methods=["GET"])
def hello_worldge():
    return jsonify({
        "message": "hello world"
    })

@app.route("/api/testpost", methods=["POST"])
def hello_postge():
    if request.method=="POST":
        content = request.json
        return jsonify ({
            "output": "hello"
        })
    
@app.route("/api/gradiotest", methods=["POST"])
def input_image_test():
    if request.method=="POST":
        result = client.predict(
            "https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png",	# filepath  in 'img' Image component
            api_name="/predict"
        )

        return result
    
@app.route("/api/gradio", methods=["POST"])
def input_image():
    if request.method=="POST":
        image = request.files["file"]
        image.save("public/file.jpg")

        result = client.predict(
            "public/file.jpg",	# filepath  in 'img' Image component
            api_name="/predict"
        )

        os.remove("public/file.jpg")

        return result

if __name__ == "__main__":
    app.run()