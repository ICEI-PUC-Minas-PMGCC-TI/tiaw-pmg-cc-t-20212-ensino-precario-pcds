function achaUsuarioAtual(Id, usuariodb) {
    for (i = 0; i < usuariodb.usuarios.length; i++) {
        let usuario = usuariodb.usuarios[i];
        if (usuario.usuario_id == Id) {
            return true;
        }
    }
    return false;//Se caiu aqui,usuario não está logado,e portanto não deve estar aqui
}
function achaNomePorId(ID,DB){
    let resposta = "erro";
    for (i = 0; i < DB.usuarios.length; i++) {
        let usuario = usuariodb.usuarios[i];
        if (usuario.usuario_id == ID) {
            resposta = usuario.nome;
            return resposta;
        }
    }
    return resposta;
}
function adicionaUsuariosDropdown(objDados) {
    let dropdown = document.getElementById("usuariosDrop");
    dropdown.innerHTML ='<option selected disabled value = 0>Selecione para quem a mensagem é:</option>';
    for ( i = 0; i < objDados.usuarios.length; i++) {
        let option = document.createElement('option');
        let text = document.createTextNode(objDados.usuarios[i].nome);
        option.appendChild(text);
        dropdown.appendChild(option);
        option.setAttribute('value',objDados.usuarios.usuario_id);
    }
}
function validarMensagem(){
    let drop = document.getElementById('usuariosDrop');
    let titulo = document.getElementById('tituloMensagem');
    let corpo =document.getElementById('corpoMensagem');
    if(drop.options[drop.selectedIndex].value == 0 || 
    titulo.value.length==0 || 
    corpo.value.length==0 ){
        alert('Pelo menos um dos valores não foi preenchido!');
    }else{
        let pessoaID = drop.options[drop.selectedIndex].value;
        criarMensagem(titulo,corpo,pessoaID);
        titulo.value = '';
        corpo.value = '';
    }
}
function criarMensagem(titulo,corpo,IDDestinatario){
    let IDUsuario = localStorage.getItem("usuarioAtual");
    let dbMensagens = JSON.parse(localStorage.getItem("dbMensagens"));
    
    if(!dbMensagens){
        criardbMensagem(IDUsuario);
    }
    let novaMensagem = 
        { de: IDUsuario, para: IDDestinatario, titulo: titulo, mensagem: corpo }
    
        dbMensagens.mensagens.push(novaMensagem);
        salvaDBMensagen(dbMensagens);
}
function criardbMensagem(){
    let parser = localStorage.getItem("db");
    let objDados = JSON.parse(parser);
    let id0 = objDados.usuarios[0].usuario_id;
    let id1 = objDados.usuarios[1].usuario_id;
    let id2 = objDados.usuarios[2].usuario_id;
    let Mensagens = {
        mensagens: [
            { de: id0, para: id1, titulo: "Mensagem Teste-1", mensagem: "Teste corpo da mensagem 1." },
            { de: id1, para: id2, titulo: "Mensagem Teste-2", mensagem: "Teste corpo da mensagem 2." },
            { de: id2, para:id0, titulo: "Mensagem Teste-3", mensagem: "Teste corpo da mensagem 3." }
        ]
    }
    salvaDBMensagen(Mensagens);
}
function salvaDBMensagen(DB){
    localStorage.setItem("dbMensagens",JSON.stringify(DB));
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

        }else{
            adicionaUsuariosDropdown(objDados);
            let dbMensagens = localStorage.getItem("dbMensagens");
            if(!dbMensagens){
                criardbMensagem(IDUsuario);
            }
        }
    } else {
        alert("É necessário logar antes!");
        document.location.href = "index.html";
    }

}