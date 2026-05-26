// adicionar os valores em receita/despesa/total
// se  adicionado despesa: diminui em despesa e saldo
// se adicionado receita: soma em receita e saldo


const valorReceita = document.querySelector("#valorReceita");
    const valorDespesa = document.querySelector("#valorDespesa");
    const valorSaldo = document.querySelector("#valorSaldo");
    let contadorReceita = 0;
    let contadorDespesa = 0;
    let contadorsaldo = 0;

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
    var valorInput = valor.value;
    var categoriaInput = categoria.value;
    // concatenação e criação dentro do histórico
    const descricaoTexto = document.createElement("span");
    descricaoTexto.textContent = descricaoInput + " - ";

    const valorTexto = document.createElement("span");

    if(categoriaInput === "receita"){
        valorTexto.textContent = `+ R$ ${valorInput}`;
        valorTexto.style.color = "#37f4b5";

        contadorReceita += valorInput;
        contadorsaldo += valorInput;
    }

    valorReceita.textContent = contadorReceita;
    valorSaldo.textContent = contadorsaldo;

    if(categoriaInput === "despesa"){
        valorTexto.textContent = `- R$ ${valorInput}`;
        valorTexto.style.color = "#de062d";

        contadorDespesa += valorInput;
        contadorsaldo -= valorInput;
    }

    valorDespesa.textContent = contadorDespesa;
    valorSaldo.textContent = contadorsaldo

    li.appendChild(descricaoTexto);
    li.appendChild(valorTexto);

    lista.appendChild(li);

    descricao.value = "";
    valor.value = "";
    categoria.value = "";


});

// contadorP será o <p>, e contadorValor será = 0 ... caso receita/despesa seja adicionada, pega o valorInput += contador, e depois transforma para texto ao <p> (appendChild)
// para receita/saldo(+), despesa/saldo(-)