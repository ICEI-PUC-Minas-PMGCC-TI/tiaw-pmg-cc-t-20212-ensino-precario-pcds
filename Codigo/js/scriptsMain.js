
/**
 * @brief Acha e retorna o id do usuario atual
 * 
 * @param id id do usuario
 * @param obj de dados de todos os usuarios
 * @return id do usuario logado
 */
function achaUsuarioAtualId(Id,usuariodb){
    for(i=0;i<usuariodb.usuarios.length;i++){
        let usuario = usuariodb.usuarios[i];
        if(usuario.usuario_id==Id){
            return usuario.usuario_id.value;
        }
    }
    return false;//Se caiu aqui,usuario não está logado,e portanto não deve aparecer criar conteúdo
  }

  /**
   * @brief Isso é rodado no momento em que a tela é totalmente carregada
   */
window.onload = function(){
    if(localStorage.getItem("atividadesTodas")){
        let parser = localStorage.getItem("atividadesTodas");
        let atividades = JSON.parse(parser);
        let tamanho = atividades.atividade.length;
        let tela = document.getElementById("tela");
        tela.innerHTML = tela.innerHTML + `<div><h4 class="titulo-main"> Atividades </h4></div>`;
        let i = 0;

        for(i; i < tamanho; i = i + 1){
            tela.innerHTML = tela.innerHTML + `
            <div class="card cartao-main d-inline-flex p-2 bd-highlight">
              <h5 class="card-header">Atividade "${atividades.atividade[i].titulo}"</h5>
              <div class="card-body">
                <h5 class="card-title">Veja essa nova atividade!</h5>
                <p class="card-text">Matéria: ${atividades.atividade[i].materia}</p>
                <a href="atividade.html" class="btn btn-primary">Página de atividades</a>
              </div>
            </div>
            `;
        }
    }
    if(localStorage.getItem("materialTodo")){
        let parser = localStorage.getItem("materialTodo");
        let materiais = JSON.parse(parser);
        let tamanho = materiais.material.length;
        let tela = document.getElementById("tela");
        tela.innerHTML = tela.innerHTML + `<div><h4 class="titulo-main"> Conteúdos </h4></div>`;
        let i = 0;
        for(i; i < tamanho; i = i + 1){
            tela.innerHTML = tela.innerHTML + `
            <div class="card cartao-main d-inline-flex p-2 bd-highlight">
              <h5 class="card-header">Conteúdo "${materiais.material[i].disciplina}"</h5>
              <div class="card-body">
                <h5 class="card-title">Veja esse novo conteúdo!</h5>
                <p class="card-text">Matéria: ${materiais.material[i].titulo}</p>
                <a href="conteudo.html" class="btn btn-primary">Página de conteúdos</a>
              </div>
            </div>
            `;
        }
    }
    if(localStorage.getItem("dbMensagens")){
        let parser1 = localStorage.getItem("db");
        let objDados = JSON.parse(parser1)
        let usuarioAtualId = localStorage.getItem("usuarioAtual");
        let parser = localStorage.getItem("dbMensagens");
        let mensagensJs = JSON.parse(parser);
        let tamanho = mensagensJs.mensagens.length;
        let tela = document.getElementById("tela");
        tela.innerHTML = tela.innerHTML + `<div><h4 class="titulo-main"> Mensagens para você </h4></div>`;
        let i = 0;
        
        for(i; i < tamanho; i = i + 1){
            if(mensagensJs.mensagens[0].para === achaUsuarioAtualId(usuarioAtualId, objDados)){
                tela.innerHTML = tela.innerHTML + `
                <div class="card cartao-main d-inline-flex p-2 bd-highlight">
                  <h5 class="card-header">Mensagem de "${mensagensJs.mensagens[i].de}"</h5>
                  <div class="card-body">
                    <h5 class="card-title">Você recebeu uma nova mensagem!</h5>
                    <p class="card-text">Assunto: ${mensagensJs.mensagens[i].titulo}</p>
                    <a href="conteudo.html" class="btn btn-primary">Página de mensagens</a>
                  </div>
                </div>
                `;
            }
        }
    }
}
