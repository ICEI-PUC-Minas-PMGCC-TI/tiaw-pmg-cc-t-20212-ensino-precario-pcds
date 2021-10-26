# Especificações Do Projeto

<span style="color:red">Pré-requisitos: <a href="1-Contexto.md"> Documentação de Contexto</a></span>

Neste documento,apresentaremos resultados de reuniões entre os membros do grupo deste projeto para
idealizar melhor como seria feito esse trabalho.Fizemos isso mediante a criação de:

* Personas
* Histórias de usuário
* Requisitos(Funcionais e não-Funcionais)
* Restrições do projeto

## Personas

> - 1: João Pedro tem 13 anos, estuda em uma escola pública, é de baixa renda, tímido e
possui uma deficiência intelectual que o impede de aprender no mesmo ritmo que os demais alunos 
de sua escola. Por causa dessa defiicência, ele não consegue realizar as atividades escolares e, por 
isso, não vai bem na escola.
> - 2: Nanda possui 16 anos, estuda em uma escola particular, é extrovertida e gosta de passar o tempo
na internet. Apesar disso, ela possui muitas dificuldades em aprender as matérias de exatas na escola, 
principalmente matemática, sendo que a escola dela possui um ritmo muito acelerado de ensino, e ela 
precisa de ajuda para acompanhar.
> - 3: Geraldo possui 35 anos, trabalha como professor de apoio auxiliando alunos com deficiência 
cognitiva, gosta muito do que faz, porém, percebe que precisa de algo externo à escola para ajudar ao 
máximo seus alunos, pois, durante o horário padrão, eles não conseguem acompanhar o ritmo.

## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Aluno - João       | Explicações alternativas das matérias da escola | Melhorar meu desempenho escolar                          |
|Aluno - Nanda      | Reforço nas matérias de exatas do Ensino Médio  | Me preparar melhor para vestibulares                     |
|Professor - Geraldo| Uma forma extraescolar de auxiliar meus alunos  | Garantir que eles aprendam mesmo com muitas dificuldades |

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| Permitir o cadastro de usuário                           | ALTA | 
|RF-002| Permitir o acesso aos conteúdos associados ou públicos   | ALTA |
|RF-003| Mostrar os conteúdos criados pelos professores           | ALTA |
|RF-004| Permitir pesquisas por palavras-chave                    | MÉDIA |
|RF-005| Permitir associação de hierarquia entre usuários         | MÉDIA |
|RF-006| Permitir a criação de novos conteúdos ou atividades      | ALTA |
|RF-007| Permitir interação na plataforma                         | BAIXA |
|RF-008| Permitir a seleção de favoritos                          | BAIXA |

### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve ser responsivo para rodar em um dispositivos móvel | ALTA | 
|RNF-002| O site deve possuir cores de alto contraste e fortes              | ALTA |
|RNF-003| O site deve ser publicado na internet                             | ALTA |
|RNF-004| O site deve ter um design simples e de fácil entendimento         | ALTA |
## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| O projeto deve ser apenas uma aplicação web           |