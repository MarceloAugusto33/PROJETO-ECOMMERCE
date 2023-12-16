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
    let modalStatus = document.querySelector('#modalStatus')
    let produto = document.getElementById(id);
    if (listaCarrinho.includes(id)){
        console.log('produto ja existe')
        modalStatus.innerHTML = "PRODUTO JA EXISTE NO CARRINHO"
        modalStatus.style.color = "black"
        document.querySelector('.modalContainer').style.backgroundColor = "rgb(255, 183, 3)"
        abrirModal();
        return
    } else{
        listaCarrinho.push(id)
        modalStatus.innerHTML = "PRODUTO ADICIONADO AO CARRINHO"
        modalStatus.style.color = "white"
        document.querySelector('.modalContainer').style.backgroundColor = "rgba(0, 201, 0, 0.759)"
        campoProduto.innerHTML += `
        <div class="cardCarrinho" id="${id}">
            <div class="descProduto">
                <img src="${produto.querySelector('img').src}" alt="">
                <h3>${produto.querySelector('h3').innerHTML}</h3>
                <p>${produto.querySelector('h4').innerHTML}</p>
                <button onclick="remove(${id})">Remover</button>
            </div>
        </div>`;
        abrirModal()
        console.log('produto nao existe')
    }
    verificarCarrinho();
    console.log(listaCarrinho)

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
    let index = listaCarrinho.indexOf(id);
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

function abrirModal(){
    document.querySelector('.modalContainer').style.display = "block"
    let larguraDaTela = window.innerWidth;
    closeNav();
    
    setTimeout(()=> {
        if (larguraDaTela > 1000){
            document.querySelector('.modalContainer').style.width = "20%"
        } else{
            document.querySelector('.modalContainer').style.width = "80%"
        }
    },50)

    setTimeout(() => {
        document.querySelector('.modalContainer').style.display = "none"
        document.querySelector('.modalContainer').style.width = "0%"
    },1000)
    
}

function fecharModal(){
    setInterval(()=> {
        document.querySelector('.modalContainer').style.display = "none"
    },50)
    
    document.body.style.overflow = "auto"
}


