# Fórum DEG RESTful API

[![Heroku](http://heroku-badge.herokuapp.com/?app=angularjs-crypto&style=flat&svg=1&root=index.html)](https://forumdeg.herokuapp.com)

Contruido em `Nodejs` e `RethinkDB`. 

## Rotas

* `/api` - Rota principal da aplicação
  * [`/users`](#Users) - Rota de acesso para os usuários


### Users

Aceita os métodos de `GET`, `POST`, `UPDATE`, `DELETE`.

#### GET

Exemplo `/api/users` ou `/api/users/:id`

#### POST

Acionado via URL Query.   
Exemplo `/api/users?name=UserName&password=Password`
