if(!localStorage.getItem('Carrinho')){
    window.location.href = 'index.html'
}


function evitarEnvioComEnter(event) {
    
    if (event.keyCode === 13) {
        event.preventDefault();
        return false;
    }
    return true;
}


let valor = 0

document.addEventListener('DOMContentLoaded', () => {
    let produtosCarrinho = JSON.parse(localStorage.getItem('Carrinho'))

    for (let i = 0; i < produtosCarrinho.length; i++){
        produtosCarrinho[i] = `${produtosCarrinho[i]}`
    }

    const divProdutos = document.querySelector('#pr')

    fetch('https://marceloaugusto33.github.io/PROJETO-ECOMMERCE/data/produtos.json')
        .then((response) =>{
            return response.json()
        })
        .then((jsonData) => {
            let produtos = jsonData.produtos;
            const produtosNoCarrinho = produtos.filter((produto) => produtosCarrinho.includes(produto.id));
            if (produtosNoCarrinho.length == 0){
                containerProdutos.innerHTML = `<h1>Produto não encontrado</h1>`
            } else{
                produtosNoCarrinho.map((produto) => {
                divProdutos.innerHTML += `
                    <div class="card" id="${produto.id}">
                        <img src="${produto.imagem}" alt="foto produto">
                        <h3>${produto.nome}</h3>
                        <h4>${(Number(produto.preco)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h4>
                    </div>`;
                valor = valor + Number(produto.preco)
                console.log(valor)
                })
            }
        })


})


const InputCep = document.querySelector("#input-cep");

InputCep.addEventListener('input',(e) => {
    const valorFinal = document.querySelector('.valor-final');
    let letra = e.target.value
    if(letra.length == 8 && !valorFinal){
        buscarCEP()
    }
})


function buscarCEP() {
    const cep = document.querySelector("#input-cep").value;
    const paragrafoErro = document.querySelector('#erro')
    const endereco = document.querySelector('.localidade')
    if(cep.length != 8 || cep == null || cep == undefined){
        paragrafoErro.innerHTML = "CEP INCORRETO"
        endereco.innerHTML = ""
    } else{
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then((response) => {
                return response.json()
            })
            .then((jsonData) => {
                if(jsonData.erro != true){
                    paragrafoErro.innerHTML = ""
                    endereco.innerHTML = `
                    <h1>Endereço Encontrado!</h1>
                    <p>Bairro: ${jsonData.bairro}</p>
                    <p>Cep: ${jsonData.cep}</p>
                    <p>Complemento: ${jsonData.complemento}</p>
                    <p>ddd: ${jsonData.ddd}</p>
                    <p>Localidade: ${jsonData.localidade}</p>
                    <p>logradouro: ${jsonData.logradouro}</p>
                    <p>Estado: ${jsonData.uf}</p>
                    <div class="valor-final">
                        <div class="final">
                            <span class="material-symbols-outlined">credit_card</span>
                            <p>Valor Final:</p>
                        </div>
                        <p id="valor-final">${valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                    </div>
                    <button id="finalizarCompra" onclick="abrirModal()" type="button">FINALIZAR COMPRA</button>
                    </div>
                    `
                location.href ="#input-cep"
                document.querySelector("#input-cep").blur()
                } else{
                    endereco.innerHTML = ""
                    paragrafoErro.innerHTML = "CEP INCORRETO"
                    return
                }
            })
            .catch((err) => {
                alert('Cep nao existe')
            })

    }
}

function inicio() {
    window.location.href = "index.html"
}


function abrirModal(){
    document.querySelector('.modal').style.display = "flex"
    let larguraDaTela = window.innerWidth;
    
    setInterval(()=> {
        if (larguraDaTela > 1000){
            document.querySelector('.modalContainer').style.width = "50%"
        } else{
            document.querySelector('.modalContainer').style.width = "80%"
        }
    },50)
    
    document.body.style.overflow = "hidden"
}