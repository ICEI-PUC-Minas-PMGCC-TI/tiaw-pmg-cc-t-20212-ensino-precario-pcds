function colocarConteudo() {
    let dropDown = document.getElementById("tipoMaterial");
    let opcao = dropDown.options[dropDown.selectedIndex].value;
    aparecerColocacao(opcao);
}
function aparecerColocacao(opcaoUsuario) {
    let conteudoNovo = document.getElementById("conteudoColocado");
    switch (opcaoUsuario) {
        case "texto":
            conteudoNovo.innerHTML = `<input type="text" name="tituloTexto"><label for="tituloTexto">Título para seu texto:</label><label class="d-block" for="corpoTexto">Coloque abaixo o texto principal:</label><textarea type="text" class="d-block" rows="20" cols="45" classname="corpoTexto"></textarea><button onclick="desaparecerColocacaoTexto()">Ok</button>`;
            break;
        case "imagem":
            conteudoNovo.innerHTML = `<input type="text" name="urlImagem"><label for="urlImagem">Insira a URL da imagem:</label><button onclick="desaparecerColocacao()">Ok</button>`;
        break;
        case "video":
            conteudoNovo.innerHTML = `<input type="text" name="urlVideo"><label for="urlVideo">Insira a URL embed do vídeo:</label><button onclick="desaparecerColocacao()">Ok</button>`;
        break;
    }

}
function desaparecerColocacao(){
    let conteudoNovo = document.getElementById("conteudoColocado");
    conteudoNovo.innerHTML = "";
}
document.getElementById("btnConteudo").addEventListener("click",colocarConteudo);