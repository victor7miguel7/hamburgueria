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

function generateOrderId() {
    return new Date().getTime().toString();
}

function saveOrder(orderId, orderData) {
    const fs = require('fs');
    fs.writeFileSync(`orders/${orderId}.json`, JSON.stringify(orderData, null, 2));
}

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
