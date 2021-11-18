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
      conteudoColocar.innerHTML = `<div class="caixinha border border-dark input-group my-3"><label for="disciplinaTexto">Disciplina deste conteúdo:</label>
            <input type="text" id="disciplinaTexto" name="disciplinaTexto"></div>
            <div class="caixinha border border-dark input-group my-3"><label for="tituloTexto">Título para seu texto:</label>
            <input type="text" id="tituloTexto" name="tituloTexto"></div>
            <div class="caixinha border border-dark input-group my-3"><label class="d-block" for="corpoTexto">Coloque abaixo o texto principal:</label>
            <textarea type="text" id="corpoTexto" class="d-block" rows="20" cols="45" classname="corpoTexto"></textarea>
            <button onclick="desaparecerColocacaoTexto()">Ok</button></div>`;
      break;
    case "imagem":
      conteudoColocar.innerHTML = `<div class="caixinha border border-dark input-group my-3"><label for="disciplinaImagem">Disciplina deste conteúdo:</label>
            <input type="text" id="disciplinaImagem" name="disciplinaImagem"></div>
            <div class="caixinha border border-dark input-group my-3"><label for="tituloImagem">Título para a imagem:</label>
            <input type="text" id="tituloImagem" name="tituloImagem"></div>
            <div class="caixinha border border-dark input-group my-3"><label for="urlImagem">Insira a URL da imagem:</label>
            <input type="text" id="urlImagem" name="urlImagem"></div>
            <button onclick="desaparecerColocacaoImagem()">Ok</button>`;
      break;
    case "video":
      conteudoColocar.innerHTML = `<div class="caixinha border border-dark input-group my-3"><label for="disciplinaVideo">Disciplina deste conteúdo:</label>
            <input type="text" id="disciplinaVideo" name="disciplinaVideo"></div>
            <div class="caixinha border border-dark input-group my-3"><label for="tituloVideo">Título para o vídeo:</label>
            <input type="text" id="tituloVideo" name="tituloVideo"></div>
            <div class="caixinha border border-dark input-group my-3"><label for="urlVideo">Insira a parte final da URL do vídeo:</label>
            <input type="text" id="urlVideo" name="urlVideo"></div>
            <button onclick="desaparecerColocacaoVideo()">Ok</button>`;
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
  for (i = 1; i < materiais.material.length; i++) {
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
  let index = dropDown.selectedIndex;
  let materiais = JSON.parse(parser);
  let parser2 = localStorage.getItem("usuarioAtual");
  let indexUsuario = JSON.parse(parser2);
  let parser3 = localStorage.getItem("db");
  let objDados = JSON.parse(parser3);
  if (opcao != "3") {
    switch (opcao) {
      case '0':
        let textoHTML = `<div class="caixinha border border-dark my-3 mx-3"><h2 class="text-center">${materiais.material[index].titulo}</h2></div>
            <div class="caixa border border-dark my-3 mx-3"><p class="text-center">${materiais.material[index].url}</p></div>`;
        if (objDados.usuarios[indexUsuario].professor) {
          textoHTML += `<div class="d-flex justify-content-center"><button class="mx-3 my-3"onclick="retirarConteudo(${index})">Retirar Conteúdo</button></div>`;
        }
        conteudoTela.innerHTML = textoHTML;
        break;

      case '1':
        let textoHTML2 = `<div class="caixinha border border-dark my-3 mx-3"><h2 class="text-center">${materiais.material[index].titulo}</h2></div>
            <div class="caixa border border-dark my-3 mx-3"><img class="mx-auto img-fluid" src="${materiais.material[index].url}"></div>`
        if (objDados.usuarios[indexUsuario].professor) {
          textoHTML2 += `<div class="d-flex justify-content-center"><button class="mx-3 my-3" onclick="retirarConteudo(${index})">Retirar Conteúdo</button></div>`;
        }
        conteudoTela.innerHTML = textoHTML2;
        break;

      case '2':
        let name = 'https://www.youtube.com/embed/';
        name += materiais.material[index].url;
        let textoHTML3 = `<div class="caixinha border border-dark my-3 mx-3"><h2 class="text-center">${materiais.material[index].titulo}</h2></div>
            <iframe width="727" height="409" src=${name} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
        if (objDados.usuarios[indexUsuario].professor) {
          textoHTML3 += `<div class="d-flex justify-content-center"><button class="mx-3 my-3"onclick="retirarConteudo(${index})">Retirar Conteúdo</button></div>`;
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
window.onload = function () {
  if (localStorage.getItem("primeiraVezDb") === null) {
    let conteudoDb = { material: [{ disciplina: 'teste', url: 'teste', titulo: 'teste', textoImagemVideo: '3' }] }

    localStorage.setItem("materialTodo", JSON.stringify(conteudoDb));
    localStorage.setItem("primeiraVezDb", true);
  } else {
    adicionarMaterialDropdown();
  }
  if (!(localStorage.getItem("db") === null)) {
    let parser = localStorage.getItem("db");
    let objDados = JSON.parse(parser);
    let parser2 = localStorage.getItem("usuarioAtual");
    let indexUsuario = JSON.parse(parser2);
    if (objDados.usuarios[indexUsuario].professor) {
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
