function leDados() {
    let strDados = localStorage.getItem('db');
    let objDados = {};

    if (strDados) {
        objDados = JSON.parse(strDados);
    }
    else {
        objDados = {
            usuarios: [
                { nome: "João da Silva", email: "joaosilva672@hotmail.com", senha: "123456789" },
                { nome: "Maria das Graças", email: "gracasmaria@gmail.com", senha: "123456789" },
                { nome: "Pedro Gomes", email: "pedro.gomes@gmail.com", senha: "123456789" }
            ]
        }
    }

    return objDados;
}

function salvaDados(dados) {
    localStorage.setItem('db', JSON.stringify(dados));
}

function novoUsuario() {
    // Ler os dados do localStorage
    let objDados = leDados();

    // Incluir um novo contato


    let strNome = document.getElementById('nomeCadastro').value;
    let strEmail = document.getElementById('emailCadastro').value;
    if (document.getElementById('senhaCadastro1').value == document.getElementById('senhaCadastro2').value) {
        let strSenha = document.getElementById('senhaCadastro1').value;
        var novoUsuario = {
            nome: strNome,
            email: strEmail,
            senha: strSenha
        };
        objDados.usuarios.push(novoUsuario);
        alert("Cadastro concluido com sucesso.");
        salvaDados(objDados);
        document.getElementById('nomeCadastro').value = '';
        document.getElementById('emailCadastro').value = '';
        document.getElementById('senhaCadastro1').value = '';
        document.getElementById('senhaCadastro2').value = '';
    } else {
        alert("As duas senhas precisam ser iguais.");
        document.getElementById('senhaCadastro1').value = '';
        document.getElementById('senhaCadastro2').value = '';
    }
}

nomeCadastro.oninput = function () {
    let caractereInvalido = '1234567890!@#$%¨&*()`´^~{}[]<.>,:;';
    let ultimoCarater = nomeCadastro.value.charAt(nomeCadastro.value.length - 1);
    if (caractereInvalido.indexOf(ultimoCarater) >= 0) {
        nomeCadastro.value = nomeCadastro.value.substr(0, nomeCadastro.value.length - 1);
    };
}

document.getElementById('btnCadastrar').addEventListener('click', novoUsuario);
