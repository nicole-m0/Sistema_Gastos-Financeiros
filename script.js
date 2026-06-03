// adicionar os valores em receita/despesa/total
// se  adicionado despesa: diminui em despesa e saldo
// se adicionado receita: soma em receita e saldo


const valorReceita = document.querySelector("#valorReceita");
const valorDespesa = document.querySelector("#valorDespesa");
const valorSaldo = document.querySelector("#valorSaldo");
let contadorReceita = 0;
let contadorDespesa = 0;
let contadorSaldo = 0;

let indiceEditado = null;

var historicoSalvo = JSON.parse(localStorage.getItem("historicoLista")) || [];

// Adicionar receita/despesa
const addBtn = document.querySelector("#btnAdd");

addBtn.addEventListener("click", (event) => {

    event.preventDefault();

    const descricaoInput = descricao.value;
    const valorInput = Number(valor.value);
    const categoriaInput = categoria.value;

    if(descricaoInput.trim() === ""){
        alert("Escreva uma descrição!");
        return;
    }

    const transacao = {
        descricao: descricaoInput,
        valor: valorInput,
        categoria: categoriaInput
    };

    // EDITANDO
    if(indiceEditado !== null){
        historicoSalvo[indiceEditado] = transacao;
        indiceEditado = null;
        addBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Adicionar';
    }

    // ADICIONANDO
    else{
        historicoSalvo.push(transacao);
    }

    localStorage.setItem(
        "historicoLista",
        JSON.stringify(historicoSalvo)
    );

    carregarHistorico();

    descricao.value = "";
    valor.value = "";
    categoria.value = "receita";

});


// localstorage
function carregarHistorico() {

    const lista = document.querySelector("#historicoLista");

    // limpa a lista antes
    lista.innerHTML = "";

    // zera os contadores
    contadorReceita = 0;
    contadorDespesa = 0;
    contadorSaldo = 0;

    historicoSalvo.forEach((transacao, indice) => {

        const li = document.createElement("li");

        const descricaoTexto = document.createElement("span");
        descricaoTexto.textContent = transacao.descricao + " - ";

        const valorTexto = document.createElement("span");

    const btnExcluir = document.createElement('span');
    btnExcluir.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    btnExcluir.style.cursor = "pointer";
    btnExcluir.style.marginLeft = "10px";
    btnExcluir.style.color = "#3B82F6";
    btnExcluir.title = "Excluir";

    btnExcluir.addEventListener('click', () => {
        const confirmed = confirm("Deseja remover esse item?");
        if(confirmed){
            historicoSalvo.splice(indice, 1);

        localStorage.setItem(
            "historicoLista",
            JSON.stringify(historicoSalvo)
        );
        carregarHistorico();
        }
    })

    const btnEditar = document.createElement('span');
        btnEditar.innerHTML = '<i class="fa-solid fa-pencil"></i>';
        btnEditar.style.cursor = "pointer";
        btnEditar.style.marginLeft = "10px";
        btnEditar.style.color = "#3B82F6";
        btnEditar.title = "Editar";

        btnEditar.addEventListener('click', () => {
        descricao.value = transacao.descricao;
        valor.value = transacao.valor;
        categoria.value = transacao.categoria;

        indiceEditado = indice;
        addBtn.innerHTML = "💾 Salvar Alterações";
    });

    // receita / despesa 
        if(transacao.categoria === "receita"){

            valorTexto.textContent = `+ R$ ${transacao.valor}`;
            valorTexto.style.color = "#37f4b5";

            contadorReceita += transacao.valor;
            contadorSaldo += transacao.valor;
        }

        if(transacao.categoria === "despesa"){

            valorTexto.textContent = `- R$ ${transacao.valor}`;
            valorTexto.style.color = "#de062d";

            contadorDespesa += transacao.valor;
            contadorSaldo -= transacao.valor;
        }

        li.appendChild(descricaoTexto);
        li.appendChild(valorTexto);
        li.appendChild(btnExcluir);
        li.appendChild(btnEditar);
        lista.appendChild(li);
    });

    // atualiza cards
    valorReceita.textContent = contadorReceita;
    valorDespesa.textContent = contadorDespesa;
    valorSaldo.textContent = contadorSaldo;

 }
carregarHistorico();

// menu
const menuIcon = document.getElementById("menuIcon");
const menu = document.getElementById("menu");

menuIcon.addEventListener("click", () => {
    menu.classList.toggle("active");
});

// tema escuro
const btnEscuro = document.getElementById("btn-escuro");
const body = document.body;

const temaSalvo = localStorage.getItem('tema');
temaEscuro(temaSalvo === 'darkmode');

function temaEscuro(tipo) {
    if(tipo == true){
        body.classList.add('darkmode');
        btnEscuro.innerHTML = '<i class="fa-solid fa-sun"></i> Light Theme';
    }
    else {
        body.classList.remove('darkmode');
        btnEscuro.innerHTML = '<i class="fa-solid fa-moon"></i> DarkLight Theme';
    }
}

btnEscuro.addEventListener("click", () => {
    const isEscuro = body.classList.toggle('escuro');
    temaEscuro(isEscuro);
    localStorage.setItem('tema', isEscuro ? 'escuro' : 'claro');
});

const inicioBtn = document.getElementById("inicioBtn");
const entradaBtn = document.getElementById("entradaBtn");
const saidaBtn = document.getElementById("saidaBtn");
const listaBtn = document.getElementById("listaBtn");

const cardsSection = document.getElementById("RCPContainer");
const formContainer = document.getElementById("formContainer");
const listContainer = document.getElementById("listContainer");

function esconderTudo(){
    cardsSection.style.display = "none";
    formContainer.style.display = "none";
}

inicioBtn.addEventListener("click", () => {

    cardsSection.style.display = "grid";
    formContainer.style.display = "block";

    carregarHistorico();

});

entradaBtn.addEventListener("click", () => {
    esconderTudo();

    const lista = document.getElementById('historicoLista')
    lista.innerHTML = "";
    historicoSalvo.forEach((transacao) => {
        if(transacao.categoria === "receita"){
            const li = document.createElement('li');
            li.innerHTML = `${transacao.descricao} - <span style="color: #37f4b5"> + R$ ${transacao.valor}</span>`;
            lista.appendChild(li);
            historicoSalvo.filter(item => item.categoria === "receita")
        }
    });
});

saidaBtn.addEventListener("click", () => {
    esconderTudo();

    const lista = document.getElementById('historicoLista');
    lista.innerHTML = "";
    historicoSalvo.forEach((transacao) => {
        if(transacao.categoria === 'despesa'){
            const li = document.createElement('li');
            li.innerHTML = `${transacao.descricao} - <span style="color: #de062d"> + R$ ${transacao.valor}</span> `;
            lista.appendChild(li);
            historicoSalvo.filter(item => item.categoria === "despesa");
        }
    })
});

listaBtn.addEventListener("click", () => {
    esconderTudo();
    carregarHistorico();
});

// exportar pdf

const btnPDF = document.querySelector("#pdfBtn");

btnPDF.addEventListener("click", () => {

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    doc.text("Relatório Financeiro", 20, 20);

    doc.text(`Receitas: R$ ${contadorReceita}`, 20, 40);
    doc.text(`Despesas: R$ ${contadorDespesa}`, 20, 50);
    doc.text(`Saldo: R$ ${contadorSaldo}`, 20, 60);

    doc.save("relatorio.pdf");

});