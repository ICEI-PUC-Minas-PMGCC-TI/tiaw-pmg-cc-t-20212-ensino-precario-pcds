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
  if (document.getElementById("btnApagarVisualizacaoAtividade")) {
    let botaoApagarVisualizar = document.getElementById("btnApagarVisualizacaoAtividade");
    botaoApagarVisualizar.style.display = 'none';
  }
  if (document.getElementById('mostrarAtividade')) {
    let visualizarAtividade = document.getElementById('mostrarAtividade');
    visualizarAtividade.style.display = 'none';
  }
  atividade.innerHTML = `
<div class="col-12 col-md-12 col-lg-12 col-sm-12" id="mostrarCriarAtividade">
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

  btnPostarAtividade.onclick = function testarValidaAtividade(){
  let opcaoA = document.getElementById('respostaOpcaoA').checked;
  let opcaoB = document.getElementById('respostaOpcaoB').checked;
  let opcaoC = document.getElementById('respostaOpcaoC').checked;
  let opcaoD = document.getElementById('respostaOpcaoD').checked; 
  if (disciplinaQuestao.value.length == 0 || materiaQuestao.value.length == 0 || enunciadoQuestao.value.length == 0 ||
    respostaOpcaoInputA.value.length == 0 || respostaOpcaoInputB.value.length == 0 || respostaOpcaoInputC.value.length == 0 ||
    respostaOpcaoInputD.value.length == 0) {
      
    alert("Pelo menos um dos campos estão em branco.");
  } else {
    if(opcaoA || opcaoB || opcaoC || opcaoD){
      adicionarAtividadeDb();
    }else{
      alert("É preciso marcar uma opção de resposta certa.");
    }
  }
  }
  
  


}
function testarValidaAtividade(){
  let opcaoA = document.getElementById('respostaOpcaoA').checked;
  let opcaoB = document.getElementById('respostaOpcaoB').checked;
  let opcaoC = document.getElementById('respostaOpcaoC').checked;
  let opcaoD = document.getElementById('respostaOpcaoD').checked; 
  if (disciplinaQuestao.value.length == 0 || materiaQuestao.value.length == 0 || enunciadoQuestao.value.length == 0 ||
    respostaOpcaoInputA.value.length == 0 || respostaOpcaoInputB.value.length == 0 || respostaOpcaoInputC.value.length == 0 ||
    respostaOpcaoInputD.value.length == 0) {
      
    alert("Pelo menos um dos campos estão em branco.");
  } else {
    if(opcaoA || opcaoB || opcaoC || opcaoD){
      document.getElementById("btnPostarAtividade").addEventListener("click", adicionarAtividadeDb);
    }else{
      alert("É preciso marcar uma opção de resposta certa.");
    }
    
  }
  

}
function getRandomInt(min, max) { // intervalo fechado para o minimo e aberto para o maximo
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
function achaUsuarioAtual(Id,usuariodb){
  for(i=0;i<usuariodb.usuarios.length;i++){
      let usuario = usuariodb.usuarios[i];
      if(usuario.usuario_id==Id){
          return usuario.professor;
      }
  }
  return false;//Se caiu aqui,usuario não está logado,e portanto não deve aparecer criar conteúdo
}
window.onload = function () {
  let botaoApagarVisualizacao = document.getElementById('btnApagarVisualizacaoAtividade');
  let botaoApagarCriar = document.getElementById('btnApagarCriarAtividade');
  botaoApagarCriar.style.display = "none";
  

  if (localStorage.getItem("atividadesTodas")) {
    console.log("OK");  
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
      },
    {
      atividade_id: gerarID(),
      disciplina: "Matemática",
      materia: "Multiplicação",
      titulo: "Introdução à multiplicação",
      enunciado: "Quanto é 2x2?",
      opcoes: {
        resposta: "4",
        opcao1: "22",
        opcao2: "2",
        opcao3: "0",
      }
    },
    {
      atividade_id: gerarID(),
      disciplina: "Física",
      materia: "Magnetismo",
      titulo: "ENEM 2020 digital rosa - questão 111",
      enunciado: `Os ventos solares são fenômenos caracterizados por feixes de partículas carregadas,
      lançadas pelo Sol, no espaço, em alta velocidade. Somente uma pequena fração dessas
      partículas atinge a atmosfera nos polos, provocando as auroras. A chegada dessas partículas
      à superfície pode gerar efeitos indesejáveis, interferindo nas telecomunicações, no tráfego
      aéreo e nas linhas de transmissão de energia elétrica.<br>
      Esses efeitos são minimizados na Terra pela ação de seu(sua)`,
      opcoes: {
        resposta: "campo geomagnético.",
        opcao1: "ionosfera.",
        opcao2: "camada de ozônio.",
        opcao3: "campo gravitacional.",
      }
    }]
    }
    localStorage.setItem("atividadesTodas", JSON.stringify(conteudoAtividadeInicial));

    var parser = localStorage.getItem("atividadesTodas");
    var atividadeAntiga = JSON.parse(parser);
    
  }
  if (!localStorage.getItem("atividadesTodas")) {
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
    adicionarAtividadeDropdown();
  }

  if (!(localStorage.getItem("focus.ls.users") === null)) {
    let parser = localStorage.getItem("focus.ls.users");
  let objDados = JSON.parse(parser);
  let idUsuario = localStorage.getItem("usuarioAtual");
  let eProfessor = achaUsuarioAtual(idUsuario,objDados);
    if (eProfessor) {
      document.getElementById("btnCriarAtividade").addEventListener("click", aparecerCriarAtividade);

    } else {
      document.getElementById('btnCriarAtividade').style.display = 'none';
    }
  } else {
    document.getElementById('btnCriarAtividade').style.display = 'none';
  }
  botaoApagarVisualizacao.style.display = "none";
  adicionarAtividadeDropdown();
  
}

function adicionarAtividadeDropdown() {
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
  let dropdown = document.getElementById("qualAtividade");
  let parser1 = localStorage.getItem("atividadesIniciais");
  if(localStorage.getItem("atividadesTodas")){
    var parser2 = localStorage.getItem("atividadesTodas");
  }
  let atividades1 = JSON.parse(parser1);
  let atividades2 = JSON.parse(parser2);
  var count = atividades1.atividade.length;
  var countFor2 = 0;
  dropdown.innerHTML = '<option hidden disabled>Selecione o conteúdo a ver:</option>';
  for (i = 1; i < atividades1.atividade.length; i++) {
    let option = document.createElement('option');
    let text = document.createTextNode(atividades1.atividade[i -1].titulo);
    option.appendChild(text);
    dropdown.appendChild(option);
    option.setAttribute('value', atividades1.atividade[i - 1].disciplina);

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
  if (document.getElementById("btnApagarCriarAtividade")) {
    let botaoApagarCriar = document.getElementById("btnApagarCriarAtividade");
    botaoApagarCriar.style.display = 'none';
  }
  let dropDown = document.getElementById("qualAtividade");
  if (document.getElementById('mostrarCriarAtividade')) {
    let criarAtividade = document.getElementById('mostrarCriarAtividade');
    criarAtividade.style.display = 'none';
  }
  let conteudoTela = document.getElementById('aparecerAtividadeDiv');
  let parser1 = localStorage.getItem("atividadesIniciais");
  let index = dropDown.selectedIndex;
  let atividades1 = JSON.parse(parser1);
  let parser2 = localStorage.getItem("atividadesTodas");
  let atividades2 = JSON.parse(parser2);
  var valor = atividades1.atividade.length;
  let expr = getRandomInt(1, 5);
  if (index < valor) {
    // do nothing
  } else {
    if (index >= valor) {
      let textoHTML1 = `<div class="divQuestao" id="mostrarAtividade">
      <div id="disciplinaMostrarAtividade" class="center"><h1 class="ex-title">${atividades2.atividade[index - valor].disciplina}</h1></div>
      <div id="tituloMostrarAtividade" class="center"><h1 class="subtitulo">${atividades2.atividade[index - valor].titulo}</h1></div>
      <div id="enunciadoMostrarAtividade" class="justify enunciado">${atividades2.atividade[index - valor].enunciado}</div>
      <div id="opcao1MostrarAtividade" class="justify ex-option" value="${atividades2.atividade[index - valor].opcoes.opcao1}"><span class="negrito">A</span>   <div class="btn btn-light opcao" id="respostaOpcao1" value="${atividades2.atividade[index - valor].opcoes.opcao1}">${atividades2.atividade[index - valor].opcoes.opcao1}</div></div>
      <div id="opcao2MostrarAtividade" class="justify ex-option" value="${atividades2.atividade[index - valor].opcoes.opcao2}"><span class="negrito">B</span>   <div class="btn btn-light opcao" id="respostaOpcao2" value="${atividades2.atividade[index - valor].opcoes.opcao2}">${atividades2.atividade[index - valor].opcoes.opcao2}</div></div>
      <div id="opcao3MostrarAtividade" class="justify ex-option" value="${atividades2.atividade[index - valor].opcoes.opcao3}"><span class="negrito">C</span>   <div class="btn btn-light opcao" id="respostaOpcao3" value="${atividades2.atividade[index - valor].opcoes.opcao3}">${atividades2.atividade[index - valor].opcoes.opcao3}</div></div>
      <div id="opcao4MostrarAtividade" class="justify ex-option" value="${atividades2.atividade[index - valor].opcoes.resposta}"><span class="negrito">D</span>   <div class="btn btn-light opcao" id="respostaOpcao4">${atividades2.atividade[index - valor].opcoes.resposta}</div></div>
      </div><span id="validaRespostaSpan" class="negrito center"></span>`;

      let textoHTML2 = `<div class="divQuestao" id="mostrarAtividade">
      <div id="disciplinaMostrarAtividade" class="center"><h1 class="ex-title">${atividades2.atividade[index - valor].disciplina}</h1></div>
      <div id="tituloMostrarAtividade" class="center"><h1 class="subtitulo">${atividades2.atividade[index - valor].titulo}</h1></div>
      <div id="enunciadoMostrarAtividade" class="justify enunciado">${atividades2.atividade[index - valor].enunciado}</div>
      <div id="opcao1MostrarAtividade" class="justify ex-option" value="${atividades2.atividade[index - valor].opcoes.opcao1}"><span class="negrito">A</span>   <div class="btn btn-light opcao" id="respostaOpcao1" value="${atividades2.atividade[index - valor].opcoes.opcao1}">${atividades2.atividade[index - valor].opcoes.opcao1}</div></div>
      <div id="opcao2MostrarAtividade" class="justify ex-option" value="${atividades2.atividade[index - valor].opcoes.opcao2}"><span class="negrito">B</span>   <div class="btn btn-light opcao" id="respostaOpcao2" value="${atividades2.atividade[index - valor].opcoes.opcao2}">${atividades2.atividade[index - valor].opcoes.opcao2}</div></div>
      <div id="opcao3MostrarAtividade" class="justify ex-option" value="${atividades2.atividade[index - valor].opcoes.resposta}"><span class="negrito">C</span>   <div class="btn btn-light opcao" id="respostaOpcao3" value="${atividades2.atividade[index - valor].opcoes.resposta}">${atividades2.atividade[index - valor].opcoes.resposta}</div></div>
      <div id="opcao4MostrarAtividade" class="justify ex-option" value="${atividades2.atividade[index - valor].opcoes.opcao3}"><span class="negrito">D</span>   <div class="btn btn-light opcao" id="respostaOpcao4" value="${atividades2.atividade[index - valor].opcoes.opcao3}">${atividades2.atividade[index - valor].opcoes.opcao3}</div></div>
      </div><span id="validaRespostaSpan" class="negrito center"></span>`;
      let textoHTML3 = `<div class="divQuestao" id="mostrarAtividade">
      <div id="disciplinaMostrarAtividade" class="center"><h1 class="ex-title">${atividades2.atividade[index - valor].disciplina}</h1></div>
      <div id="tituloMostrarAtividade" class="center"><h1 class="subtitulo">${atividades2.atividade[index - valor].titulo}</h1></div>
      <div id="enunciadoMostrarAtividade" class="justify enunciado">${atividades2.atividade[index - valor].enunciado}</div>
      <div id="opcao1MostrarAtividade" class="justify ex-option" value="${atividades2.atividade[index - valor].opcoes.opcao1}"><span class="negrito">A</span>   <div class="btn btn-light opcao" id="respostaOpcao1" value="${atividades2.atividade[index - valor].opcoes.opcao1}">${atividades2.atividade[index - valor].opcoes.opcao1}</div></div>
      <div id="opcao2MostrarAtividade" class="justify ex-option" value="${atividades2.atividade[index - valor].opcoes.resposta}"><span class="negrito">B</span>   <div class="btn btn-light opcao" id="respostaOpcao2" value="${atividades2.atividade[index - valor].opcoes.resposta}">${atividades2.atividade[index - valor].opcoes.resposta}</div></div>
      <div id="opcao3MostrarAtividade" class="justify ex-option" value="${atividades2.atividade[index - valor].opcoes.opcao2}"><span class="negrito">C</span>   <div class="btn btn-light opcao" id="respostaOpcao3" value="${atividades2.atividade[index - valor].opcoes.opcao2}">${atividades2.atividade[index - valor].opcoes.opcao2}</div></div>
      <div id="opcao4MostrarAtividade" class="justify ex-option" value="${atividades2.atividade[index - valor].opcoes.opcao3}"><span class="negrito">D</span>   <div class="btn btn-light opcao" id="respostaOpcao4" value="${atividades2.atividade[index - valor].opcoes.opcao3}">${atividades2.atividade[index - valor].opcoes.opcao3}</div></div>
      </div><span id="validaRespostaSpan" class="negrito center"></span>`;
      let textoHTML4 = `<div class="divQuestao" id="mostrarAtividade">
      <div id="disciplinaMostrarAtividade" class="center"><h1 class="ex-title">${atividades2.atividade[index - valor].disciplina}</h1></div>
      <div id="tituloMostrarAtividade" class="center"><h1 class="subtitulo">${atividades2.atividade[index - valor].titulo}</h1></div>
      <div id="enunciadoMostrarAtividade" class="justify enunciado">${atividades2.atividade[index - valor].enunciado}</div>
      <div id="opcao1MostrarAtividade" class="justify ex-option" value="${atividades2.atividade[index - valor].opcoes.resposta}"><span class="negrito">A</span>   <div class="btn btn-light opcao" id="respostaOpcao1" value="${atividades2.atividade[index - valor].opcoes.resposta}">${atividades2.atividade[index - valor].opcoes.resposta}</div></div>
      <div id="opcao2MostrarAtividade" class="justify ex-option" value="${atividades2.atividade[index - valor].opcoes.opcao1}"><span class="negrito">B</span>   <div class="btn btn-light opcao" id="respostaOpcao2" value="${atividades2.atividade[index - valor].opcoes.opcao1}">${atividades2.atividade[index - valor].opcoes.opcao1}</div></div>
      <div id="opcao3MostrarAtividade" class="justify ex-option" value="${atividades2.atividade[index - valor].opcoes.opcao2}"><span class="negrito">C</span>   <div class="btn btn-light opcao" id="respostaOpcao3" value="${atividades2.atividade[index - valor].opcoes.opcao2}">${atividades2.atividade[index - valor].opcoes.opcao2}</div></div>
      <div id="opcao4MostrarAtividade" class="justify ex-option" value="${atividades2.atividade[index - valor].opcoes.opcao3}"><span class="negrito">D</span>   <div class="btn btn-light opcao" id="respostaOpcao4" value="${atividades2.atividade[index - valor].opcoes.opcao3}">${atividades2.atividade[index - valor].opcoes.opcao3}</div></div>
      </div><span id="validaRespostaSpan" class="negrito center"></span>`;

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
    validarResposta(value1, respostaOpcao1, respostaOpcao2, respostaOpcao3, respostaOpcao4);
  }
  opcao2MostrarAtividade.onclick = function () {
    validarResposta(value2, respostaOpcao2, respostaOpcao1, respostaOpcao3, respostaOpcao4);
  }
  opcao3MostrarAtividade.onclick = function () {
    validarResposta(value3, respostaOpcao3, respostaOpcao1, respostaOpcao2, respostaOpcao4);
  }
  opcao4MostrarAtividade.onclick = function () {
    validarResposta(value4, respostaOpcao4, respostaOpcao1, respostaOpcao2, respostaOpcao3);
  }

}

function validarResposta(opcaoValue, opcaoBotaoClicado, opcaoBotaoNaoClicado1, opcaoBotaoNaoClicado2, opcaoBotaoNaoClicado3) {
  let dropDown = document.getElementById("qualAtividade");
  let parser = localStorage.getItem("atividadesTodas");
  let atividades = JSON.parse(parser);
  let index = dropDown.selectedIndex;
  let spanResposta = document.getElementById("validaRespostaSpan");

  if (opcaoValue == atividades.atividade[index - 1].opcoes.resposta) {
    spanResposta.innerHTML = "Resposta certa :)";
    spanResposta.style.color = "#23CC00";
    opcaoBotaoClicado.style.background = "#32DD22";
    opcaoBotaoNaoClicado1.style.background = "#F8F9FA";
    opcaoBotaoNaoClicado2.style.background = "#F8F9FA";
    opcaoBotaoNaoClicado3.style.background = "#F8F9FA";
  } else {
    spanResposta.innerHTML = "Resposta errada :(";
    spanResposta.style.color = "#c00221";
    opcaoBotaoClicado.style.background = "#D44556";
    opcaoBotaoNaoClicado1.style.background = "#F8F9FA";
    opcaoBotaoNaoClicado2.style.background = "#F8F9FA";
    opcaoBotaoNaoClicado3.style.background = "#F8F9FA";
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

document.getElementById("btnVisualizarAtividade").addEventListener("click", mostrarAtividadeTela);
document.getElementById("btnApagarVisualizacaoAtividade").addEventListener("click", apagarConteudoTela);
document.getElementById("btnApagarCriarAtividade").addEventListener("click", apagarCriarAtividade);


