
function gerarID() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    // A função de gerarID pode ser usada para todas as coisas que podem ser cadastradas pelo usuario.
    // exemplo de ID gerado: _a7ny9bdqz
    return '_' + Math.random().toString(36).substr(2, 9);
}



function validaEmail(field) {
    let objDados = leDados();
    let usuario = field.value.substr(0, field.value.indexOf("@")); // o que é escrito ANTES DO "@"
    let dominio = field.value.substr(field.value.indexOf("@") + 1, field.value.length); // o que é escrito DEPOIS DO "@"


    let result = false;
    if (usuario.length >= 1 && dominio.length >= 3 && usuario.search("@") == -1 &&
        dominio.search("@") == -1 && usuario.search(" ") == -1 && dominio.search(" ") == -1 &&
        dominio.search(".") != -1 && dominio.indexOf(".") >= 1 && dominio.lastIndexOf(".") < dominio.length - 1 &&
        usuario.indexOf(".") < field.value.indexOf("@") - 1) {
        for (let i = 0; i < objDados.usuarios.length; i++) {
            let usuario = objDados.usuarios[i];
            if (field.value == usuario.email) {
                result = false;
                alert("Esse e-mail já foi cadastrado.")
                return result;
            } else {
                result = true;
            }
        }

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
    let strId = gerarID();
    let strNome = document.getElementById('nomeCadastro').value;
    let strEmail = document.getElementById('emailCadastro');
    let strSenha1 = document.getElementById('senhaCadastro1').value;
    let strSenha2 = document.getElementById('senhaCadastro2').value;
    let isProfessor = document.getElementById('simProfessor').checked;
    if (strNome.length > 0) {
        if (!(validaEmail(strEmail))) {
            alert("Digite um e-mail válido.");
        } else {
            if ((strSenha1.length > 0) && (strSenha2.length > 0)) {
                if ((strSenha1 == strSenha2)) {
                    var novoUsuario = {
                        usuario_id: strId,
                        nome: strNome,
                        email: strEmail.value,
                        senha: strSenha1,
                        professor: isProfessor
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
    let caractereInvalidoNome = '1234567890!@#$%¨&*()`´^~{}[]<.>,:;\"\\|\'-_=+/§ªº¹²³£¢¬?°';
    let ultimoCarater = nomeCadastro.value.charAt(nomeCadastro.value.length - 1);
    if (caractereInvalidoNome.indexOf(ultimoCarater) >= 0) {
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
function achaUsuario(login,senha){
    let objDados = leDados();
     // Verifica todos os itens do banco de dados de usuarios
     // para localizar o usuário informado no formulario de login
     for (var i = 0; i < objDados.usuarios.length; i++) {
        var usuario = objDados.usuarios[i];

        // Se encontrou login, carrega usuário corrente e salva no Session Storage
        if (login == usuario.email && senha == usuario.senha) {

            // Retorna true para usuário encontrado
            return i;
        }
    }
}

function pegarLoginSenha() {
    let login = document.getElementById('emailLogin').value;
    let senha = document.getElementById('senhaLogin').value;
    let  estado = loginUser(login,senha);
    if(estado)
    {
        let index = achaUsuario(login,senha);//Já foi garantindo que o usuário existe
        localStorage.setItem("usuarioAtual",index);
        window.location.href = "conteudo.html";
    }
    else
    {
         document.getElementById('emailLogin').value ="";
         document.getElementById('senhaLogin').value ="";
         Aviso('Seu login ou sua senha estão errados!');
    }
}

function Aviso(mensaguem)
{
    let tela = document.getElementById('erro');
    tela.innerHTML = `<p>${mensaguem}</p>` ;

}

function pararerro()
{
    let tela = document.getElementById('erro');
    tela.innerHTML = "" ;
}

