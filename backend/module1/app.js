const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 3000;
const SECRET_KEY = 'senhatoken';

app.use(express.json());

// Rota para verificar se o servidor está funcionando
//app.get('/', (req, res) => {
//    res.send('Servidor está funcionando!');
//});
/*
// Rota para receber pedidos via POST
app.post('/api/orders', (req, res) => {
    const orderData = req.body;
    const orderId = generateOrderId();

    // Salvar detalhes do pedido em um arquivo
    saveOrder(orderId, orderData);

    res.json({ orderId: orderId, message: 'Pedido recebido com sucesso!' });
});
*/


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Verificar as credenciais (simplificado, não recomendado para produção)
    if (username === 'usuario' && password === 'senha') {
        const token = jwt.sign({ username }, SECRET_KEY);
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Credenciais inválidas' });
    }
});

app.post('/api/orders', verifyToken, (req, res) => {
    // Resto do seu código para lidar com os pedidos...
});

function verifyToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido' });
        }
        req.username = decoded.username;
        next();
    });
}
