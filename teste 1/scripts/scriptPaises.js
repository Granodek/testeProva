let listaPaises = [];

if (window.localStorage.getItem("paises")){
    listaPaises=restaurar();
}

const formCadPais = document.getElementById("cadPais");

function calcularTarifa(importacoes,exportacoes){
    return ((exportacoes - importacoes) / importacoes);
}

function validarEntradas(){
    let resultado = true;
    const inputPais = document.getElementById("nomePais");
    const inputMercadoria = document.getElementById("mercadoria");
    const inputTotalImportacoes = document.getElementById("totalImportacoes");
    const inputTotalExportacoes = document.getElementById("totalExportacoes");

    if(inputPais.value == ""){
        resultado = false;
        inputPais.style.borderColor="red";
    }
    else{
        inputPais.style.borderColor="";
    }

    if(inputMercadoria.value == ""){
        resultado = false;
        inputMercadoria.style.borderColor="red";
    }
    else{
        inputPais.style.borderColor="";
    }

    
    if(inputTotalImportacoes.value == ""){
        resultado = false;
        inputTotalImportacoes.style.borderColor="red";
    }
    else{
        inputPais.style.borderColor="";
    }


    if(inputTotalExportacoes.value == ""){
        resultado = false;
        inputTotalExportacoes.style.borderColor="red";
    }
    else{
        inputPais.style.borderColor="";
    }

    return resultado;
    
}

function cadastrarPais(evento){
    if(validarEntradas()){
        //proceder com o cadastro
        const inputPais = document.getElementById("nomePais");
        const inputMercadoria = document.getElementById("mercadoria");
        const inputTotalImportacoes = document.getElementById("totalImportacoes");
        const inputTotalExportacoes = document.getElementById("totalExportacoes");
        const imp = parseFloat(inputTotalImportacoes.value);
        const exp = parseFloat(inputTotalExportacoes.value);
        if(!isNaN(exp)||!isNaN(imp)){ 
        let valorTarifa = calcularTarifa(imp, exp);
        if (valorTarifa < 0){
            valorTarifa = -((valorTarifa/2)*100).toFixed(2);
        }else{
            valorTarifa = 10;
        }
        

        //registrar o pais
       
        if(!verificarDuplicado(inputPais.value,inputMercadoria.value)){
            listaPaises.push({nomePais:inputPais.value,
                              mercadoria:inputMercadoria.value,
                              importacoes:inputTotalImportacoes.value,
                              exportacoes:inputTotalExportacoes.value,
                              tarifa:valorTarifa
                            });
            gravar();
            exibirLista();
        }
        else{
            alert("País/Mercadoria já cadastrados");
        }
    }
    }
    else{
        evento.stopPropagation();
        evento.preventDefault();
    }
}

function verificarDuplicado(pais,mercadoria){
    for(let i = 0; i < listaPaises.length; i++){
        if (listaPaises[i].nomePais == pais && 
            listaPaises[i].mercadoria == mercadoria){
                return true;
            }
    }
    return false;
}

function exibirLista(){
    const divTabela = document.getElementById("divTabela");
    divTabela.innerHTML="";
    if (listaPaises.length > 0){

        const tabela = document.createElement("table");
        const cabecalho = document.createElement("thead");
        const corpo = document.createElement("tbody");
        cabecalho.innerHTML=`<tr>
            <th>País<th>
            <th>Mercadoria<th>
            <th>Importacoes<th>
            <th>Exportações<th>
            <th>tarifa %<th>
            <th>Ações<th>
        </tr>`;
        tabela.appendChild(cabecalho);

        for(let i=0; i < listaPaises.length; i++){
            const linha = document.createElement('tr');
            linha.innerHTML=`<td>${listaPaises[i].nomePais}</td>
                             <td>${listaPaises[i].mercadoria}</td>
                             <td>${listaPaises[i].importacoes}</td>
                             <td>${listaPaises[i].exportacoes}</td>
                             <td>${listaPaises[i].tarifa}</td>
                             <td><button class="btn-excluir id="${i}" >excluir</button></td>
                             `;
            corpo.appendChild(linha);
        }

        tabela.appendChild(corpo);
        divTabela.appendChild(tabela);

        corpo.querySelectorAll('.btn-excluir').forEach(botao => {
            botao.addEventListener('click', function () {
                const id = parseInt(this.id);
                Remover(id);
            });
        });


    }
    else{
        divTabela.innerHTML="<p>Não existem países cadastrados</p>";
    }
}

function gravar(){
    window.localStorage.setItem("paises",JSON.stringify(listaPaises));
}

function restaurar(){
    return JSON.parse(window.localStorage.getItem("paises"));
}

const Remover = (id) =>{
    listaPaises.splice(id,1);
    gravar();
    exibirLista();
}

formCadPais.onsubmit=cadastrarPais;
exibirLista();

