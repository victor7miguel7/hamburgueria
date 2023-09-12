const express = require('express');
const app = express();
const port = 3000; // Escolha a porta que desejar
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

//app.use(express.static('pagweb'));
// Configura o Express.js para servir arquivos estáticos da pasta "public"
//app.use(express.static('public'));

// Configura um proxy reverso para direcionar solicitações para o servidor na porta 8080
//app.use('/api', createProxyMiddleware({ target: 'http://localhost:8080', changeOrigin: true }));
app.use('/api', createProxyMiddleware({ target: 'http://localhost:8080', changeOrigin: true }));


// Rota de exemplo
app.get('/', (req, res) => {
    res.send('Olá, mundo!');
});

// Middleware para lidar com solicitações JSON
app.use(express.json());



// Rota para criar um novo pedido
/*app.post('/api/criarpedido', (req, res) => {
    console.log('Recebida uma solicitação POST em /api/criarpedido')
    //const order = req.body; // O pedido recebido do cliente

    // Gera um UUID exclusivo para o pedido (sua função generateUniqueId)

    // Salve o pedido no seu sistema, associando-o ao orderId gerado

    // Envie uma resposta ao cliente com o orderId
    //const orderId = generateUniqueId(); // Substitua isso com a lógica real
    //res.status(200).json({ orderId });
});*/

app.post('/api/criarpedido', (req, res) => {
    console.log('Recebida uma solicitação POST em /api/criarpedido');

    // Verifique se o corpo da solicitação contém os dados do pedido
    const orderData = req.body;

    if (!orderData || !Array.isArray(orderData.items) || orderData.items.length === 0) {
        // Se os dados do pedido forem inválidos, retorna um erro com código de status 400 (Bad Request)
        return res.status(400).json({ error: 'Dados do pedido inválidos' });
    }

   

    // Gera um ID de pedido exclusivo 
    const orderId = generateUniqueId();

    // Responde com o ID do pedido criado e um código de status 201 (Created)
    res.status(201).json({ orderId: orderId, message: 'Pedido criado com sucesso' });
});





// Rota para obter detalhes de um pedido específico
app.get('/api/detalhespedido/:id', (req, res) => {
    const orderId = req.params.id; // Obtenha o id do pedido da URL

    // Recupere os detalhes do pedido com base no orderId (sua função getOrderDetailsById)
    const orderDetails = getOrderDetailsById(orderId); // Implemente essa função para buscar os detalhes do pedido

    if (orderDetails) {
        res.status(200).json(orderDetails);
    } else {
        res.status(404).json({ error: 'Pedido não encontrado' });
    }
});

// Inicia o servidor na porta especificada
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

// Função para gerar UUID exclusivo (sua função generateUniqueId)
function generateUniqueId() {
    // Sua implementação para gerar UUID exclusivo aqui
}

// Função para buscar detalhes do pedido (sua função getOrderDetailsById)
function getOrderDetailsById(orderId) {
    
}

