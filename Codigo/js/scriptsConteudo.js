function gerarID() {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  // A função de gerarID pode ser usada para todas as coisas que podem ser cadastradas pelo usuario.
  // exemplo de ID gerado: _a7ny9bdqz
  return '_' + Math.random().toString(36).substr(2, 9);
}

function colocarConteudo() {
  let dropDown = document.getElementById("tipoMaterial");
  let opcao = dropDown.options[dropDown.selectedIndex].value;
  aparecerColocacao(opcao);
}
function aparecerColocacao(opcaoUsuario) {
  let conteudoColocar = document.getElementById("conteudoColocado");
  switch (opcaoUsuario) {
    case "texto":
      conteudoColocar.innerHTML = `<label for="disciplinaTexto">Disciplina deste conteúdo:</label><div class="input-group">
            <input type="text" id="disciplinaTexto" name="disciplinaTexto" class="input form-control"></div>
            <label for="tituloTexto">Título para seu texto:</label>
            <div class="input-group">
            <input type="text" id="tituloTexto" name="tituloTexto" class="input form-control"></div>
            <label class="d-block" for="corpoTexto">Coloque abaixo o texto principal:</label>
            <div class="input-group">
            <textarea type="text" id="corpoTexto" class="input form-control" rows="20" cols="45" classname="corpoTexto"></textarea>
            </div><br>
            <button onclick="desaparecerColocacaoTexto()" class="btn btn-success">Publicar</button><br><br>`;
      break;
    case "imagem":
      conteudoColocar.innerHTML = `
            <label for="disciplinaImagem">Disciplina deste conteúdo:</label><div class="input-group">
            <input type="text" id="disciplinaImagem" name="disciplinaImagem" class="input form-control"></div>
            <label for="tituloImagem">Título para a imagem:</label><div class="input-group">
            <input type="text" id="tituloImagem" name="tituloImagem" class="input form-control"></div>
            <label for="urlImagem">Insira a URL da imagem:</label><div class="input-group">
            <input type="text" id="urlImagem" name="urlImagem" class="input form-control"></div><br>
            <button onclick="desaparecerColocacaoImagem()" class="btn btn-success">Publicar</button><br><br>`;
      break;
    case "video":
      conteudoColocar.innerHTML = `<label for="disciplinaVideo">Disciplina deste conteúdo:</label><div class="input-group">
            <input type="text" id="disciplinaVideo" name="disciplinaVideo" class="input form-control"></div>
            <label for="tituloVideo">Título para o vídeo:</label><div class="input-group">
            <input type="text" id="tituloVideo" name="tituloVideo" class="input form-control"></div>
            <label for="urlVideo">Insira a parte final da URL do vídeo:</label><div class="input-group">
            <input type="text" id="urlVideo" name="urlVideo" class="input form-control"></div><br>
            <button onclick="desaparecerColocacaoVideo()" class="btn btn-success">Publicar</button><br><br>`;
      break;
  }

}
function desaparecerColocacaoTexto() {
  let conteudoColocar = document.getElementById("conteudoColocado");
  if (document.getElementById('disciplinaTexto').value.length == 0 || document.getElementById('tituloTexto').value.length == 0 || document.getElementById('corpoTexto').value.length == 0) {
    alert('Pelo menos um dos valores não foi preenchido!');
  } else {
    adicionarMaterialDb(document.getElementById('disciplinaTexto').value, document.getElementById('corpoTexto').value, document.getElementById('tituloTexto').value, '0');
  }

  conteudoColocar.innerHTML = "";

}
function desaparecerColocacaoImagem() {
  let conteudoColocar = document.getElementById("conteudoColocado");
  if (document.getElementById('disciplinaImagem').value.length == 0 || document.getElementById('tituloImagem').value.length == 0 || document.getElementById('urlImagem').value.length == 0) {
    alert('Pelo menos um dos valores não foi preenchido!');
  } else {
    adicionarMaterialDb(document.getElementById('disciplinaImagem').value, document.getElementById('urlImagem').value, document.getElementById('tituloImagem').value, '1');
  }
  conteudoColocar.innerHTML = "";
}
function desaparecerColocacaoVideo() {
  let conteudoColocar = document.getElementById("conteudoColocado");
  if (document.getElementById('disciplinaVideo').value.length == 0 || document.getElementById('tituloVideo').value.length == 0 || document.getElementById('urlVideo').value.length == 0) {
    alert('Pelo menos um dos valores não foi preenchido!');
  } else {
    adicionarMaterialDb(document.getElementById('disciplinaVideo').value, document.getElementById('urlVideo').value, document.getElementById('tituloVideo').value, '2');
  }
  conteudoColocar.innerHTML = "";
}
function adicionarMaterialDropdown() {
  let dropdown = document.getElementById("conteudoVer");
  let parser = localStorage.getItem("materialTodo");
  let materiais = JSON.parse(parser);
  dropdown.innerHTML = '<option hidden disabled>Selecione o conteúdo a ver:</option>';
  for (i = 0; i < materiais.material.length; i++) {
    let option = document.createElement('option');
    let text = document.createTextNode(materiais.material[i].titulo);
    option.appendChild(text);
    dropdown.appendChild(option);
    option.setAttribute('value', materiais.material[i].textoImagemVideo)
  }
}
function adicionarMaterialDb(disciplinaAdd, urlTextoAdd, tituloAdd, tipo) {
  let parser = localStorage.getItem("materialTodo");
  let materialAntigo = JSON.parse(parser);
  let novoMaterial = {
    disciplina: disciplinaAdd,
    url: urlTextoAdd,
    titulo: tituloAdd,
    textoImagemVideo: tipo
  }
  materialAntigo.material.push(novoMaterial);
  localStorage.setItem('materialTodo', JSON.stringify(materialAntigo));
  adicionarMaterialDropdown();
}
function mostrarConteudoTela() {
  let dropDown = document.getElementById("conteudoVer");
  let opcao = dropDown.options[dropDown.selectedIndex].value;
  let conteudoTela = document.getElementById('conteudoPostado');
  let parser = localStorage.getItem("materialTodo");
  let index = dropDown.selectedIndex - 1;
  let materiais = JSON.parse(parser);
  let IDUsuario = localStorage.getItem("usuarioAtual");
  let parser3 = localStorage.getItem("db");
  let objDados = JSON.parse(parser3);
  let usuarioPermissao = achaUsuarioAtual(IDUsuario, objDados);
  if (opcao != "3") {
    switch (opcao) {
      case '0':
        let textoHTML = `<div class="my-3 mx-3"><h2 class="text-center">${materiais.material[index].titulo}</h2></div>
            <div class="my-3 mx-3"><p class="text-center">${materiais.material[index].url}</p></div>`;
        if (usuarioPermissao) {
          textoHTML += `<div class="d-flex justify-content-center"><button class="mx-3 my-3 btn btn-danger"onclick="retirarConteudo(${index})">Retirar Conteúdo</button></div><br><br>`;
        }
        conteudoTela.innerHTML = textoHTML;
        break;

      case '1':
        let textoHTML2 = `<div class="my-3 mx-3"><h2 class="text-center">${materiais.material[index].titulo}</h2></div>
            <div class="my-3 mx-3"><img class="mx-auto img-fluid" src="${materiais.material[index].url}"></div>`
        if (usuarioPermissao) {
          textoHTML2 += `<div class="d-flex justify-content-center"><button class="mx-3 my-3 btn btn-danger" onclick="retirarConteudo(${index})">Retirar Conteúdo</button></div><br><br>`;
        }
        conteudoTela.innerHTML = textoHTML2;
        break;

      case '2':
        let name = 'https://www.youtube.com/embed/';
        name += materiais.material[index].url;
        let textoHTML3 = `<div class="my-3 mx-3"><h2 class="text-center">${materiais.material[index].titulo}</h2></div>
            <iframe width="250" height="200" src=${name} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
        if (usuarioPermissao) {
          textoHTML3 += `<div class="d-flex justify-content-center"><button class="mx-3 my-3 btn btn-danger" onclick="retirarConteudo(${index})">Retirar Conteúdo</button></div><br><br>`;
        }
        conteudoTela.innerHTML = textoHTML3;
        break;
    }

  }
}

function retirarConteudo(index) {
  let conteudoTela = document.getElementById('conteudoPostado');
  conteudoTela.innerHTML = '';
  let parser = localStorage.getItem("materialTodo");
  let materiais = JSON.parse(parser);
  materiais.material.splice(index, 1);
  localStorage.setItem('materialTodo', JSON.stringify(materiais));
  adicionarMaterialDropdown();
}
function achaUsuarioAtual(Id, usuariodb) {
  for (i = 0; i < usuariodb.usuarios.length; i++) {
    let usuario = usuariodb.usuarios[i];
    if (usuario.usuario_id == Id) {
      return usuario.professor;
    }
  }
  return false;//Se caiu aqui,usuario não está logado,e portanto não deve aparecer criar conteúdo
}
function criardbMensagem() {
  let parser = localStorage.getItem("db");
  let objDados = JSON.parse(parser);
  let id0 = objDados.usuarios[0].usuario_id;
  let id1 = objDados.usuarios[1].usuario_id;
  let id2 = objDados.usuarios[2].usuario_id;
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
window.onload = function () {
  if (localStorage.getItem("primeiraVezDb") === null) {
    let conteudoDb = { material: [{ disciplina: 'Geografia', url: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nec neque ac nisl aliquam viverra.', titulo: 'loren y', textoImagemVideo: '0' },
   {disciplina: 'matematica' , url: 'img/mate-a-matica.jpg' , titulo: ' quadro negro' , textoImagemVideo: '1'},
   {disciplina: 'historia' , url: 'CTIs_RSPr84' , titulo: ' idade media' , textoImagemVideo: '2'}]}

    localStorage.setItem("materialTodo", JSON.stringify(conteudoDb));
    localStorage.setItem("primeiraVezDb", true);
  }  
    adicionarMaterialDropdown();
  
  if (!(localStorage.getItem("db") === null)) {
    let parser = localStorage.getItem("db");
    let objDados = JSON.parse(parser);
    let idUsuario = localStorage.getItem("usuarioAtual");
    let eProfessor = achaUsuarioAtual(idUsuario, objDados);
    let dbMensagens = localStorage.getItem("dbMensagens");
    if (!dbMensagens) {
      criardbMensagem(idUsuario);
    }
    if (eProfessor) {
      document.getElementById("btnConteudo").addEventListener("click", colocarConteudo);

    } else {
      document.getElementById('professorApenas').innerHTML = '';
    }
  } else {
    document.getElementById('professorApenas').innerHTML = '';
  }
  if (localStorage.getItem("primeiraVezDb") == true) {

  }
}
document.getElementById("btnConteudoMostrar").addEventListener("click", mostrarConteudoTela);