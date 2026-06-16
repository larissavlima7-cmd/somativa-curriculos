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
RF01 - Listar Vagas: O sistema deve exibir as vagas disponíveis recuperadas da API, contendo imagem, título, descrição e salário.

RF02 - Visualizar Detalhes da Vaga: O usuário deve ser capaz de visualizar o código (ID), nome, descrição e salário de cada vaga.

RF03 - Cadastrar Currículo: O sistema deve permitir ao candidato preencher um formulário com seus dados pessoais e profissionais.

RF04 - Persistência de Currículo: O sistema deve enviar os dados do formulário para o backend (API) e gerar um novo registro no banco de dados.

RF05 - Limpeza de Formulário: Após o sucesso no envio do cadastro, o formulário deve ser limpo automaticamente para uma nova entra


### 3.2 Requsitos Não-Funcionais (RNF)

## 4. Interface de Dados e Modelagem do Sistema

### 4.1 Diagramas

#### 4.1.1 Diagrama de Uso

#### 4.1.2 Diagrama de Classe

#### 4.1.1 Diagrama de Fluxo

## 5. Critérios de Aceitação

1.  **Operação CRUD:** É possível criar, ler, atualizar e excluir um registro no `db.json` através da interface?
2.  **Navegação:** As rotas configuradas levam aos componentes corretos sem erros de console?
3.  **Feedback:** O usuário recebe uma confirmação (ex: MatSnackBar) ao salvar um currículo?
4.  **Consistência:** Os dados exibidos na listagem correspondem exatamente ao que está no backend simulado?

## 6. Configuração do Ambiente


