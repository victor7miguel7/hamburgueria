let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
let totalPriceElement = document.getElementById('totalPriceElement');

const sendOrderButton = document.getElementById('sendOrderButton');
sendOrderButton.addEventListener('click', generateOrder);

totalPriceElement.addEventListener('click', generateOrder);

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'XTUDO',
        image: '1.JPG',
        price: 12.00
    },
    {
        id: 2,
        name: 'TRIPLE XBACON 2',
        image: '2.JPEG',
        price: 18
    },
    {
        id: 3,
        name: 'TRIPLE XCHICKEN ',
        image: '3.JPEG',
        price: 22
    },
    {
        id: 4,
        name: 'CHEDDAR BURGUER',
        image: '4.JPEG',
        price: 25
    },
    {
        id: 5,
        name: 'BATATA FRITA',
        image: '5.JPG',
        price: 10
    },
    {
        id: 6,
        name: 'REFRIGERANTE',
        image: '6.JPG',
        price: 7
    }
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add Carrinho</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        // cipia da listcard
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}

function generateOrder() {
    let orderItems = [];

    // Percorre os produtos no carrinho e crie um array de itens no pedido
    listCards.forEach((value) => {
        if (value != null) {
            orderItems.push({
                name: value.name,
                price: value.price,
                quantity: value.quantity,
            });
        }
    });

    // Calcula o preço total do pedido
    let totalPrice = 0;
    orderItems.forEach((item) => {
        totalPrice += item.price;
    });

    // Cria um objeto de pedido
    let order = {
        id: generateUniqueId(), 
        items: orderItems,
        total: totalPrice,
    };

    // Enviar o pedido para o servidor usando fetch
    /*fetch('/api/criarpedido', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
    })
    .then((response) => {
        if (response.status === 200) {
            alert('Pedido enviado com sucesso!');
        } else {
            alert('Erro ao enviar o pedido.');
        }
    })
    .catch((error) => {
        console.error('Erro ao enviar o pedido:', error);
    });
}*/

// Enviar o pedido para o servidor usando fetch
fetch('/api/criarpedido', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
})
.then((response) => {
    if (response.ok) {
        // O método response.ok verifica se o código de status está na faixa 200-299
        alert('Pedido enviado com sucesso!');
    } else {
        alert('Erro ao enviar o pedido. Código de status: ' + response.status);
    }
})
.catch((error) => {
    console.error('Erro ao enviar o pedido:', error);
});


// Função para gerar UUID exclusivo
function generateUniqueId() {
    const chars = '0123456789abcdef';
    let uuid = '';

    // Gera um UUID aleatório com base em caracteres hexadecimais
    for (let i = 0; i < 32; i++) {
        const index = Math.floor(Math.random() * 16);
        uuid += chars[index];
    }

    // Adicione hífens para seguir o formato UUID 
    uuid = uuid.substring(0, 8) + '-' + uuid.substring(8, 12) + '-' + uuid.substring(12, 16) + '-' + uuid.substring(16, 20) + '-' + uuid.substring(20);

    return uuid;
}

// Exemplo de uso da função para gerar um UUID único
const orderId = generateUniqueId();
console.log(orderId);

// Exemplo de como enviar uma solicitação para obter detalhes de um pedido específico
function getPedidoDetails(orderId) {
    fetch(`/api/detalhespedido/${orderId}`)
        .then((response) => response.json())
        .then((data) => {
            // Atualize a interface do usuário com os detalhes do pedido
            console.log('Detalhes do Pedido:', data);
        })
        .catch((error) => {
            console.error('Erro ao obter detalhes do pedido:', error);
        });
}

// Adiciona um evento de clique ao botão "Detalhes" na interface do cliente
const detailsButton = document.getElementById('detailsButton');
detailsButton.addEventListener('click', () => {
    //so p teste
    const orderId = '123456'; // Por exemplo, você pode solicitar o ID do pedido ao usuário
    getPedidoDetails(orderId);
});

}