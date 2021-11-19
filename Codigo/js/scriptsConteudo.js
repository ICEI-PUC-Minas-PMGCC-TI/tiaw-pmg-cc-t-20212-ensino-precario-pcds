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
        let textoHTML = `<div class="caixinha border border-dark my-3 mx-3"><h2 class="text-center">${materiais.material[index].titulo}</h2></div>
            <div class="caixa border border-dark my-3 mx-3"><p class="text-center">${materiais.material[index].url}</p></div>`;
        if (usuarioPermissao) {
          textoHTML += `<div class="d-flex justify-content-center"><button class="mx-3 my-3"onclick="retirarConteudo(${index})">Retirar Conteúdo</button></div>`;
        }
        conteudoTela.innerHTML = textoHTML;
        break;

      case '1':
        let textoHTML2 = `<div class="caixinha border border-dark my-3 mx-3"><h2 class="text-center">${materiais.material[index].titulo}</h2></div>
            <div class="caixa border border-dark my-3 mx-3"><img class="mx-auto img-fluid" src="${materiais.material[index].url}"></div>`
        if (usuarioPermissao) {
          textoHTML2 += `<div class="d-flex justify-content-center"><button class="mx-3 my-3" onclick="retirarConteudo(${index})">Retirar Conteúdo</button></div>`;
        }
        conteudoTela.innerHTML = textoHTML2;
        break;

      case '2':
        let name = 'https://www.youtube.com/embed/';
        name += materiais.material[index].url;
        let textoHTML3 = `<div class="caixinha border border-dark my-3 mx-3"><h2 class="text-center">${materiais.material[index].titulo}</h2></div>
            <iframe width="727" height="409" src=${name} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
        if (usuarioPermissao) {
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
function achaUsuarioAtual(Id, usuariodb) {
  for (i = 0; i < usuariodb.usuarios.length; i++) {
    let usuario = usuariodb.usuarios[i];
    if (usuario.usuario_id == Id) {
      return usuario.professor;
    }
  }
  return false;//Se caiu aqui,usuario não está logado,e portanto não deve aparecer criar conteúdo
}
function colocaMsgAntigaSidebarDireita() {
  let DBMsg = JSON.parse(localStorage.getItem("dbMensagens"));
  let UsuarioAtual = localStorage.getItem("usuarioAtual");
  let conteudoItem = document.getElementById("mensagemAntiga");
  let conteudoTitulo = document.getElementById("msgAntigaTitulo");
  let temMsg = false;
  for (i = 0; i < DBMsg.mensagens.length; i++) {
    let msg = DBMsg.mensagens[i];
    if (msg.para == UsuarioAtual && !temMsg) {
      conteudoTitulo.innerText = "Mensagem mais antiga:";
      conteudoItem.innerText = msg.titulo;
      temMsg = true;
    }
  }
  if (!temMsg) {
    conteudoTitulo.innerText = "Sem mensagens novas";
    conteudoItem.setAttribute("hidden", true);
  }
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
   {disciplina: 'matematica' , url: 'https://lh3.googleusercontent.com/QBcyETyQ5JHd8f23mldSXuTxIg5XaQyL9eOfT_-1DpxLSz6LoSOIonJf1KJu2ItaDBPJs7lr1jT3NOqBBPlpWgwMK8egxyIrm7dJNEEvnlozx2ZHVQ2HQ2ehXHOCNGNp4CwXYvUUB1zS1Ms3-HMOjRqSXXgfhDCAvWzxXCCGi2fhmM4pO_yaZEZfUxglnsQuHFlsND3bP51HnBnkZsrc3TRqxUHfYAxQ3tX01MTel66Ky_N9BEsOPI3KJMAxJQfY1UyNAUoTT3hO2PWvqXzE0TGy_UZC7mqi_l4MXInUoJx0CHdZptCqrvb94OKJlsOlGmrxlKZUexLOrHk_qK10r3zntPXyz5rdlfOkgcGxq_12aowYLQnrtlX_Tk-98svgiRv0Lz5_tWDV2Vv28g0AbKmNsRWhURDqrnUE6-2pDEXdf8Bd8kY-U4-hRKODy_BlUMkp4jcYsuUU71CjdjBbIhdjQ9diGzT4gRsiWt8aXXt47xhYjW3iCO9Gikuh1g4zg3-TMXVojDWwlAz7t_LRXmcm2cB4JYHfZEJCvC9xm7yniVSoT2IZ9QoyUBXK2xjnqcpEH9HWZJyUh3qCp5e3vjzh8GqD6AhZ4Rk0z8cyTu2k6Hs9fH_H_EuWbIhC17TfGVFtLIFvGQGOvCOz8BLD5lYCpq77FzX4R6WuwOmg1AaQdkJk3y1jhTGIDguLWRT5Fti91IgaNp4nLKLS1u13_rY=w1010-h568-no?authuser=0' , titulo: ' quadro negro' , textoImagemVideo: '1'},
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
    document.getElementById("sidebarDireita").removeAttribute("hidden");
    let dbMensagens = localStorage.getItem("dbMensagens");
    if (!dbMensagens) {
      criardbMensagem(idUsuario);
    }
    colocaMsgAntigaSidebarDireita();
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
