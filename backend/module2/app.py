from flask import Flask, request, jsonify
import json
import os

app = Flask(__name__)

# Endpoint para obter a lista de ingredientes
@app.route('/api/ingredients', methods=['GET'])
def get_ingredients():
    ingredients = load_ingredients()
    return jsonify(ingredients)

# Função para carregar os ingredientes do arquivo JSON
def load_ingredients():
    if os.path.exists('ingredients.json'):
        with open('ingredients.json', 'r') as f:
            return json.load(f)
    return []

if __name__ == '__main__':
    app.run(debug=True)
