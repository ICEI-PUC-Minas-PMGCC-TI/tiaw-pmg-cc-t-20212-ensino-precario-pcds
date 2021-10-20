function colocarConteudo() {
    let dropDown = document.getElementById("tipoMaterial");
    let opcao = dropDown.options[dropDown.selectedIndex].value;
    aparecerColocacao(opcao);
}
function aparecerColocacao(opcaoUsuario) {
    let conteudoColocar = document.getElementById("conteudoColocado");
    switch (opcaoUsuario) {
        case "texto":
            conteudoColocar.innerHTML = `<label for="disciplinaTexto">Disciplina deste conteúdo:</label><input type="text" id="disciplinaTexto" name="disciplinaTexto"><label for="tituloTexto">Título para seu texto:</label><input type="text" id="tituloTexto" name="tituloTexto"><label class="d-block" for="corpoTexto">Coloque abaixo o texto principal:</label><textarea type="text" id="corpoTexto" class="d-block" rows="20" cols="45" classname="corpoTexto"></textarea><button onclick="desaparecerColocacaoTexto()">Ok</button>`;
            break;
        case "imagem":
            conteudoColocar.innerHTML = `<label for="disciplinaImagem">Disciplina deste conteúdo:</label><input type="text" id="disciplinaImagem" name="disciplinaImagem"><label for="tituloImagem">Título para a imagem:</label><input type="text" id="tituloImagem" name="tituloImagem"><input type="text" id="urlImagem" name="urlImagem"><label for="urlImagem">Insira a URL da imagem:</label><button onclick="desaparecerColocacaoImagem()">Ok</button>`;
            break;
        case "video":
            conteudoColocar.innerHTML = `<label for="disciplinaVideo">Disciplina deste conteúdo:</label><input type="text" id="disciplinaVideo" name="disciplinaVideo"><label for="tituloVideo">Título para o vídeo:</label><input type="text" id="tituloVideo" name="tituloVideo"><input type="text" id="urlVideo" name="urlVideo"><label for="urlVideo">Insira a parte final da URL do vídeo:</label><button onclick="desaparecerColocacaoVideo()">Ok</button>`;
            break;
    }

}
function desaparecerColocacaoTexto() {
    let conteudoColocar = document.getElementById("conteudoColocado");
    if(document.getElementById('disciplinaTexto').value.length==0 || document.getElementById('tituloTexto').value.length==0 || document.getElementById('corpoTexto').value.length==0 ){
alert('Pelo menos um dos valores não foi preenchido!');
}else{
    adicionarMaterialDb(document.getElementById('disciplinaTexto').value,document.getElementById('corpoTexto').value,document.getElementById('tituloTexto').value,'0');
}

conteudoColocar.innerHTML = "";

}
function desaparecerColocacaoImagem() {
    let conteudoColocar = document.getElementById("conteudoColocado");
    if(document.getElementById('disciplinaImagem').value.length==0 || document.getElementById('tituloImagem').value.length==0 || document.getElementById('urlImagem').value.length==0 ){
        alert('Pelo menos um dos valores não foi preenchido!');
        }else{
            adicionarMaterialDb(document.getElementById('disciplinaImagem').value,document.getElementById('urlImagem').value,document.getElementById('tituloImagem').value,'1');
        }
    conteudoColocar.innerHTML = "";
}
function desaparecerColocacaoVideo() {
    let conteudoColocar = document.getElementById("conteudoColocado");
    if(document.getElementById('disciplinaVideo').value.length==0 || document.getElementById('tituloVideo').value.length==0 || document.getElementById('urlVideo').value.length==0 ){
        alert('Pelo menos um dos valores não foi preenchido!');
        }else{
            adicionarMaterialDb(document.getElementById('disciplinaVideo').value,document.getElementById('urlVideo').value,document.getElementById('tituloVideo').value,'2');
        }
    conteudoColocar.innerHTML = "";
}
function adicionarMaterialDropdown() {
    let dropdown = document.getElementById("conteudoVer");
    let parser = localStorage.getItem("materialTodo");
    let materiais = JSON.parse(parser);
    dropdown.innerHTML ='<option hidden disabled>Selecione o conteúdo a ver:</option>';
    for ( i = 1; i < materiais.material.length; i++) {
        let option = document.createElement('option');
        let text = document.createTextNode(materiais.material[i].titulo);
        option.appendChild(text);
        dropdown.appendChild(option);
        option.setAttribute('value',materiais.material[i].textoImagemVideo)
    }
}
function adicionarMaterialDb(disciplinaAdd,urlTextoAdd,tituloAdd,tipo){
    let parser= localStorage.getItem("materialTodo");
    let materialAntigo = JSON.parse(parser);
    let novoMaterial = {
        disciplina: disciplinaAdd, 
        url: urlTextoAdd , 
        titulo: tituloAdd,
        textoImagemVideo: tipo
    }
    materialAntigo.material.push(novoMaterial);
    localStorage.setItem('materialTodo', JSON.stringify(materialAntigo));
    adicionarMaterialDropdown();
}
function mostrarConteudoTela(){
    let dropDown = document.getElementById("conteudoVer");
    let opcao = dropDown.options[dropDown.selectedIndex].value;
    let conteudoTela =document.getElementById('conteudoPostado');
    let parser = localStorage.getItem("materialTodo");
    let index = dropDown.selectedIndex;
    let materiais = JSON.parse(parser);
    if(opcao != "3"){
        switch(opcao)
        {
            case '0':
            conteudoTela.innerHTML=`<h2>${materiais.material[index].titulo}</h2><p>${materiais.material[index].url}</p>`;
            break;

            case '1':
            conteudoTela.innerHTML=`<h2>${materiais.material[index].titulo}</h2><img src="${materiais.material[index].url}" >`;
            break;

            case '2':
                let name ='https://www.youtube.com/embed/';
                name+=materiais.material[index].url;
            conteudoTela.innerHTML=`<h2>${materiais.material[index].titulo}</h2><iframe width="727" height="409" src=${name} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
            break;
        }
    }
}
window.onload = function () {
    if (localStorage.getItem("primeiraVezDb") === null) {
        let conteudoDb = {material: [{disciplina: 'teste' ,url: 'teste' , titulo: 'teste',textoImagemVideo:'3' }]} 
        localStorage.setItem("materialTodo", JSON.stringify(conteudoDb));
        localStorage.setItem("PrimeiraVezDb", true);
    }
}
document.getElementById("btnConteudo").addEventListener("click", colocarConteudo);
document.getElementById("btnConteudoMostrar").addEventListener("click", mostrarConteudoTela);