from flask import Flask, jsonify, request
import json
import os
import random
import string
app = Flask(__name__)

# Endpoint para obter a lista do cardápio
@app.route('/api/cardapio', methods=['GET'])
def get_cardapio():
    cardapio = load_cardapio()
    return jsonify(cardapio)

# Função para carregar o cardápio do arquivo JSON
def load_cardapio():
    if os.path.exists('cardapio.json'):
        with open('cardapio.json', 'r') as f:
            return json.load(f)
    return []

# Dados do cardápio
cardapio = [
    {
        "id": 1,
        "name": "BATATA FRITA",
        "price": 15
    },
    {
        "id": 2,
        "name": "CHEDDAR BURGUER",
        "price": 25
    },
    {
        "id": 3,
        "name": "CHICKEN BURGUER",
        "price": 22
    },
    {
        "id": 4,
        "name": "TRIPLE X-BACON",
        "price": 32
    },
    {
        "id": 5,
        "name": "X-TUDO",
        "price": 35
    },
    {
        "id": 6,
        "name": "REFRIGERANTE LATA",
        "price": 7
    }
]

# Carrinho (inicialmente vazio)
carrinho = []

# Função para gerar um código de pedido aleatório
def gerar_codigo_pedido():
    caracteres = string.ascii_uppercase + string.digits
    codigo = ''.join(random.choice(caracteres) for _ in range(6))
    return codigo

# Função para salvar os detalhes do pedido
def salvar_pedido(pedido):
    pedidos = []

    if os.path.exists('pedidos.json'):
        with open('pedidos.json', 'r') as f:
            pedidos = json.load(f)

    pedidos.append(pedido)

    with open('pedidos.json', 'w') as f:
        json.dump(pedidos, f, indent=4)

# Rota para adicionar itens ao carrinho
@app.route('/api/adicionar_ao_carrinho', methods=['POST'])
def adicionar_ao_carrinho():
    data = request.json
    item_id = data.get('item_id')
    
    if not item_id:
        return jsonify({'message': 'ID do item não fornecido'}), 400

    item = next((item for item in cardapio if item['id'] == item_id), None)

    if not item:
        return jsonify({'message': 'Item não encontrado'}), 404

    carrinho.append(item)

    return jsonify({'message': 'Item adicionado ao carrinho com sucesso'})

@app.route('/api/processar_pedido', methods=['POST'])
def processar_pedido():
    data = request.json
    nome_cliente = data.get('nome_cliente')
    endereco_cliente = data.get('endereco_cliente')
    telefone_cliente = data.get('telefone_cliente')

    if not nome_cliente or not endereco_cliente or not telefone_cliente:
        return jsonify({'message': 'Informações do cliente incompletas'}), 400

    if not carrinho:
        return jsonify({'message': 'Carrinho vazio, adicione itens antes de processar o pedido'}), 400

    total = sum(item['price'] for item in carrinho)
    codigo_pedido = gerar_codigo_pedido()

    # Criar um novo pedido com os detalhes
    pedido = {
        'codigo_pedido': codigo_pedido,
        'nome_cliente': nome_cliente,
        'endereco_cliente': endereco_cliente,
        'telefone_cliente': telefone_cliente,
        'itens': carrinho,
        'total': total
    }

    salvar_pedido(pedido)  

    # Limpar o carrinho após o processamento do pedido
    carrinho.clear()

    # Rota para exibir a lista de pedidos já processados
@app.route('/api/lista_pedidos', methods=['GET'])
def lista_pedidos():
    if os.path.exists('pedidos.json'):
        with open('pedidos.json', 'r') as f:
            pedidos = json.load(f)
        return jsonify(pedidos)
    else:
        return jsonify([])  # Retorna uma lista vazia se não houver pedidos

# Rota para exibir detalhes de um pedido específico
@app.route('/api/detalhes_pedido/<codigo_pedido>', methods=['GET'])
def detalhes_pedido(codigo_pedido):
    if os.path.exists('pedidos.json'):
        with open('pedidos.json', 'r') as f:
            pedidos = json.load(f)
            
        pedido = next((p for p in pedidos if p['codigo_pedido'] == codigo_pedido), None)
        
        if pedido:
            return jsonify(pedido)
        else:
            return jsonify({'message': 'Pedido não encontrado'}), 404
    else:
        return jsonify({'message': 'Nenhum pedido foi processado'}), 404

    return jsonify({'message': 'Pedido processado com sucesso'})


if __name__ == '__main__':
    app.run(debug=True)
