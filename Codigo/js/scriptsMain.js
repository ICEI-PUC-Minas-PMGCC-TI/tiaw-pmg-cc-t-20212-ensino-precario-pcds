
    window.onload=function()
    {
        if (localStorage.getItem("atividadesTodas")) 
        {
    
            var parser = localStorage.getItem("atividadesTodas");
        
            var atividadeAntiga = JSON.parse(parser);
        
        }
        atividadeAntiga.atividade[0].titulo;
        tela.innerHTML=`<h1>${atividadeAntiga.atividade[0].materia}</h1><p>${atividadeAntiga.atividade[0].titulo}`;
        alert(atividadeAntiga.atividade[0].titulo);
    }
    
    
                 