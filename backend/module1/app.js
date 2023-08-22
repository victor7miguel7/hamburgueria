const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Rota para verificar se o servidor está funcionando
app.get('/', (req, res) => {
    res.send('Servidor está funcionando!');
});

// Rota para receber pedidos via POST
app.post('/api/orders', (req, res) => {
    const orderData = req.body;
    const orderId = generateOrderId();

    // Salvar detalhes do pedido em um arquivo
    saveOrder(orderId, orderData);

    res.json({ orderId: orderId, message: 'Pedido recebido com sucesso!' });
});



app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
/*
let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let body = document.querySelector('body');

openShopping.addEventListener('click', () => {
    body.classList.add('active');
});

closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

// Produtos (já estão no seu código)
// Funções (já estão no seu código)

function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Adiciona ao Carrinho</button>`;
        list.appendChild(newDiv);
    });
}

initApp();*/

