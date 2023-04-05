# Seja muito bem-vindo(a) ao meu projeto Store Manager! :rocket:
![office](https://github.com/ErickArgollo/project-Store-Manager/blob/main/10j2.gif)


#### Neste projeto, eu desenvolvi uma API utilizando a arquitetura MSC (model-service-controller) para gerenciamento de vendas no formato dropshipping. Com a API, é possível criar, visualizar, deletar e atualizar produtos e vendas.

## Objetivos
* Desenvolver uma API RESTful utilizando a arquitetura MSC (model-service-controller) para gerenciamento de vendas no formato dropshipping.
* Permitir a criação, visualização, deleção e atualização de produtos e vendas através da API.
* Utilizar o Node.js em conjunto com o framework Express para criar o servidor HTTP e gerenciar as rotas.
* Criar um ambiente de desenvolvimento e produção isolado utilizando o Docker.
* Gerenciar o banco de dados MySQL através do MySQL Workbench.
* Garantir que a API seja segura, eficiente e que siga os princípios RESTful.

## Tecnologias/Ferramentas utilizadas
* Node.js
* Express
* Docker
* MySQL
* MySQL Workbench
* Joi

## Como utilizar

<details>

<summary><strong>⌨️ Rotas</strong></summary>

#### Listagem de produtos
##### GET /products

* Retorna todos os produtos cadastrados no banco de dados, ordenados pelo campo id.

##### GET /products/:id

* Retorna apenas o produto com o id informado na URL.

#### Cadastro de produtos

##### POST /products
* Cadastra um novo produto no banco de dados.

* O corpo da requisição deve seguir o seguinte formato:
json
```
{
  "name": "Nome do Produto"
}
```

#### Atualização de produtos
##### PUT /products/:id
* Atualiza o produto com o id informado na URL. O corpo da requisição deve seguir o mesmo formato do cadastro.

#### Deleção de produtos
##### DELETE /products/:id
* Deleta o produto com o id informado na URL.

#### Busca de produtos
##### GET /products/search?q=searchTerm

* Busca produtos no banco de dados que contenham o termo informado no query param q da URL. Retorna um array vazio caso nenhum produto satisfaça a busca.

#### Listagem de vendas
##### GET /sales

* Retorna todas as vendas cadastradas no banco de dados, ordenadas pelos campos saleId e productId.

##### GET /sales/:id

* Retorna apenas a venda com o id informado na URL.

#### Cadastro de vendas
##### POST /sales
* Cadastra uma nova venda no banco de dados.
* O corpo da requisição deve seguir o seguinte formato:
```
[  {    "productId": 1,    "quantity": 1  },  {    "productId": 2,    "quantity": 5  }]
```
 - É possível cadastrar a venda de vários produtos através de uma única requisição.
#### Deleção de vendas
##### DELETE /sales/:id
* Deleta a venda com o id informado na URL.
  </details>

## Nota final no projeto
![store-manager-grade](https://github.com/ErickArgollo/project-Store-Manager/blob/main/grade.png)

## Rodando localmente
 ### Requisitos
 * Nodejs 16 + 
 * Docker
 * Docker-compose

### Clonar no seu computador ( SSH ) 
 No terminal 
`https://github.com/ErickArgollo/project-Store-Manager`

### Iniciando o projeto 
 Após clonar, execute o docker compose na pasta raiz do projeto, executando o comando

` docker-compose up -d --build`

Execute o container e instale os pacotes da aplicação: 
`docker exec -it store_manager bash`
`npm install`

Rode a aplicação com o comando:
`npm start`

A visualização e utilização dos endpoints pode ser feita através do postman, thunderclient, etc.

## Como contribuir no projeto
  1. Faça um **fork** do projeto;
  2. Crie uma nova branch com as suas alterações: `git checkout -b my-feature`;
  3. Salve as alterações e crie uma mensagem de commit contando o que você fez: `git commit -m "feature: My new feature"`;
  4. Envie as suas alterações: `git push origin my-feature`;
  5. Abra o seu pull-request na página do GitHub.<br><br>

  ## Licença
  Esse projeto está sob a licença:
  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen"><br><br>
  
##  Autor
<a href="https://www.linkedin.com/in/erick-argollo/">
 <b>Erick Argollo dos Santos Rangel</b></a> <a href="https://www.linkedin.com/in/erick-argollo/"></a>
