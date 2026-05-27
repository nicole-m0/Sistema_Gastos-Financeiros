// adicionar os valores em receita/despesa/total
// se  adicionado despesa: diminui em despesa e saldo
// se adicionado receita: soma em receita e saldo


const valorReceita = document.querySelector("#valorReceita");
const valorDespesa = document.querySelector("#valorDespesa");
const valorSaldo = document.querySelector("#valorSaldo");
let contadorReceita = 0;
let contadorDespesa = 0;
let contadorSaldo = 0;

var historicoSalvo = JSON.parse(localStorage.getItem("historicoLista")) || [];

// Adicionar receita/despesa
const addBtn = document.querySelector("#btnAdd");

addBtn.addEventListener("click", (event) => {
    event.preventDefault();
    // lista e histórico
    var lista = document.querySelector("#historicoLista");
    var li = document.createElement("li");
    // inputs - DOM
    var descricao = document.querySelector("#descricao");
    var valor = document.querySelector("#valor");
    var categoria = document.querySelector("#categoria");
    // valor digitado
    var descricaoInput = descricao.value;
    var valorInput = Number(valor.value);
    var categoriaInput = categoria.value;

    const transacao = {
        descricao: descricaoInput,
        valor: valorInput,
        categoria: categoriaInput
    }

    historicoSalvo.push(transacao);
    localStorage.setItem("historicoLista", JSON.stringify(historicoSalvo));

    // concatenação e criação dentro do histórico
    const descricaoTexto = document.createElement("span");
    descricaoTexto.textContent = descricaoInput + " - ";

    const valorTexto = document.createElement("span");

    console.log(valorInput);
    console.log(categoriaInput);

    if(categoriaInput === "receita"){
        valorTexto.textContent = `+ R$ ${valorInput}`;
        valorTexto.style.color = "#37f4b5";

        contadorReceita += valorInput;
        contadorSaldo += valorInput;
        valorReceita.textContent = contadorReceita;
        valorSaldo.textContent = contadorSaldo;
    }

    if(categoriaInput === "despesa"){
        valorTexto.textContent = `- R$ ${valorInput}`;
        valorTexto.style.color = "#de062d";

        contadorDespesa += valorInput;
        contadorSaldo -= valorInput;
        valorDespesa.textContent = contadorDespesa;
        valorSaldo.textContent = contadorSaldo
    }

    li.appendChild(descricaoTexto);
    li.appendChild(valorTexto);

    lista.appendChild(li);

    descricao.value = "";
    valor.value = "";
});


// localstorage
function carregarHistorico() {
    historicoSalvo.forEach((transacao) => {
    let contadorReceita = 0;
    let contadorDespesa = 0;
    let contadorSaldo = 0;
    var lista = document.querySelector("#historicoLista");
    var li = document.createElement("li");

    // concatenação e criação dentro do histórico
    const descricaoTexto = document.createElement("span");
    descricaoTexto.textContent = transacao.descricao + " - ";

    const valorTexto = document.createElement("span");

    if(transacao.categoria === "receita"){
        valorTexto.textContent = `+ R$ ${transacao.valor}`;
        valorTexto.style.color = "#37f4b5";

        contadorReceita += transacao.valor;
        contadorSaldo += transacao.valor;
        valorReceita.textContent = contadorReceita;
        valorSaldo.textContent = contadorSaldo;
    }

    if(transacao.categoria === "despesa"){
        valorTexto.textContent = `- R$ ${transacao.valor}`;
        valorTexto.style.color = "#de062d";

        contadorDespesa += transacao.valor;
        contadorSaldo -= transacao.valor;
        valorDespesa.textContent = contadorDespesa;
        valorSaldo.textContent = contadorSaldo
    }

    li.appendChild(descricaoTexto);
    li.appendChild(valorTexto);
    lista.appendChild(li);
    });
}

carregarHistorico();