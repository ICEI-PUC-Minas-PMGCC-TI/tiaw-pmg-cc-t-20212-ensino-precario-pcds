function gerarID() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    // A função de gerarID pode ser usada para todas as coisas que podem ser cadastradas pelo usuario.
    // exemplo de ID gerado: _a7ny9bdqz
    return '_' + Math.random().toString(36).substr(2, 9);
  }
  
  
  
  
  
  window.onload = function () {
    if (localStorage.getItem("primeiraVezDb") === false) {
      let conteudoDb = {
        material: [{
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
      localStorage.setItem("atividadesTodas", JSON.stringify(conteudoDb));
      localStorage.setItem("primeiraVezDb", true);
    } else {
  
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
    function adicionarAtividadeDb(){
        let parser= localStorage.getItem("atividadesTodas");
        let materialAntigo = JSON.parse(parser);
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
        if(opcaoA){
            respostaCerta = document.getElementById('respostaOpcaoInputA');
            respostaErrada1 = document.getElementById('respostaOpcaoInputB');
            respostaErrada2 = document.getElementById('respostaOpcaoInputC');
            respostaErrada3 = document.getElementById('respostaOpcaoInputD');
        }else{
            if(opcaoB){
                respostaCerta = document.getElementById('respostaOpcaoInputB');
                respostaErrada1 = document.getElementById('respostaOpcaoInputA');
                respostaErrada2 = document.getElementById('respostaOpcaoInputC');
                respostaErrada3 = document.getElementById('respostaOpcaoInputD');
            }else{
                if(opcaoC){
                    respostaCerta = document.getElementById('respostaOpcaoInputC');
                    respostaErrada1 = document.getElementById('respostaOpcaoInputA');
                    respostaErrada2 = document.getElementById('respostaOpcaoInputB');
                    respostaErrada3 = document.getElementById('respostaOpcaoInputD');
                }else{
                    if(opcaoD){
                        respostaCerta = document.getElementById('respostaOpcaoInputD');
                        respostaErrada1 = document.getElementById('respostaOpcaoInputA');
                        respostaErrada2 = document.getElementById('respostaOpcaoInputB');
                        respostaErrada3 = document.getElementById('respostaOpcaoInputC');
                    }else{
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
        materialAntigo.material.push(novaAtividade);
        localStorage.setItem('atividadesTodas', JSON.stringify(materialAntigo));
        
    }
    function aparecerCriarAtividade() {
      let atividade = document.getElementById('aparecerCriarAtividadeDiv');
      atividade.innerHTML = `
      <div class="col-12 col-md-12 col-lg-12 col-sm-12">
            <div>
              <label for="disciplinaQuestao">Disciplina:</label>
              <input type="text" id="disciplinaQuestao">
            </div>
            <div>
              <label for="materiaQuestao">Matéria:</label>
              <input type="text" id="materiaQuestao">
            </div>
            <div>
              <label for="enunciadoQuestao">Enunciado:</label>
              <textarea name="enunciado" id="enunciadoQuestao" cols="30" rows="10"></textarea>
            </div>
            <div>
              <label for="tituloQuestao">Título:</label>
              <input type="text" id="tituloQuestao">
            </div>
            
            <h2>Marque a opção que for a resposta correta.</h2>
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
            <div><button id="btnPostarAtividade" onclick="adicionarAtividadeDb()">Publicar</button></div>
          </div>
      
      `
    }
  }
  