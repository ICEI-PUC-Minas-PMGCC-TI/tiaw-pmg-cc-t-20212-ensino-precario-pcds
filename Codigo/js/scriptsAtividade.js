function gerarID() {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  // A função de gerarID pode ser usada para todas as coisas que podem ser cadastradas pelo usuario.
  // exemplo de ID gerado: _a7ny9bdqz
  return '_' + Math.random().toString(36).substr(2, 9);
}
function adicionarAtividadeDb() {
  if (localStorage.getItem("atividadesTodas")) {
    var parser = localStorage.getItem("atividadesTodas");
    var atividadeAntiga = JSON.parse(parser);
  } else {
    var conteudoAtividadeInicial = {
      atividade: [{
        atividade_id: gerarID(),
        disciplina: "Matemática",
        materia: "Divisão",
        titulo: "Introdução à divisão",
        enunciado: "Quanto é 2/2?",
        opcoes: {
          resposta: "1",
          opcao1: "4",
          opcao2: "2",
          opcao3: "3",
        }
      }]
    }
    localStorage.setItem("atividadesTodas", JSON.stringify(conteudoAtividadeInicial));

    var parser = localStorage.getItem("atividadesTodas");
    var atividadeAntiga = JSON.parse(parser);
  }

  let disciplinaAdd = document.getElementById('disciplinaQuestao');
  let materiaAdd = document.getElementById('materiaQuestao');
  let tituloAdd = document.getElementById('tituloQuestao');
  let respostaCerta;
  let respostaErrada1;
  let respostaErrada2;
  let respostaErrada3;
  let enunciadoAdd = document.getElementById('enunciadoQuestao');
  let opcaoA = document.getElementById('respostaOpcaoA').checked;
  let opcaoB = document.getElementById('respostaOpcaoB').checked;
  let opcaoC = document.getElementById('respostaOpcaoC').checked;
  let opcaoD = document.getElementById('respostaOpcaoD').checked;
  if (opcaoA) {
    respostaCerta = document.getElementById('respostaOpcaoInputA');
    respostaErrada1 = document.getElementById('respostaOpcaoInputB');
    respostaErrada2 = document.getElementById('respostaOpcaoInputC');
    respostaErrada3 = document.getElementById('respostaOpcaoInputD');
  } else {
    if (opcaoB) {
      respostaCerta = document.getElementById('respostaOpcaoInputB');
      respostaErrada1 = document.getElementById('respostaOpcaoInputA');
      respostaErrada2 = document.getElementById('respostaOpcaoInputC');
      respostaErrada3 = document.getElementById('respostaOpcaoInputD');
    } else {
      if (opcaoC) {
        respostaCerta = document.getElementById('respostaOpcaoInputC');
        respostaErrada1 = document.getElementById('respostaOpcaoInputA');
        respostaErrada2 = document.getElementById('respostaOpcaoInputB');
        respostaErrada3 = document.getElementById('respostaOpcaoInputD');
      } else {
        if (opcaoD) {
          respostaCerta = document.getElementById('respostaOpcaoInputD');
          respostaErrada1 = document.getElementById('respostaOpcaoInputA');
          respostaErrada2 = document.getElementById('respostaOpcaoInputB');
          respostaErrada3 = document.getElementById('respostaOpcaoInputC');
        } else {
          alert("Algo deu errado!");
        }
      }
    }
  }
  let novaAtividade = {
    atividade_id: gerarID(),
    disciplina: disciplinaAdd.value,
    materia: materiaAdd.value,
    titulo: tituloAdd.value,
    enunciado: enunciadoAdd.value,
    opcoes: {
      resposta: respostaCerta.value,
      opcao1: respostaErrada1.value,
      opcao2: respostaErrada2.value,
      opcao3: respostaErrada3.value,
    }
  }
  atividadeAntiga.atividade.push(novaAtividade);
  localStorage.setItem('atividadesTodas', JSON.stringify(atividadeAntiga));
  adicionarAtividadeDropdown();

  disciplinaAdd.value = '';
  materiaAdd.value = '';
  tituloAdd.value = '';
  enunciadoAdd.value = '';
  respostaCerta.value = '';
  respostaErrada1.value = '';
  respostaErrada2.value = '';
  respostaErrada3.value = '';

}
function aparecerCriarAtividade() {
  let atividade = document.getElementById('aparecerCriarAtividadeDiv');
  atividade.innerHTML = `
<div class="col-12 col-md-12 col-lg-12 col-sm-12">
      <div>
        <label for="disciplinaQuestao">Disciplina:</label>
        <input type="text" id="disciplinaQuestao" class="form-control input">
      </div>
      <div>
        <label for="materiaQuestao">Matéria:</label>
        <input type="text" id="materiaQuestao" class="form-control input">
      </div>
      <div>
        <label for="enunciadoQuestao">Enunciado:</label>
        <textarea name="enunciado" id="enunciadoQuestao" cols="70" rows="15" class="form-control input"></textarea>
      </div>
      <div>
        <label for="tituloQuestao">Título:</label>
        <input type="text" id="tituloQuestao" class="form-control input">
      </div>
      
      <h3>Marque a opção que for a resposta correta.</h3>
      <div class="input-group">
        <label for="respostaOpcaoA">A: </label>
        <div class="input-group-prepend">
          <div class="input-group-text">
            <input type="radio" aria-label="Radio button for following text input" name="resposta" id="respostaOpcaoA">
          </div>
        </div>
        <input type="text" class="form-control" aria-label="Text input with radio button" id="respostaOpcaoInputA">
      </div>
      
      <div class="input-group">
        <label for="respostaOpcaoB">B: </label>
        <div class="input-group-prepend">
          <div class="input-group-text">
            <input type="radio" aria-label="Radio button for following text input" name="resposta" id="respostaOpcaoB" >
          </div>
        </div>
        <input type="text" class="form-control" aria-label="Text input with radio button" id="respostaOpcaoInputB">
      </div>
      
      <div class="input-group">
        <label for="respostaOpcaoC">C: </label>
        <div class="input-group-prepend">
          <div class="input-group-text">
            <input type="radio" aria-label="Radio button for following text input" name="resposta" id="respostaOpcaoC">
          </div>
        </div>
        <input type="text" class="form-control" aria-label="Text input with radio button" id="respostaOpcaoInputC">
      </div>
      
      <div class="input-group">
        <label for="respostaOpcaoD">D: </label>
        <div class="input-group-prepend">
          <div class="input-group-text">
            <input type="radio" aria-label="Radio button for following text input" name="resposta" id="respostaOpcaoD">
          </div>
        </div>
        <input type="text" class="form-control" aria-label="Text input with radio button" id="respostaOpcaoInputD">
      </div>
      <button id="btnPostarAtividade" class="btn btn-success">Publicar</button>
    </div>

`;
  let botaoApagar = document.getElementById("btnApagarCriarAtividade");
  botaoApagar.style.display = "inline";
  document.getElementById("btnPostarAtividade").addEventListener("click", adicionarAtividadeDb);
}
function getRandomInt(min, max) { // intervalo fechado para o minimo e aberto para o maximo
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
window.onload = function () {
  let botaoApagarVisualizacao = document.getElementById('btnApagarVisualizacaoAtividade');
  let botaoApagarCriar = document.getElementById('btnApagarCriarAtividade');
  botaoApagarCriar.style.display = "none";

  if (localStorage.getItem("primeiraVezDb")) {
    var conteudoDb = {
      atividade: [{
        atividade_id: gerarID(),
        disciplina: "Matemática",
        materia: "Soma",
        titulo: "Introdução à soma",
        enunciado: "Quanto é 2 + 2?",
        opcoes: {
          resposta: "4",
          opcao1: "1",
          opcao2: "2",
          opcao3: "3",
        }
      }]
    }
    localStorage.setItem("atividadesIniciais", JSON.stringify(conteudoDb));
    localStorage.setItem("primeiraVezDb", true);
  }

  if (!(localStorage.getItem("db") === null)) {
    let parser = localStorage.getItem("db");
    let objDados = JSON.parse(parser);
    let parser2 = localStorage.getItem("usuarioAtual");
    let indexUsuario = JSON.parse(parser2);
    if (objDados.usuarios[indexUsuario].professor) {
      document.getElementById("btnCriarAtividade").addEventListener("click", aparecerCriarAtividade);

    } else {
      document.getElementById('btnCriarAtividade').style.display = 'none';
    }
  } else {
    document.getElementById('btnCriarAtividade').style.display = 'none';
  }
  adicionarAtividadeDropdown();
  botaoApagarVisualizacao.style.display = "none";
}

function adicionarAtividadeDropdown() {
  let dropdown = document.getElementById("qualAtividade");
  let parser1 = localStorage.getItem("atividadesIniciais");
  let parser2 = localStorage.getItem("atividadesTodas");
  let atividades1 = JSON.parse(parser1);
  let atividades2 = JSON.parse(parser2);
  var count = atividades1.atividade.length;
  var countFor2 = 0;
  dropdown.innerHTML = '<option hidden disabled>Selecione o conteúdo a ver:</option>';
  for (i = 1; i < atividades1.atividade.length; i++) {
    let option = document.createElement('option');
    let text = document.createTextNode(atividades1.atividade[i].titulo);
    option.appendChild(text);
    dropdown.appendChild(option);
    option.setAttribute('value', atividades1.atividade[i].disciplina);

  }
  for (i = count; i < atividades2.atividade.length + count; i++) {
    let option = document.createElement('option');
    let text = document.createTextNode(atividades2.atividade[countFor2].titulo);
    option.appendChild(text);
    dropdown.appendChild(option);
    option.setAttribute('value', atividades2.atividade[countFor2].disciplina);
    countFor2 += 1;
  }
}

function mostrarAtividadeTela() {
  let botaoApagar = document.getElementById("btnApagarVisualizacaoAtividade");
  let dropDown = document.getElementById("qualAtividade");
  let conteudoTela = document.getElementById('aparecerAtividadeDiv');
  let parser1 = localStorage.getItem("atividadesIniciais");
  let index = dropDown.selectedIndex;
  let atividades1 = JSON.parse(parser1);
  let parser2 = localStorage.getItem("atividadesTodas");
  let atividades2 = JSON.parse(parser2);
  var valor = atividades1.atividade.length;
  let expr = getRandomInt(1, 5);
  if (index < valor) {
    let textoHTML1 = `<div>
    <div id="disciplinaMostrarAtividade"><h2>${atividades1.atividade[index].disciplina}</h2></div>
    <div id="tituloMostrarAtividade">${atividades1.atividade[index].titulo}</div>
    <div id="enunciadoMostrarAtividade">${atividades1.atividade[index].enunciado}</div>
    <div id="opcao1MostrarAtividade" class="btn btn-success">A   ${atividades1.atividade[index].opcoes.opcao1}</div>
    <div id="opcao2MostrarAtividade">B   ${atividades1.atividade[index].opcoes.opcao2}</div>
    <div id="opcao3MostrarAtividade">C   ${atividades1.atividade[index].opcoes.opcao3}</div>
    <div id="opcao4MostrarAtividade">D   ${atividades1.atividade[index].opcoes.resposta}</div>
    </div>`;
    let textoHTML2 = `<div>
    <div id="disciplinaMostrarAtividade"><h2>${atividades1.atividade[index].disciplina}</h2></div>
    <div id="tituloMostrarAtividade">${atividades1.atividade[index].titulo}</div>
    <div id="enunciadoMostrarAtividade">${atividades1.atividade[index].enunciado}</div>
    <div id="opcao1MostrarAtividade" class="btn btn-success">A   ${atividades1.atividade[index].opcoes.opcao1}</div>
    <div id="opcao2MostrarAtividade">B   ${atividades1.atividade[index].opcoes.opcao2}</div>
    <div id="opcao3MostrarAtividade">C   ${atividades1.atividade[index].opcoes.resposta}</div>
    <div id="opcao4MostrarAtividade">D   ${atividades1.atividade[index].opcoes.opcao3}</div>
    </div>`;
    let textoHTML3 = `<div>
    <div id="disciplinaMostrarAtividade"><h2>${atividades1.atividade[index].disciplina}</h2></div>
    <div id="tituloMostrarAtividade">${atividades1.atividade[index].titulo}</div>
    <div id="enunciadoMostrarAtividade">${atividades1.atividade[index].enunciado}</div>
    <div id="opcao1MostrarAtividade" class="btn btn-success">A   ${atividades1.atividade[index].opcoes.opcao1}</div>
    <div id="opcao2MostrarAtividade">B   ${atividades1.atividade[index].opcoes.resposta}</div>
    <div id="opcao3MostrarAtividade">C   ${atividades1.atividade[index].opcoes.opcao2}</div>
    <div id="opcao4MostrarAtividade">D   ${atividades1.atividade[index].opcoes.opcao3}</div>
    </div>`;
    let textoHTML4 = `<div>
    <div id="disciplinaMostrarAtividade"><h2>${atividades1.atividade[index].disciplina}</h2></div>
    <div id="tituloMostrarAtividade">${atividades1.atividade[index].titulo}</div>
    <div id="enunciadoMostrarAtividade">${atividades1.atividade[index].enunciado}</div>
    <div id="opcao1MostrarAtividade" class="btn btn-success">A   ${atividades1.atividade[index].opcoes.resposta}</div>
    <div id="opcao2MostrarAtividade">B   ${atividades1.atividade[index].opcoes.opcao1}</div>
    <div id="opcao3MostrarAtividade">C   ${atividades1.atividade[index].opcoes.opcao2}</div>
    <div id="opcao4MostrarAtividade">D   ${atividades1.atividade[index].opcoes.opcao3}</div>
    </div>`;

    switch (expr) {
      case 1:
        conteudoTela.innerHTML = textoHTML1;
        break;
      case 2:
        conteudoTela.innerHTML = textoHTML2;
        break;
      case 3:
        conteudoTela.innerHTML = textoHTML3;
        break;
      case 4:
        conteudoTela.innerHTML = textoHTML4;
        break;
    }

  } else {
    if (index >= valor) {
      let textoHTML1 = `<div class="divQuestao center">
      <div id="disciplinaMostrarAtividade"><h2>${atividades2.atividade[index - valor].disciplina}</h2></div>
      <div id="tituloMostrarAtividade">${atividades2.atividade[index - valor].titulo}</div>
      <div id="enunciadoMostrarAtividade">${atividades2.atividade[index - valor].enunciado}</div>
      <div id="opcao1MostrarAtividade" value="${atividades2.atividade[index - valor].opcoes.opcao1}">A   <div class="btn btn-light opcao">${atividades2.atividade[index - valor].opcoes.opcao1}</div></div>
      <div id="opcao2MostrarAtividade" value="${atividades2.atividade[index - valor].opcoes.opcao2}">B   <div class="btn btn-light opcao">${atividades2.atividade[index - valor].opcoes.opcao2}</div></div>
      <div id="opcao3MostrarAtividade" value="${atividades2.atividade[index - valor].opcoes.opcao3}">C   <div class="btn btn-light opcao">${atividades2.atividade[index - valor].opcoes.opcao3}</div></div>
      <div id="opcao4MostrarAtividade" value="${atividades2.atividade[index - valor].opcoes.resposta}">D   <div class="btn btn-light opcao">${atividades2.atividade[index - valor].opcoes.resposta}</div></div>
      </div><span id="validaRespostaSpan" class="spanResposta"></span>`;

      let textoHTML2 = `<div class="divQuestao center">
      <div id="disciplinaMostrarAtividade"><h2>${atividades2.atividade[index - valor].disciplina}</h2></div>
      <div id="tituloMostrarAtividade">${atividades2.atividade[index - valor].titulo}</div>
      <div id="enunciadoMostrarAtividade">${atividades2.atividade[index - valor].enunciado}</div>
      <div id="opcao1MostrarAtividade" value="${atividades2.atividade[index - valor].opcoes.opcao1}">A   <div class="btn btn-light opcao">${atividades2.atividade[index - valor].opcoes.opcao1}</div></div>
      <div id="opcao2MostrarAtividade" value="${atividades2.atividade[index - valor].opcoes.opcao2}">B   <div class="btn btn-light opcao">${atividades2.atividade[index - valor].opcoes.opcao2}</div></div>
      <div id="opcao3MostrarAtividade" value="${atividades2.atividade[index - valor].opcoes.resposta}">C   <div class="btn btn-light opcao">${atividades2.atividade[index - valor].opcoes.resposta}</div></div>
      <div id="opcao4MostrarAtividade" value="${atividades2.atividade[index - valor].opcoes.opcao3}">D   <div class="btn btn-light opcao">${atividades2.atividade[index - valor].opcoes.opcao3}</div></div>
      </div><span id="validaRespostaSpan" class="spanResposta"></span>`;
      let textoHTML3 = `<div class="divQuestao center">
      <div id="disciplinaMostrarAtividade"><h2>${atividades2.atividade[index - valor].disciplina}</h2></div>
      <div id="tituloMostrarAtividade">${atividades2.atividade[index - valor].titulo}</div>
      <div id="enunciadoMostrarAtividade">${atividades2.atividade[index - valor].enunciado}</div>
      <div id="opcao1MostrarAtividade" value="${atividades2.atividade[index - valor].opcoes.opcao1}">A   <div class="btn btn-light opcao">${atividades2.atividade[index - valor].opcoes.opcao1}</div></div>
      <div id="opcao2MostrarAtividade" value="${atividades2.atividade[index - valor].opcoes.resposta}">B   <div class="btn btn-light opcao">${atividades2.atividade[index - valor].opcoes.resposta}</div></div>
      <div id="opcao3MostrarAtividade" value="${atividades2.atividade[index - valor].opcoes.opcao2}">C   <div class="btn btn-light opcao">${atividades2.atividade[index - valor].opcoes.opcao2}</div></div>
      <div id="opcao4MostrarAtividade" value="${atividades2.atividade[index - valor].opcoes.opcao3}">D   <div class="btn btn-light opcao">${atividades2.atividade[index - valor].opcoes.opcao3}</div></div>
      </div><span id="validaRespostaSpan" class="spanResposta"></span>`;
      let textoHTML4 = `<div class="divQuestao center">
      <div id="disciplinaMostrarAtividade"><h2>${atividades2.atividade[index - valor].disciplina}</h2></div>
      <div id="tituloMostrarAtividade">${atividades2.atividade[index - valor].titulo}</div>
      <div id="enunciadoMostrarAtividade">${atividades2.atividade[index - valor].enunciado}</div>
      <div id="opcao1MostrarAtividade" value="${atividades2.atividade[index - valor].opcoes.resposta}">A   <div class="btn btn-light opcao">${atividades2.atividade[index - valor].opcoes.resposta}</div></div>
      <div id="opcao2MostrarAtividade" value="${atividades2.atividade[index - valor].opcoes.opcao1}">B   <div class="btn btn-light opcao">${atividades2.atividade[index - valor].opcoes.opcao1}</div></div>
      <div id="opcao3MostrarAtividade" value="${atividades2.atividade[index - valor].opcoes.opcao2}">C   <div class="btn btn-light opcao">${atividades2.atividade[index - valor].opcoes.opcao2}</div></div>
      <div id="opcao4MostrarAtividade" value="${atividades2.atividade[index - valor].opcoes.opcao3}">D   <div class="btn btn-light opcao">${atividades2.atividade[index - valor].opcoes.opcao3}</div></div>
      </div><span id="validaRespostaSpan" class="spanResposta"></span>`;

      switch (expr) {
        case 1:
          conteudoTela.innerHTML = textoHTML1;
          var value1 = atividades2.atividade[index - valor].opcoes.opcao1;
          var value2 = atividades2.atividade[index - valor].opcoes.opcao2;
          var value3 = atividades2.atividade[index - valor].opcoes.opcao3;
          var value4 = atividades2.atividade[index - valor].opcoes.resposta;
          break;
        case 2:
          conteudoTela.innerHTML = textoHTML2;
          var value1 = atividades2.atividade[index - valor].opcoes.opcao1;
          var value2 = atividades2.atividade[index - valor].opcoes.opcao2;
          var value3 = atividades2.atividade[index - valor].opcoes.resposta;
          var value4 = atividades2.atividade[index - valor].opcoes.opcao3;
          break;
        case 3:
          conteudoTela.innerHTML = textoHTML3;
          var value1 = atividades2.atividade[index - valor].opcoes.opcao1;
          var value2 = atividades2.atividade[index - valor].opcoes.resposta;
          var value3 = atividades2.atividade[index - valor].opcoes.opcao2;
          var value4 = atividades2.atividade[index - valor].opcoes.opcao3;
          break;
        case 4:
          conteudoTela.innerHTML = textoHTML4;
          var value1 = atividades2.atividade[index - valor].opcoes.resposta;
          var value2 = atividades2.atividade[index - valor].opcoes.opcao1;
          var value3 = atividades2.atividade[index - valor].opcoes.opcao2;
          var value4 = atividades2.atividade[index - valor].opcoes.opcao3;
          break;
        default:
          alert("Algo deu errado.");
          break;
      }

    }
    botaoApagar.style.display = "inline";
  }
  opcao1MostrarAtividade.onclick = function () {
    validarResposta(value1);
  }
  opcao2MostrarAtividade.onclick = function () {
    validarResposta(value2);
  }
  opcao3MostrarAtividade.onclick = function () {
    validarResposta(value3);
  }
  opcao4MostrarAtividade.onclick = function () {
    validarResposta(value4);
  }

}

function validarResposta(opcao) {
  let dropDown = document.getElementById("qualAtividade");
  let parser = localStorage.getItem("atividadesTodas");
  let atividades = JSON.parse(parser);
  let index = dropDown.selectedIndex;
  let spanResposta = document.getElementById("validaRespostaSpan");

  if (opcao == atividades.atividade[index - 1].opcoes.resposta) {
    spanResposta.innerHTML = "Resposta certa :)";
    spanResposta.style.color = "#23CC00"
  } else {
    spanResposta.innerHTML = "Resposta errada :(";
    spanResposta.style.color = "#c00221"
  }

}
function apagarConteudoTela() {
  let conteudoTela = document.getElementById('aparecerAtividadeDiv');
  let botaoApagar = document.getElementById('btnApagarVisualizacaoAtividade');
  conteudoTela.innerHTML = "";
  botaoApagar.style.display = "none";
}
function apagarCriarAtividade() {
  let conteudoTela = document.getElementById('aparecerCriarAtividadeDiv');
  let botaoApagar = document.getElementById('btnApagarCriarAtividade');
  conteudoTela.innerHTML = "";
  botaoApagar.style.display = "none";
}
document.getElementById("btnVisualizarAtividade").addEventListener("click", mostrarAtividadeTela);
document.getElementById("btnApagarVisualizacaoAtividade").addEventListener("click", apagarConteudoTela);
document.getElementById("btnApagarCriarAtividade").addEventListener("click", apagarCriarAtividade);


