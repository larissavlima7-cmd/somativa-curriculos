# Especificação de Requisitos de Software (SRS)
**Projeto:** Plataforma RH
**Versão:** 1.0
**Data:** 2 de Junho de 2026

## 1. Introdução
### 1.1 Propósito
Este documento descreve os requisitos funcionais e não funcionais para o Módulo de Currículos e Vagas da Plataforma de RH. O objetivo deste módulo é permitir que candidatos gerenciem suas informações profissionais e que a administração visualize esses dados.

### 1.2 Escopo
O sistema compreende o desenvolvimento de uma interface frontend em Angular integrada a um backend simulado (json-server). As funcionalidades incluem o CRUD completo de currículos, vinculação de dados por ID de usuário e interface administrativa para gestão.

---

## 2. Descrição Geral
A plataforma é dividida em duas visões principais:

  1. Visão do Candidato: Formulário de inscrição de currículo e mural de vagas disponíveis.

  2. Visão Administrativa (Painel): Gerenciamento operacional das vagas (cadastro, edição, exclusão) e visualização em formato tabular de todos os perfis profissionais cadastrados.

## 3. Requistos do Sistema 

### 3.1 Requistos Funcionais (RF)
| REQUISITOS | CATEGORIA | DESCRIÇÃO |
| --- | --- | --- | 
| RF01 | Listar Vagas | O sistema deve exibir as vagas disponíveis recuperadas da API, contendo imagem, título, descrição e salário. |
| RF02 | Visualizar Detalhes da Vaga | O usuário deve ser capaz de visualizar o código (ID), nome, descrição e salário de cada vaga. |
| RF03 | Cadastrar Currículo | O sistema deve permitir ao candidato preencher um formulário com seus dados pessoais e profissionais. |
| RF04 | Persistência de Currículo | O sistema deve enviar os dados do formulário para o backend (API) e gerar um novo registro no banco de dados. |
| RF05 | Limpeza de Formulário | Após o sucesso no envio do cadastro, o formulário deve ser limpo automaticamente para uma nova entra. |


### 3.2 Requsitos Não-Funcionais (RNF)
| REQUISITOS | CATEGORIA | DESCRIÇÃO |
| --- | --- | --- | 
| RNF01 | Usabilidade e Design | A interface do usuário deve ser responsiva, centralizada e utilizar uma identidade visual moderna baseada em tons de roxo (#6a1b9a, #4a148c), garantindo uma experiência agradável e intuitiva (UX/UI). |
| RNF02 | Tecnologia do Frontend | O sistema deve ser desenvolvido utilizando o framework Angular 18+ com componentes independentes (Standalone Components) e estilização em SCSS. |
| RNF03 | Comunicação Assíncrona | Toda a comunicação entre o frontend e a API deve ser assíncrona, utilizando o protocolo HTTP via HttpClient do Angular e gerenciada por streams do RxJS (Observable). |
| RNF04 | Backend Simulado | O armazenamento e persistência dos dados devem utilizar o json-server rodando localmente na porta 3022.|
| RNF05 | Robustez e Tratamento de Erros | O sistema deve capturar falhas de comunicação com a API e emitir um feedback claro no console e alertas para o usuário caso o backend esteja indisponível. |

## 4. Interface de Dados e Modelagem do Sistema

### 4.1 Diagramas

#### 4.1.1 Diagrama de Uso
```
mermaid
graph LR
    Candidato[Candidato a Vaga]
    Admin[Administrador de RH]

    Candidato --> UC1[RF03: Cadastrar Currículo]
    Candidato --> UC2[RF01: Listar Vagas Disponíveis]
    Candidato --> UC3[RF02: Visualizar Detalhes da Vaga]

    Admin --> UC4[Visualizar Painel Administrativo]
    Admin --> UC5[Gerenciar Operação de Vagas]

    UC4 --> |Include| UC6[Visualizar Perfis em Formato Tabular]
```

#### 4.1.2 Diagrama de Classe
```
mermaid
classDiagram
    class Curriculo {
        +int id
        +String nome
        +String email
        +String telefone
        +String cidade
        +String estado
        +String resumo_profissional
        +String vaga_interesse
        +toMap() Object
        +fromMap(Object) Curriculo
    }

    class Apiservice {
        -String apiUrl
        +getCurriculos() Observable~Curriculo[]~
        +postCurriculos(Object) Observable
        +putCurriculos(any, Object) Observable
        +deleteCurriculos(any) Observable
    }

    class CurriculosComponent {
        +Curriculo[] curriculos
        +Curriculo curriculo
        +ngOnInit() void
        +listarCurriculos() void
        +cadastrarCurriculos(NgForm) void
    }

    CurriculosComponent ..> Curriculo : gerencia e manipula
    CurriculosComponent --> Apiservice : consome dados de
```

#### 4.1.1 Diagrama de Fluxo
```
mermaid
graph TD
    A([Início: Acessar link do sistema]) --> B[Abrir Página de Cadastro de Currículo]
    B --> C[Preencher campos obrigatórios de informações]
    C --> D[Clicar no botão para enviar/cadastrar]
    D --> E[Chamar método cadastrarCurriculos]
    E --> F[Executar mapeamento via curriculo.toMap]
    F --> G{O ID do objeto é igual a 0?}
    G -- Sim --> H[Deletar propriedade 'id' para o json-server gerar o ID automático]
    G -- Não --> I[Manter ID existente no objeto]
    H --> J[Acionar _apiService.postCurriculos com dados tratados]
    I --> J
    J --> K[Enviar requisição HTTP POST para a API na porta 3022]
    K --> L{A API respondeu com Sucesso?}
    
    L -- Não --> M[Registrar erro detalhado via console.error]
    M --> N[Exibir Alerta de erro na tela]
    N --> C

    L -- Sim --> O[Exibir Alerta: 'Currículo Cadastrado com Sucesso']
    O --> P[Página é recarregada automaticamente]
    P --> Q[Limpar o formulário e sumir com os dados digitados anteriormente]
    Q --> R([Fim do Fluxo de Cadastro])

    SubGraph Rota Alternativa: Visualização de Dados
        S([Acessar link: localhost:4200/curriculos]) --> T[Carregar Componente de Listagem]
        T --> U[Buscar registros persistidos no backend via HTTP GET]
        U --> V[Exibir tabela em tela contendo todos os currículos cadastrados]
        V --> W([Fim do Fluxo de Visualização])
    end
  ```
## 5. Critérios de Aceitação

1.  **Operação CRUD:** É possível criar, ler, atualizar e excluir um registro no `db.json` através da interface?
2.  **Navegação:** As rotas configuradas levam aos componentes corretos sem erros de console?
3.  **Feedback:** O usuário recebe uma confirmação (ex: MatSnackBar) ao salvar um currículo?
4.  **Consistência:** Os dados exibidos na listagem correspondem exatamente ao que está no backend simulado?

## 6. Configuração do Ambiente
Para rodar o projeto localmente, siga os passos abaixo:

Passo 1: Instalação das Dependências
Certifique-se de ter o Node.js e o Angular CLI instalados. No diretório raiz do projeto, execute:

  - npm install

Passo 2: Inicializar o Backend Simulado (json-server)
Caso não tenha o json-server global, você pode executá-lo via npx. Certifique-se de apontá-lo para o arquivo db.json e para a porta configurada no seu Apiservice (3022):

 - npx json-server --watch db.json --port 3022

Passo 3: Inicializar o Frontend (Angular)
Em outro terminal, execute o servidor de desenvolvimento do Angular:

  - ng serve

**Abra o navegador no endereço padrão indicado (http://localhost:4200) para testar o envio de currículos.**

Depois, para conferir os curriculos cadastrados acesse a página **(http://localhost:4200/curriculos)**.

