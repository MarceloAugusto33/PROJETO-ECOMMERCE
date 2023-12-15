let carrinho = document.querySelector('.overlay')
let listaCarrinho = []
//FUNÇAO DE ABRIR O CARRINHO
function openNav(){
    let larguraDaTela = window.innerWidth;
    if (larguraDaTela < 1000){
        carrinho.style.width = "70%"
    } else{
        carrinho.style.width = "20%"
    }
    carrinho.classList.add('.open');
}

//FUNÇAO DE FECHAR O CARRINHO
function closeNav(){
    carrinho.style.width = "0"
    carrinho.classList.remove('.open')
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
        openNav();
        listaCarrinho.push(`${id}`)
        verificarCarrinho();
}

//funçao para que quando mudar de resoluçao, o tamanho do carrinho se ajuste
window.addEventListener('resize',() => {
    if(carrinho.classList.contains('.open')){
        let larguraDaTela = window.innerWidth;
        if (larguraDaTela < 1000){
            carrinho.style.width = "70%"
        } else{
            carrinho.style.width = "20%"
        }
    }
})


//FUNÇAO DE REMOVER DO CARRINHO
function remove(id){
    let produto = document.getElementById(id)
    produto.remove();
    let index = listaCarrinho.indexOf(id.slice(1));
    if (index != -1){
        listaCarrinho.splice(index,1);
    }
    verificarCarrinho();
}

//FUNÇAO PARA VERIFICAR OS ITENS DO CARRINHO E O SEU VALOR
function verificarCarrinho() {
    let contador = 0
    let valorTotal = document.querySelector('#valorTotal');
    let produtosNoCarrinho = document.querySelectorAll('.cardCarrinho');
    let qtdItensCarrinho = document.querySelector('.qtdItensCarrinho')
    let btnRemoveItens = document.querySelector('#remove-all')
    let btnCompra = document.querySelector('#btnCompra')
    let index = 0
    if(produtosNoCarrinho.length == 0){
        qtdItensCarrinho.innerHTML = index
        btnCompra.style.display = "none"

    } else{
        produtosNoCarrinho.forEach((produto) => {
                let preco = produto.querySelector('p').innerText;
                contador = contador + Number(preco)
                console.log(contador)
                index ++
        });
        qtdItensCarrinho.innerHTML = index
        if(index > 1){
            btnRemoveItens.style.display = "block"
        } else{
            btnRemoveItens.style.display = "none"
        }
        btnCompra.style.display = "block"

    }
    localStorage.setItem('Carrinho',JSON.stringify(listaCarrinho))
    return valorTotal.innerHTML = `${contador.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
}

function esvaziarCarrinho(){
    let produtosNoCarrinho = document.querySelectorAll('.cardCarrinho');
    if(produtosNoCarrinho.length > 0){
        produtosNoCarrinho.forEach((produto) => {
            produto.remove()
            verificarCarrinho()
            listaCarrinho = []
            localStorage.removeItem('Carrinho')
        });
    } else{
        return
    }
}




