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
function validaEmail(field) {
    let usuario = field.value.substr(0, field.value.indexOf("@")); // o que é escrito ANTES DO "@"
    let dominio = field.value.substr(field.value.indexOf("@") + 1, field.value.length); // o que é escrito DEPOIS DO "@"
    let result = false;
    if (usuario.length >= 1 && dominio.length >= 3 && usuario.search("@") == -1 &&
        dominio.search("@") == -1 && usuario.search(" ") == -1 && dominio.search(" ") == -1 &&
        dominio.search(".") != -1 && dominio.indexOf(".") >= 1 && dominio.lastIndexOf(".") < dominio.length - 1) {
        result = true;
    }

    return result;
}
function salvaDados(dados) {
    localStorage.setItem('db', JSON.stringify(dados));
}

function novoUsuario() {
    // Ler os dados do localStorage
    let objDados = leDados();
    // Incluir um novo contato
    let strNome = document.getElementById('nomeCadastro').value;
    let strEmail = document.getElementById('emailCadastro');
    let strSenha1 = document.getElementById('senhaCadastro1').value;
    let strSenha2 = document.getElementById('senhaCadastro2').value;
    if (strNome.length > 0) {
        if (!(validaEmail(strEmail))) {
            alert("Digite um e-mail válido.");
        } else {
            if ((strSenha1.length > 0) && (strSenha2.length > 0)) {
                if ((strSenha1 == strSenha2)) {
                    var novoUsuario = {
                        nome: strNome,
                        email: strEmail.value,
                        senha: strSenha1
                    }
                    objDados.usuarios.push(novoUsuario);
                    alert("Cadastro concluido com sucesso.");
                    salvaDados(objDados);
                    document.getElementById('nomeCadastro').value = '';
                    document.getElementById('emailCadastro').value = '';
                    document.getElementById('senhaCadastro1').value = '';
                    document.getElementById('senhaCadastro2').value = '';
                } else {
                    alert("As duas senhas precisam ser iguais.");
                }

            } else {
                alert("Digite uma senha.");
                document.getElementById('senhaCadastro1').value = '';
                document.getElementById('senhaCadastro2').value = '';
            }
        }
    } else {
        alert("Digite um nome válido.")
    }
}

nomeCadastro.oninput = function () {
    let caractereInvalido = '1234567890!@#$%¨&*()`´^~{}[]<.>,:;\"\\|\'-_=+/§ªº¹²³£¢¬?°';
    let ultimoCarater = nomeCadastro.value.charAt(nomeCadastro.value.length - 1);
    if (caractereInvalido.indexOf(ultimoCarater) >= 0) {
        nomeCadastro.value = nomeCadastro.value.substr(0, nomeCadastro.value.length - 1);
    };
}

document.getElementById('btnCadastrar').addEventListener('click', novoUsuario);






// scriptslogin








// Verifica se o login do usuário está ok e, se positivo, direciona para a página inicial
function loginUser(login, senha) {

    let objDados = leDados();
    // Verifica todos os itens do banco de dados de usuarios 
    // para localizar o usuário informado no formulario de login
    for (var i = 0; i < objDados.usuarios.length; i++) {
        var usuario = objDados.usuarios[i];

        // Se encontrou login, carrega usuário corrente e salva no Session Storage
        if (login == usuario.email && senha == usuario.senha) {

            // Retorna true para usuário encontrado
            return true;
        }
    }

    // Se chegou até aqui é por que não encontrou o usuário e retorna falso
    return false;
}


function pegarLoginSenha() {
    let login = document.getElementById('email').value;
    let senha = document.getElementById('senhaLogin').value;
    let estado = loginUser(login, senha);
    if (estado) {
        window.location.href = "conteudo.html";
    } else {
        alert('Algo deu errado!');
    }
}








