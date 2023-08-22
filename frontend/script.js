// Função para carregar o cardápio do servidor
function loadMenu() {
    fetch('/api/cardapio')
        .then(response => response.json())
        .then(menu => {
            // Atualizar a interface com os itens do cardápio
            // Exemplo: criar elementos HTML para exibir cada item
        })
        .catch(error => console.error('Erro ao carregar o cardápio:', error));
}

// Função para adicionar um item ao carrinho
function addToCart(itemId) {
    // Enviar solicitação POST para adicionar o item ao carrinho
    // Atualizar a interface do carrinho
}

// Função para fazer login
function login(username, password) {
    // Enviar solicitação POST para autenticar usuário
    // Armazenar o token JWT recebido
}

// Função para processar um pedido
function processOrder(orderData) {
    // Enviar solicitação POST para processar o pedido
    // Atualizar a interface com mensagem de sucesso ou erro
}

// Função para carregar a lista de pedidos
function loadOrders() {
    // Enviar solicitação GET para obter a lista de pedidos
    // Atualizar a interface com os pedidos recebidos
}

// Função para exibir detalhes de um pedido específico
function showOrderDetails(orderId) {
    // Enviar solicitação GET para obter detalhes do pedido
    // Atualizar a interface com os detalhes recebidos
}

// Chamar a função de carregar o menu quando a página carregar
window.onload = loadMenu;
