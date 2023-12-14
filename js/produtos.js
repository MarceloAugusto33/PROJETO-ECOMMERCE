
document.addEventListener('DOMContentLoaded',() => {
    mostrarProdutos()
})

//FUNÇAO PARA BUSCAR OS PRODUTOS FILTRADOS
function buscarProduto(){
    let inputBusca = document.querySelector('#input-busca').value;
    let containerProdutos = document.querySelector('.flex');
    let cancelarBusca = document.querySelector('.cancelarBusca');

    cancelarBusca.style.display = "block"
    
    if (verificarNulo(inputBusca)){
        containerProdutos.innerHTML = `<h1>Produto não encontrado</h1>`
    } else{
        containerProdutos.innerHTML = ""
        fetch("https://marceloaugusto33.github.io/PROJETO-ECOMMERCE/data/produtos.json")
            .then((response) =>{
                return response.json();
            })
            .then((jsonData) => {
                let produtos = jsonData.produtos;
                let pesquisados = produtos.filter((e) => e.nome.toUpperCase().includes(inputBusca.toUpperCase()))
                if (pesquisados.length == 0){
                    containerProdutos.innerHTML = `<h1>Produto não encontrado</h1>`
                } else{
                    pesquisados.map((produto) => {
                    containerProdutos.innerHTML += `
                        <div class="card" id="${produto.id}">
                            <img src="${produto.imagem}" alt="foto produto">
                            <h3>${produto.nome}</h3>
                            <h4>${produto.preco}</h4>
                            <button onclick='addCarrinho(${produto.id})'>COMPRAR</button>
                        </div>`
                    })
                }
            })
            .catch(()=>{
                console.log('url ERRADA')
            })
    }
}


//FUNÇAO PARA VERIFICAR SE O VALOR È NULO OU NAO
function verificarNulo(valor){
    if (valor == "" || valor == null || valor == undefined){
        return true
    } else{
        return false
    }
}

//FUNÇAO PARA PEGAR OS PRODUTOS DO JSON
function mostrarProdutos(){
    let containerProdutos = document.querySelector('.flex');
    let cancelarBusca = document.querySelector('.cancelarBusca');
    document.querySelector('#input-busca').value = ""
    cancelarBusca.style.display = "none"

    fetch("https://marceloaugusto33.github.io/PROJETO-ECOMMERCE/data/produtos.json")
        .then((response) =>{
            return response.json();
        })
        .then((jsonData) => {
            containerProdutos.innerHTML = ""
            listaProdutos = jsonData.produtos
            let id = 1
            listaProdutos.map((produto) => {
                containerProdutos.innerHTML += `
                    <div class="card" id="${produto.id}"'>
                        <img src="${produto.imagem}" alt="foto produto">
                        <h3>${produto.nome}</h3>
                        <h4>${produto.preco}</h4>
                        <button onclick='addCarrinho(${id})'>COMPRAR</button>
                    </div>`;
                id ++
            });
        })
        .catch(() =>{
            containerProdutos.innerHTML = `<h1>Sem produtos<h1>`
            console.log('url ERRADA')
        })
}