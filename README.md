# API de Transferências e Usuários

Esta API permite o registro, login, consulta de usuários e transferências de valores entre usuários, com regras de negócio para aprendizado de testes e automação de API.

## Tecnologias
- Node.js
- Express
- Swagger (documentação)

## Instalação

1. Clone o repositório ou copie os arquivos para sua máquina.
2. Instale as dependências:
   ```
npm install express swagger-ui-express
   ```

## Como rodar a API

1. Inicie o servidor:
   ```
node server.js
   ```
2. Acesse a documentação Swagger em: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Endpoints principais

- `POST /api/users/register` — Registro de usuário
- `POST /api/users/login` — Login de usuário
- `GET /api/users` — Listar usuários
- `POST /api/transfers` — Realizar transferência

## Regras de negócio
- Login exige usuário e senha.
- Não é permitido registrar usuários duplicados.
- Transferências para destinatários não favorecidos só podem ser feitas se o valor for menor que R$ 5.000,00.
- O banco de dados é em memória (os dados são perdidos ao reiniciar o servidor).

## Estrutura de diretórios
- `controller/` — Rotas e controllers
- `service/` — Lógica de negócio
- `model/` — Dados em memória
- `app.js` — Configuração do Express
- `server.js` — Inicialização do servidor
- `swagger.json` — Documentação da API

## Testes
Para testar a API, utilize ferramentas como Postman, Insomnia ou scripts automatizados (ex: Supertest).
