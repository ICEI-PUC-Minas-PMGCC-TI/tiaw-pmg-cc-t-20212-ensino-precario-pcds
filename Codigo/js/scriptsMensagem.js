function achaUsuarioAtual(Id, usuariodb) {
    for (i = 0; i < usuariodb.usuarios.length; i++) {
        let usuario = usuariodb.usuarios[i];
        if (usuario.usuario_id == Id) {
            return true;
        }
    }
    return false;//Se caiu aqui,usuario não está logado,e portanto não deve estar aqui
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
function mandarMensagem(){
    let drop = document.getElementById('usuariosDrop')
    if(drop.options[drop.selectedIndex].value == 0 || 
    document.getElementById('tituloMensagem').value.length==0 || 
    document.getElementById('corpoMensagem').value.length==0 ){
        alert('Pelo menos um dos valores não foi preenchido!');
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

        }else{
            adicionaUsuariosDropdown(objDados);
        }
    } else {
        alert("É necessário logar antes!");
        document.location.href = "index.html";
    }

}