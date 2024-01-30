const carrinho = document.querySelector('.overlay');

let listaCarrinho = []
//FUNÇAO DE ABRIR O CARRINHO
function openNav() {
    let larguraDaTela = window.innerWidth;
    if (larguraDaTela < 1000) {
        carrinho.style.width = "85%"
        document.body.style.overflow = "hidden"
    } else {
        carrinho.style.width = "30%"

    }
    carrinho.classList.add('.open');
}

//FUNÇAO DE FECHAR O CARRINHO
function closeNav() {
    carrinho.style.width = "0"
    carrinho.classList.remove('.open')
    document.body.style.overflow = "auto"
}

//FUNÇAO DE ADICIONAR AO CARRINHO

function addCarrinho(id) {
    const icon = document.querySelector('#statusIcon');
    const texto = document.querySelector('#statusText');
    const modal = document.querySelector('.statusCompra');
    if (listaCarrinho.includes(id)) {
        texto.innerHTML = "PRODUTO JA ADICIONADO AO CARRINHO!"
        icon.innerHTML = "block"
        modal.style.backgroundColor = "rgb(245, 152, 3)"
        modal.style.display = "flex"
    } else {
        texto.innerHTML = "PRODUTO ADICIONADO NO CARRINHO!"
        icon.innerHTML = "check_circle"
        modal.style.backgroundColor = "rgb(0, 199, 0)";
        modal.style.display = "flex"
        let campoProduto = document.querySelector('.lista-produtos');
        let produto = document.getElementById(id);
        listaCarrinho.push(id);
        campoProduto.innerHTML += `
            <li id="${id}" class="li-produto">
                <div class="item-produto">
                    <div class="img-produto">
                        <img src="${produto.querySelector('img').src}" alt="foto produto">
                    </div>
                    <div class="nome-produto">${produto.querySelector('h3').innerHTML}</div>
                    <div class="preco-produto">${produto.querySelector('h4').innerHTML}</div>
                </div>
                <div class="deleta-produto" onclick="remove(${id})">
                    <span class="material-symbols-outlined">delete</span>
                </div>
            </li>
            
            `;
    }
    openNav()
    verificarCarrinho()
}


//funçao para que quando mudar de resoluçao, o tamanho do carrinho se ajuste
window.addEventListener('resize', () => {
    if (carrinho.classList.contains('.open')) {
        let larguraDaTela = window.innerWidth;
        if (larguraDaTela < 1000) {
            carrinho.style.width = "85%"
        } else {
            carrinho.style.width = "30%"
        }
    }
})


//FUNÇAO DE REMOVER DO CARRINHO

function remove(id) {
    const icon = document.querySelector('#statusIcon');
    const texto = document.querySelector('#statusText');
    const modal = document.querySelector('.statusCompra');
    modal.style.display = "flex"
    texto.innerHTML = "PRODUTO REMOVIDO DO CARRINHO!"
    icon.innerHTML = "close"
    modal.style.backgroundColor = "red"

    const produto = document.getElementById(id)

    produto.remove();

    const index = listaCarrinho.indexOf(id);
    if (index != -1) {
        listaCarrinho.splice(index, 1);
    }
    verificarCarrinho()
}

//FUNÇAO PARA VERIFICAR OS ITENS DO CARRINHO E O SEU VALOR
function verificarCarrinho() {
    const produtosNoCarrinho = document.querySelectorAll('.li-produto');
    const qtdItensCarrinho = document.querySelector('.qtdItensCarrinho');
    const valorT = document.querySelector('#valorT');

    let contador = 0
    let index = 0

    if (produtosNoCarrinho.length == 0) {
        qtdItensCarrinho.innerHTML = index
        const modal = document.querySelector('.statusCompra')
        modal.style.display = "none"

    } else {

        produtosNoCarrinho.forEach((produto) => {
            const div = produto.querySelector('.item-produto');
            const valor = div.querySelector('.preco-produto').innerHTML;
            let valorEmNumero = valor.replace(/[^\d,]/g, '');

            valorEmNumero = parseFloat(valorEmNumero);

            contador = contador + Number(valorEmNumero);
            index++

        });

        qtdItensCarrinho.innerHTML = index

    }
    localStorage.setItem('Carrinho', JSON.stringify(listaCarrinho))
    return valorT.innerHTML = `${Number(contador).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
}


function finalizarCompra() {
    if (listaCarrinho.length > 0) {
        window.location.href = 'carrinho.html'
    } else {
        const icon = document.querySelector('#statusIcon');
        const texto = document.querySelector('#statusText');
        const modal = document.querySelector('.statusCompra');


        modal.style.display = "flex";
        texto.innerHTML = "CARRINHO VAZIO!";
        icon.innerHTML = "shopping_cart";
        modal.style.backgroundColor = "#242726";
    }
}
