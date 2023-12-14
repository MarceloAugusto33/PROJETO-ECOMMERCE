let carrinho = document.querySelector('.overlay')
//FUNÇAO DE ABRIR O CARRINHO
function openNav(){
    let larguraDaTela = window.innerWidth;
    if (larguraDaTela < 768){
        carrinho.style.width = "60%"
    } else{
        carrinho.style.width = "20%"
    }
    
}

//FUNÇAO DE FECHAR O CARRINHO
function closeNav(){
    carrinho.style.width = "0"
}

//FUNÇAO DE ADICIONAR AO CARRINHO
let campoProduto = document.querySelector('.produtosCarrinho');
function addCarrinho(id) {
    let produto = document.getElementById(id);
    campoProduto.innerHTML += `
        <div class="cardCarrinho" id="n${id}">
            <div class="descProduto">
                <img src="${produto.querySelector('img').src}" alt="">
                <h3>${produto.querySelector('h3').innerHTML}</h3>
                <p>${produto.querySelector('h4').innerHTML}</p>
                <button onclick="remove('n${id}')">Remover</button>
            </div>
        </div>`;
        verificarCarrinho();
    let larguraDaTela = window.innerWidth;
    if (larguraDaTela < 768){
        carrinho.style.width = "60%"
    } else{
        carrinho.style.width = "20%"
    }
}

//FUNÇAO DE REMOVER DO CARRINHO
function remove(id){
    let produto = document.getElementById(id)
    produto.remove();
    verificarCarrinho();
}

//FUNÇAO PARA VERIFICAR OS ITENS DO CARRINHO E O SEU VALOR
function verificarCarrinho() {
    let contador = 0
    let valorTotal = document.querySelector('#valorTotal');
    let produtosNoCarrinho = document.querySelectorAll('.cardCarrinho');
    let qtdItensCarrinho = document.querySelector('.qtdItensCarrinho')
    let index = 0
    if(produtosNoCarrinho.length == 0){
        contador = 0
        qtdItensCarrinho.innerHTML = index
    } else{
        produtosNoCarrinho.forEach((produto) => {
                let preco = produto.querySelector('p').innerText;
                contador = contador + Number(preco)
                index ++
        });
        qtdItensCarrinho.innerHTML = index
    }
    return valorTotal.innerHTML = `${contador.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
}







