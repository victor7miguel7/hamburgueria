// Dentro da seção <script> no final do arquivo HTML

// Função para buscar e exibir a lista de ingredientes
async function fetchIngredients() {
    try {
        const response = await fetch('http://127.0.0.1:5000/api/ingredients');
        const data = await response.json();

        const ingredientList = document.getElementById('ingredient-list');
        ingredientList.innerHTML = ''; // Limpar conteúdo anterior

        data.forEach(ingredient => {
            const li = document.createElement('li');
            li.textContent = ingredient.name;
            ingredientList.appendChild(li);
        });
    } catch (error) {
        console.error('Erro ao buscar ingredientes:', error);
    }
}

// Chamar a função para buscar e exibir ingredientes quando a página carrega
window.onload = fetchIngredients;
