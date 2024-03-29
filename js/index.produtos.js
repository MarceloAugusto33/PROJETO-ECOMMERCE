document.addEventListener('DOMContentLoaded', () => {
    mostrarProdutos();
    localStorage.removeItem('Carrinho')
})

//FUNÇAO PARA BUSCAR OS PRODUTOS FILTRADOS
function buscarProduto() {
    const inputBusca = document.querySelector('#input-busca').value;
    const containerProdutos = document.querySelector('.flex');
    const cancelarBusca = document.querySelector('.cancelarBusca');

    cancelarBusca.style.display = "block"

    if (!inputBusca) {
        containerProdutos.innerHTML = `<h1>Produto não encontrado</h1>`
    } else {
        containerProdutos.innerHTML = ""
        fetch("https://marceloaugusto33.github.io/PROJETO-ECOMMERCE/data/produtos.json")
            .then(response => {
                return response.json();
            })
            .then(jsonData => {
                let produtos = jsonData.produtos;
                let pesquisados = produtos.filter(e => e.nome.toUpperCase().includes(inputBusca.toUpperCase()))
                if (pesquisados.length === 0) {
                    containerProdutos.innerHTML = `<h1>Produto não encontrado</h1>`
                } else {
                    pesquisados.map(produto => {
                        containerProdutos.innerHTML += `
                        <div class="card" id="${produto.id}">
                            <img src="${produto.imagem}" alt="foto produto">
                            <h3>${produto.nome}</h3>
                            <h4>${Number(produto.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h4>
                            <button onclick='addCarrinho(${produto.id})'>ADICIONAR NO CARRINHO</button>
                        </div>`
                    })
                }
            })
            .catch(err => {
                console.log('url ERRADA')
            })
    }
}


//FUNÇAO PARA PEGAR OS PRODUTOS DO JSON
function mostrarProdutos() {
    const containerProdutos = document.querySelector('.flex');
    const cancelarBusca = document.querySelector('.cancelarBusca');
    
    document.querySelector('#input-busca').value = ""
    cancelarBusca.style.display = "none"

    fetch("https://marceloaugusto33.github.io/PROJETO-ECOMMERCE/data/produtos.json")
        .then((response) => {
            return response.json();
        })
        .then((jsonData) => {
            containerProdutos.innerHTML = ""
            listaProdutos = jsonData.produtos
            let id = 1
            listaProdutos.map(produto => {
                containerProdutos.innerHTML += `
                    <div class="card" id="${produto.id}"'>
                        <img src="${produto.imagem}" alt="foto produto">
                        <h3>${produto.nome}</h3>
                        <h4>${Number(produto.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h4>
                        <button onclick='addCarrinho(${id})'>ADICIONAR NO CARRINHO</button>
                    </div>`;
                id++
            });
        })
        .catch(() => {
            containerProdutos.innerHTML = `<h1>Sem produtos<h1>`
            console.log('url ERRADA')
        })
}
