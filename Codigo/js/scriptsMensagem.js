function achaUsuarioAtual(Id, usuariodb) {
    for (i = 0; i < usuariodb.usuarios.length; i++) {
        let usuario = usuariodb.usuarios[i];
        if (usuario.usuario_id == Id) {
            return true;
        }
    }
    return false;//Se caiu aqui,usuario não está logado,e portanto não deve estar aqui
}
function achaNomePorId(ID, DB) {
    let resposta = "erro";
    for (i = 0; i < DB.usuarios.length; i++) {
        let usuario = DB.usuarios[i];
        if (usuario.usuario_id == ID) {
            resposta = usuario.nome;
            return resposta;
        }
    }
    return resposta;
}
function achaTituloPorIDs(IDMsg, DBMensagem) {
    let resposta = "erro";
    for (i = 1; i <= DBMensagem.mensagens.length; i++) {
        let mensagem = DBMensagem.mensagens[i];
        if (i == IDMsg) {
            resposta = mensagem.titulo;
            return resposta;
        }
    }
    return resposta;
}
function achaTextoPorIDs(IDMsg, DBMensagem) {
    let resposta = "erro";
    for (i = 1; i <= DBMensagem.mensagens.length; i++) {
        let msg = DBMensagem.mensagens[i];
        if (i == IDMsg) {
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
    for (i = 0; i < objDados.usuarios.length; i++) {
        if (IDAtual != objDados.usuarios[i].usuario_id) {
            let option = document.createElement('option');
            let text = document.createTextNode(objDados.usuarios[i].nome);
            option.appendChild(text);
            dropdown.appendChild(option);
            option.setAttribute('value',objDados.usuarios[i].usuario_id );
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
    }
}
function criarMensagem(titulo, corpo, IDDestinatario) {
    let IDUsuario = localStorage.getItem("usuarioAtual");
    let dbMensagens = JSON.parse(localStorage.getItem("dbMensagens"));

    if (!dbMensagens) {
        criardbMensagem(IDUsuario);
    }
    let novaMensagem =
        { de: IDUsuario, para: IDDestinatario, titulo: titulo, mensagem: corpo }

    dbMensagens.mensagens.push(novaMensagem);
    salvaDBMensagen(dbMensagens);
}
function criardbMensagem() {
    let parser = localStorage.getItem("db");
    let objDados = JSON.parse(parser);
    let id0 = objDados.usuarios[0].usuario_id;
    let id1 = objDados.usuarios[1].usuario_id;
    let id2 = objDados.usuarios[2].usuario_id;
    let Mensagens = {
        mensagens: [
            { de: id0, para: id1, titulo: "Mensagem Teste-1", mensagem: "Teste corpo da mensagem 1." },
            { de: id1, para: id2, titulo: "Mensagem Teste-2", mensagem: "Teste corpo da mensagem 2." },
            { de: id2, para: id0, titulo: "Mensagem Teste-3", mensagem: "Teste corpo da mensagem 3." }
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
            option.setAttribute('value', dbMensagens.mensagens[i].de);
        }
    }
    dropdown.addEventListener('change', function () { mostrarMensagem(dropdown, DBUsuarios, IDAtual, dbMensagens) });
    let divAparecer = document.getElementById("aparecerDepois");
    divAparecer.appendChild(dropdown);

}
function mostrarMensagem(dropdown, DBUsuarios, IDAtual, dbMensagens) {
    let indexMsg = dropdown.selectedIndex;
    let idDe = dropdown.options[indexMsg].value;
    let mensagens = document.getElementById("aparecerDepoisMensagem");
    mensagens.innerHTML = `
    <h2 class="text-center border border-dark caixinha my-2">Mensagem de: ${achaNomePorId(idDe, DBUsuarios)}</h2>
    <h1 class="text-center border border-dark caixinha my-2">${achaTituloPorIDs(indexMsg, dbMensagens)}</h1>
    <p class="text-center border border-dark caixinha my-3">${achaTextoPorIDs(indexMsg, dbMensagens)}</p>
 `
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