const addBtn = document.querySelector("#btnAdd");

addBtn.addEventListener("click", (event) => {
    event.preventDefault();

    var lista = document.querySelector("#historicoLista");
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

    if(categoriaInput === "receita"){
        valorTexto.textContent = `+ R$ ${valorInput}`;
        valorTexto.style.color = "#37f4b5";
    }

    if(categoriaInput === "despesa"){
        valorTexto.textContent = `- R$ ${valorInput}`;
        valorTexto.style.color = "#de062d";
    }

    li.appendChild(descricaoTexto);
    li.appendChild(valorTexto);

    lista.appendChild(li);

    descricao.value = "";
    valor.value = "";
    categoria.value = "";
});

// adicionar os valores em receita/despesa/total