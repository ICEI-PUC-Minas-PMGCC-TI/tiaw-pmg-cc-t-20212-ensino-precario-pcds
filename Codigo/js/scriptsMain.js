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
    
}