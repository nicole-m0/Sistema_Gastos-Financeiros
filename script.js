// 1 - criar a lista ao adicionar no input

const addBtn = document.querySelector("#btnAdd");

addBtn.addEventListener("click", (event) => {
    event.preventDefault();
    var lista = document.createElement("ul");
    var li = document.createElement("li");

    var descricao = document.querySelector("#descricao");
    var valor = document.querySelector("#valor");
    var categoria = document.querySelector("#categoria");

    var descricaoInput = descricao.value;
    var valorInput = valor.value;
    var categoriaInput = categoria.value;

    const descricaoTexto = document.createElement("span");
    descricaoTexto.textContent = descricaoInput + " - ";

    const valorTexto = document.createElement("span");
    valorTexto.textContent = `R$ ${valorInput}`;

    if(categoriaInput === "receita"){
        valorTexto.style.color = "#37f4b5";
    }
    if(categoriaInput === "despesa"){
        valorTexto.style.color = "#de062d";
    }

    li.appendChild(descricaoTexto);
    li.appendChild(valorTexto);

    lista.appendChild(li);

    document.body.appendChild(lista);

    descricao.value = "";
    valor.value = "";
    categoria.value = "";
});

// 2 - adicionar os números em receita/despesa/saldo