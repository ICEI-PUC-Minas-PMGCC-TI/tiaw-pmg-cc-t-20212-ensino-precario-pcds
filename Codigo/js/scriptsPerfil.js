window.onload = function(){ // DEIXAR ESSE PARA A SEGUNDA SPRINT
    /*      ANTES
    btnAlterarNomeEmail.disabled = true;
    let validaForm = () => {
        if(nome.value.lenght == 0 || email.value.lenght == 0){
            btnAlterarNomeEmail.disabled = true;
        }else{
            btnAlterarNomeEmail.disabled = false;
        };
    };
    nome.onchange = validaForm;
    email.onchange = validaForm;
    */

    btnAlterarNomeEmail.disabled = true; // depois
                
    let validarForm = alterarDados.onsubmit = function(){
        
        if(nome.value.length == 0 || email.value.length == 0){
            btnAlterarNomeEmail.disabled = true;

        }else{
            btnAlterarNomeEmail.disabled = false;
            return false;
        };
    };
    nome.onchange = validarForm;
    email.onchange = validarForm;
};