
## Criar migrate
npm run knex:migrate:make -- nomemigrate

## Rodar migrations
npm run knex:migrate:latest

## Rodar os dados iniciais
npm run knex:seed:run

## Criar seed
npm run knex:seed:make -- nomesees

table.uuid("id").primary().defaultTo(knex.raw('(UUID())'));



{
	user_id: ''
	session_id: ''
	access_token: ''
	expires_in: ''
}


var http = require('http');

http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
  resp.on('data', function(ip) {
    console.log("My public IP address is: " + ip);
  });
});


git push heroku main