# Fórum DEG RESTful API

[![Heroku](http://heroku-badge.herokuapp.com/?app=angularjs-crypto&style=flat&svg=1&root=index.html)](https://forumdeg.herokuapp.com)

Contruido em `Nodejs` e `RethinkDB`.

## [Documentação](https://github.com/fga-gpp-mds/2017.1-DEG-API/wiki)

## Instalação

* ### Instalação do Nodejs
Entre no [website do Nodejs](https://nodejs.org/en/), vá para os [downloads](https://nodejs.org/en/download/), selecione sua plataforma e faça o download da vesão atual (Current Version).    
Siga os passos do instalador.
* ### Instalação do Yarn
Para instalar o Yarn siga os passos no [website oficial](https://yarnpkg.com/en/docs/install).
* ### Instalação do RethinkDB
Instale o RethinkDB utilizando os passos providos no [website oficial](https://www.rethinkdb.com/docs/install/) para sua plataforma.
## Utilização da API
* Para começar a utilizar a API, clone o repositório:    
```git clone https://github.com/fga-gpp-mds/2017.1-DEG-API.git```     
* Vá para a pasta raiz e digite o comando `yarn`, para instalar todas as dependências necessárias.    
* Após isso abra outra aba do seu terminal e rode o comando `rethinkdb` na raiz da pasta do projeto. (Toda vez que esse comando é executado, caso não exista uma pasta rethinkdb ela é criada para armazenar os dados, então tente sempre rodar no mesmo diretório)    
* Logo após rode o comando `yarn run seed`, para popular o banco local.    
* Então rode o comando `yarn run dev`, para ligar a API na porta 3000.
* Para a utilização da API é recomendavel a utilização de alguma ferramenta que gerencie requisições http. Para tanto recomendamos a utilização do [Postman](https://www.getpostman.com).
   * Caso queira, existe um [arquivo com as requisições já configuradas]() para o Postman. Apenas vá na opção import e selecione o arquivo.

## Comandos disponíveis
* `yarn run start`: Roda a aplicação com configurações de produção.
* `yarn run dev`: Roda a aplicação com configurações de desenvolvimento.
* `yarn run seed`: Limpa e popula o banco de dados local.
* `yarn run coverage`: Roda os testes unitários juntamente com a cobertura de código.
* `yarn run show-coverage`: Abre a interface de cobertura de código.
