from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import os
import logging
from collections import Counter
from PIL import Image
import base64
from io import BytesIO
from fastai.vision.all import *
import fastai


app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
CORS(app, resources=r'/api/*', headers='Content-Type')


@app.route('/api', methods=['GET'])
def get_data():
    data = {'message': 'Hello from Flask!'}
    return jsonify(data)


@app.route('/api/test', methods=['POST'])
def api():
    data = request.json
    response = {'status': 'success', 'data': data}
    return jsonify(response)


@app.route('/api/quiz', methods=['POST'])
def quiz_result():
    data = request.get_json()
    answers = data.get('answers', {})
    print("Received answers:", answers)

    answers = list(answers.values())
    answer_counter = Counter(answers)
    max_count = max(answer_counter.values())
    most_common_options = [
        key for key, count in answer_counter.items() if count == max_count]

    response_data = {'message': most_common_options}
    return jsonify(response_data), 200


@app.route('/api/upload', methods=['POST'])
def upload():
    file = request.files['file']
    print("file here", file)
    file.save('uploads/' + file.filename)

    # Load the image to predict
    img_path = f"./uploads/{file.filename}"

    learn = load_learner('./model/export.pkl', cpu=False)

    prediction = learn.predict(img_path)
    print("prediction: ", prediction[0])
    if os.path.exists(f"./uploads/{file.filename}"):
        os.remove(f"uploads/{file.filename}")

    return jsonify({"message": prediction[0]})


if __name__ == '__main__':
    app.run(debug=True)
    # app.run(host='localhost', port=9874, debug=True)
