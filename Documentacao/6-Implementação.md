# Projeto da Solução

<span style="color:red">Pré-requisitos: <a href="4-Gestão-Configuração.md"> Ambiente e Ferramentas de Trabalho</a></span>

## Tecnologias Utilizadas

* As seguintes tecnologias foram empregadas para o desenvolvimento do projeto FOCUS:

 1. VSCode: IDE de programação utilizada pelos membros do grupo,além da extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

 2. GitHub: Repositório online de código,para melhor manuseio de versões,fácil compartilhamento de código entre os integrantes do grupo,além de um sistema kanban imbutido.[Link GitHub Equipe](https://github.com/ICEI-PUC-Minas-PMGCC-TI/tiaw-pmg-cc-t-20212-ensino-precario-pcds)

 3. HTML,Javascript e CSS:Essas ferramentas,as mais básicas para desenvolvimento web,foram utilizadas por estarem dentro da capacidade dos integrantes do grupo,mas podendo mesmo assim entregar um resultado de alto nível.

 4. Figma:Para o desenvolvimento dos Wireframes do site.

 5. Miro: Quadro de ideias virtual usado na parte de concepção do projeto.
 
## Arquitetura da solução


A imagem a seguir ilustra a o fluxo do usuário em nossa solução. Assim
que o usuário entra na plataforma, ele é apresentado à tela inicial
(Tela 1) onde ele é confrontado com as opões de editar seu perfil ou
então visualizar sua galeria.

Caso ele opte por seguir pelo primeiro caminho (Editar Perfil), ele é
redirecionado para a tela de edição de perfil (Tela 2), onde pode
atualizar seus dados cadastrais. Nessa tela, o usuário também pode
escolher para editar sua foto de perfil. Ao selecionar essa opção, ele é
redirecionado para a Tela 3, onde ele a imagem expandida do perfil do
usuário é mostrado. Ao selecionar a opção para atualizar a imagem, uma
nova janela abre pedindo para o usuário fazer o upload da nova foto.
Assim que o processo termina um pop-up exibe o status para o usuário
(Tela 4) e o usuário é redirecionado para a Tela 2.

Caso o usuário opte seguir pelo segundo caminho (Visualizar Galeria) ele
é redirecionado para a Tela 5 com todas as fotos que o usuário possui. O
usuário pode clicar em um post qualquer para visualizar os detalhes do
post (Tela 6). Nessa tela, ele pode então escolher editar o post, sendo
redirecionado para a Tela 7. Ao editar as informações, o usuário pode
escolher salvar ou deletar o post. Em ambos os casos o status é
notificado para o usuário (Tela 8) e em seguida ele é redirecionado
para a Tela 2.

![Exemplo de UserFlow](images/userflow.jpg)
