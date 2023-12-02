from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import logging
from collections import Counter
from PIL import Image
import base64
from io import BytesIO
import requests

# Importing deps for image prediction
from tensorflow.keras.preprocessing import image
from PIL import Image
import numpy as np
from tensorflow.keras.models import load_model
from fastai.vision.all import *

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
CORS(app, resources=r'/api/*', headers='Content-Type')


@app.route('/api/data', methods=['GET'])
def get_data():
    data = {'message': 'Hello from Flask!!!!'}
    return jsonify(data)


@app.route('/api/test', methods=['POST'])
def api():
    # Get the data from the POST request
    data = request.json

    # Process the data (you can perform any server-side logic here)

    # Respond with a JSON object
    response = {'status': 'success', 'data': data}
    return jsonify(response)


@app.route('/api/quiz', methods=['POST'])
def quiz_result():
    # Assuming the request data is in JSON format
    data = request.get_json()

    # Access the answers from the JSON data
    answers = data.get('answers', {})

    # Process the answers as needed (e.g., save them to a database)
    # In this example, we'll just print them
    print("Received answers:", answers)

    answers = list(answers.values())
    answer_counter = Counter(answers)
    max_count = max(answer_counter.values())
    most_common_options = [
        key for key, count in answer_counter.items() if count == max_count]

    # You can send a response back to the client if needed
    response_data = {'message': most_common_options}
    return jsonify(response_data), 200


@app.route('/api/upload', methods=['POST'])
def upload():
    file = request.files['file']
    file.save('uploads/' + file.filename)

    # Load the image to predict
    img_path = f"./uploads/{file.filename}"
    img = image.load_img(img_path, target_size=(150, 150))
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    x /= 255

    # loaded_model = load_model('./model/export.pkl')

    learn = load_learner('./model/export.pkl', cpu=False)

    # # Make the prediction
    prediction = learn.predict(img_path)
    print("prediction: ", prediction[0])
    if os.path.exists(f"./uploads/{file.filename}"):
        os.remove(f"uploads/{file.filename}")

    return jsonify({"message": prediction[0]})


if __name__ == '__main__':
    app.run(host='localhost', port=9874, debug=True)
