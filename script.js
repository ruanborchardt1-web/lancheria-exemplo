/**
 * ===================================================
 * ARQUIVO: script.js
 * FUNÇÃO: Lógica do Carrinho de Compras
 * ===================================================
 */

// 1. DADOS DO CARDÁPIO (Simulação do que viria do Backend)
// Usamos um Array de Objetos para mapear os dados dos itens do HTML
const CARDAPIO_ITENS = [
    { id: 1, nome: "Super Clássico", preco: 35.90 },
    { id: 2, nome: "Vegetariano Deluxe", preco: 29.90 },
    { id: 3, nome: "Batata Frita Rústica", preco: 18.00 },
    { id: 4, nome: "Anéis de Cebola", preco: 22.50 },
    { id: 5, nome: "Refrigerante Lata", preco: 6.00 },
];

// 2. VARIÁVEL GLOBAL PARA O CARRINHO
// O carrinho será um Array de Objetos: [{ item_id: 1, quantidade: 2, preco: 35.90 }]
let carrinho = [];

/**
 * Encontra um item no carrinho pelo seu ID.
 * @param {number} itemId - O ID do produto.
 * @returns {object | undefined} O item do carrinho ou undefined se não encontrado.
 */
const encontrarItemNoCarrinho = (itemId) => {
    return carrinho.find(item => item.item_id === itemId);
};

/**
 * Adiciona um item ao carrinho ou aumenta sua quantidade.
 * @param {number} itemId - O ID do produto a ser adicionado.
 */
const adicionarAoCarrinho = (itemId) => {
    const produto = CARDAPIO_ITENS.find(p => p.id === itemId);

    if (!produto) {
        console.error(`Produto com ID ${itemId} não encontrado no cardápio.`);
        return;
    }

    const itemExistente = encontrarItemNoCarrinho(itemId);

    if (itemExistente) {
        // Se o item já existe, apenas incrementa a quantidade
        itemExistente.quantidade += 1;
        console.log(`+1: ${itemExistente.nome}. Nova quantidade: ${itemExistente.quantidade}`);
    } else {
        // Se é a primeira vez, adiciona um novo item ao carrinho
        carrinho.push({
            item_id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            quantidade: 1
        });
        console.log(`Novo item adicionado: ${produto.nome}`);
    }

    renderizarCarrinho();
};

/**
 * Calcula o total do carrinho e exibe no console (mockup da interface)
 */
const renderizarCarrinho = () => {
    let total = 0;
    console.groupCollapsed('🛒 Estado Atual do Carrinho');

    if (carrinho.length === 0) {
        console.log("Carrinho está vazio.");
    }

    carrinho.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        total += subtotal;
        console.log(`- ${item.nome} (${item.quantidade}x) = R$ ${subtotal.toFixed(2)}`);
    });

    console.log("-----------------------------------------");
    console.log(`TOTAL DO PEDIDO (sem frete): R$ ${total.toFixed(2)}`);
    console.groupEnd();
};


/**
 * Inicializa a aplicação: Anexa ouvintes de eventos aos botões "Adicionar".
 */
const inicializarApp = () => {
    // Seleciona todos os botões com a classe 'adicionar-btn'
    const botoesAdicionar = document.querySelectorAll('.adicionar-btn');

    // Itera sobre a lista de botões e anexa o evento de clique
    botoesAdicionar.forEach(botao => {
        botao.addEventListener('click', (event) => {
            // Pega o ID do item do atributo data-item-id no HTML
            const itemId = parseInt(event.target.dataset.itemId);
            
            // Chama a função principal de adicionar ao carrinho
            adicionarAoCarrinho(itemId);
        });
    });

    console.log("Sistema de Pedidos Online iniciado. Botões de Adicionar prontos.");
};

// ------------------------------------------------------------------------
// INÍCIO DO PROJETO
// O evento 'DOMContentLoaded' garante que o script só rode após o HTML ser totalmente carregado.
document.addEventListener('DOMContentLoaded', inicializarApp);