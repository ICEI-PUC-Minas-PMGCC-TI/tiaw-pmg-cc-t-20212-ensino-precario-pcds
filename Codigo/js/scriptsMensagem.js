const checkAside = document.querySelector("input.none");
const openAsideBtn = document.querySelector("#openSideBar");
const asideButton = document.querySelector(".nav-top-expand");
const searchReposInput = document.getElementById("searchInputId");


function gerarID() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    // A função de gerarID pode ser usada para todas as coisas que podem ser cadastradas pelo usuario.
    // exemplo de ID gerado: _a7ny9bdqz
    return '_' + Math.random().toString(36).substr(2, 9);
}

function toggleAside(){
    let asideBar = document.querySelector("aside.aside-bar");
    let asideBarH1 = document.querySelectorAll("h1.aside-option");
    let mainArticle = document.querySelector("article.content");
    let isChecked = document.querySelector("input.none").checked;
    if(!isChecked){
        asideBar.style.width = "80px";
        mainArticle.style.width = "calc(100% - 80px - 1rem)";
        mainArticle.style.left = "80px";
        asideBarH1.forEach((e) => {
            e.style.display = "none";
        });
        document.querySelector("input.none").checked = true;
    }else{
        asideBar.style.width = "200px";
        mainArticle.style.width = "calc(100% - 200px - 1rem)";
        mainArticle.style.left = "200px";
        asideBarH1.forEach((e) => {
            e.style.display = "inline";
        });
        document.querySelector("input.none").checked = false;
    }    
  }
  
  asideButton.addEventListener("click", toggleAside);
  

function achaUsuarioAtual(Id, usuariodb) {
    for (i = 0; i < usuariodb.users.length; i++) {
        let usuario = usuariodb.users[i];
        if (usuario.usuario_id == Id) {
            return true;
        }
    }
    return false;//Se caiu aqui,usuario não está logado,e portanto não deve estar aqui
}
function achaNomePorId(ID, DB) {
    let resposta = "erro";
    for (i = 0; i < DB.users.length; i++) {
        let usuario = DB.users[i];
        if (usuario.usuario_id == ID) {
            resposta = usuario.nome;
            return resposta;
        }
    }
    return resposta;
}
function achaTituloPorIDs(IDMsg, DBMensagem) {
    let resposta = "erro";

    for (i = 0; i < DBMensagem.mensagens.length; i++) {
        let mensagem = DBMensagem.mensagens[i];
        if (IDMsg == mensagem.id) {


            resposta = mensagem.titulo;
            return resposta;

        }
    }
    return resposta;
}
function achaTextoPorIDs(IDMsg, DBMensagem) {
    let resposta = "erro";
    for (i = 0; i < DBMensagem.mensagens.length; i++) {
        let msg = DBMensagem.mensagens[i];
        if (IDMsg == msg.id) {
            resposta = msg.mensagem;
            return resposta;
        }
    }
    return resposta;
}
function adicionaUsuariosDropdown(objDados) {
    let dropdown = document.getElementById("usuariosDrop");
    let IDAtual = localStorage.getItem("usuarioAtual")
    dropdown.innerHTML = '<option selected disabled value = 0>Selecione para quem a mensagem é:</option>';
    for (i = 0; i < objDados.users.length; i++) {
        if (IDAtual != objDados.users[i].usuario_id) {
            let option = document.createElement('option');
            let text = document.createTextNode(objDados.users[i].nome);
            option.appendChild(text);
            dropdown.appendChild(option);
            option.setAttribute('value', objDados.users[i].usuario_id);
        }
    }
}
function validarMensagem() {
    let drop = document.getElementById('usuariosDrop');
    let titulo = document.getElementById('tituloMensagem');
    let corpo = document.getElementById('corpoMensagem');
    if (drop.options[drop.selectedIndex].value == 0 ||
        titulo.value.length == 0 ||
        corpo.value.length == 0) {
        alert('Pelo menos um dos valores não foi preenchido!');
    } else {
        let pessoaID = drop.options[drop.selectedIndex].value;
        let tituloValor = titulo.value;
        let corpoValor = corpo.value;
        console.log(corpoValor);
        criarMensagem(tituloValor, corpoValor, pessoaID);
        titulo.value = '';
        corpo.value = '';
        alert("Mensagem enviada com sucesso!");
    }
}
function criarMensagem(titulo, corpo, IDDestinatario) {
    let IDUsuario = localStorage.getItem("usuarioAtual");
    let dbMensagens = JSON.parse(localStorage.getItem("dbMensagens"));

    if (!dbMensagens) {
        criardbMensagem(IDUsuario);
    }
    let novaMensagem =
        { de: IDUsuario, para: IDDestinatario, titulo: titulo, mensagem: corpo, id: gerarID() }

    dbMensagens.mensagens.push(novaMensagem);
    salvaDBMensagen(dbMensagens);
}
function criardbMensagem() {
    let parser = localStorage.getItem("db");
    let objDados = JSON.parse(parser);
    let id0 = objDados.users[0].usuario_id;
    let id1 = objDados.users[1].usuario_id;
    let id2 = objDados.users[2].usuario_id;
    let Mensagens = {
        mensagens: [
            { de: id0, para: id1, titulo: "Mensagem Teste-1", mensagem: "Teste corpo da mensagem 1.", id: gerarID() },
            { de: id1, para: id2, titulo: "Mensagem Teste-2", mensagem: "Teste corpo da mensagem 2.", id: gerarID() },
            { de: id2, para: id0, titulo: "Mensagem Teste-3", mensagem: "Teste corpo da mensagem 3.", id: gerarID() }
        ]
    }
    salvaDBMensagen(Mensagens);
}
function salvaDBMensagen(DB) {
    localStorage.setItem("dbMensagens", JSON.stringify(DB));
}
function dropdownMensagens(DBUsuarios, IDAtual) {
    let parser = localStorage.getItem("dbMensagens");
    let dbMensagens = JSON.parse(parser);
    let temMensagem = false;
    for (i = 0; i < dbMensagens.mensagens.length; i++) {
        if (IDAtual == dbMensagens.mensagens[i].para) {
            temMensagem = true;
        }
    }
    if (temMensagem) {
        let desaparecer = document.getElementById("desaparecerDepois");
        desaparecer.setAttribute('hidden', true);
        let aparecer = document.getElementById("aparecerDepois");
        aparecer.removeAttribute("hidden");
        let aparecerMsg = document.getElementById("aparecerDepoisMensagem");
        aparecerMsg.removeAttribute("hidden");
        aparecerDropdownMensagem(DBUsuarios, IDAtual, dbMensagens);
    }
}
function aparecerDropdownMensagem(DBUsuarios, IDAtual, dbMensagens) {
    let dropdown = document.createElement("select");
    dropdown.innerHTML = '<option selected disabled value = 0>Selecione a mensagem à ver:</option>';
    for (i = 0; i < dbMensagens.mensagens.length; i++) {
        if (IDAtual == dbMensagens.mensagens[i].para) {
            let option = document.createElement('option');
            let text = document.createTextNode(dbMensagens.mensagens[i].titulo);
            option.appendChild(text);
            dropdown.appendChild(option);
            option.setAttribute('value', dbMensagens.mensagens[i].id);
        }
    }
    dropdown.addEventListener('change', function () { mostrarMensagem(dropdown, DBUsuarios, dbMensagens) });
    let divAparecer = document.getElementById("aparecerDepois");
    divAparecer.appendChild(dropdown);

}
function mostrarMensagem(dropdown, DBUsuarios, dbMensagens) {
    let indexMsg = dropdown.selectedIndex;
    let idMsg = dropdown.options[indexMsg].value;
    let idDe = achaIDde(idMsg, dbMensagens);
    let mensagens = document.getElementById("aparecerDepoisMensagem");
    mensagens.innerHTML = `
    <h2 class="text-center">Mensagem de: ${achaNomePorId(idDe, DBUsuarios)}</h2>
    <h1 class="text-center">${achaTituloPorIDs(idMsg, dbMensagens)}</h1>
    <p class="text-center">${achaTextoPorIDs(idMsg, dbMensagens)}</p>
 `
}
function achaIDde(idMsg, dbMensagens) {
    for (i = 0; i < dbMensagens.mensagens.length; i++) {
        let msg = dbMensagens.mensagens[i];
        if (idMsg == msg.id) {
            let idDe = msg.de;
            return idDe;
        }
    }
}
window.onload = function () {
    if (!(localStorage.getItem("db") === null)) {
        let parser = localStorage.getItem("db");
        let objDados = JSON.parse(parser);
        let IDUsuario = localStorage.getItem("usuarioAtual");
        let usuarioPermissao = achaUsuarioAtual(IDUsuario, objDados);
        if (!usuarioPermissao) {

            alert("É necessário logar antes!");
            document.location.href = "index.html";

        } else {
            adicionaUsuariosDropdown(objDados);

            let dbMensagens = localStorage.getItem("dbMensagens");
            if (!dbMensagens) {
                criardbMensagem(IDUsuario);
            }
            dropdownMensagens(objDados, IDUsuario);
        }
    } else {
        alert("É necessário logar antes!");
        document.location.href = "index.html";
    }

}