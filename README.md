# chat_socket.io
projeto fullstack de construção de chat utilizando node, ExpressJS, socket.io, mongodb, react e css.

INSTALAÇÃO:
- No terminal, cole o comando git clone git@github.com:GiseleViedenhelfen/chat_socket.io.git.
- Troque a pasta para a pasta do projeto.
- Abra o projeto no vscode.
- Navegue na pasta /backend e adicione um arquivo .env e adicione as variáveis de acordo com o modelo a seguir:
  DB_URL=mongodb://mongodb:27017/chat_socketio
  DB_NAME=chat_socketio
  JWT_SECRET=yourSecretTokenDontTellAnyone
- Volte para a raiz do projeto.
- Certificando-se de que tem docker e docker-compose instalados em seu computador, basta rodar o comando "docker-compose up" e as dependências do projeto serão instaladas
e o backend estará disponível na porta "localhost:3001" e o frontend em "localhost:3000".

PARA ADICIONAR USUÁRIOS:
No frontend, clique em "cadastro" e preencha os campos de nome, cpf e senha e clique em "enviar".
Será feito o registro no banco de dados com o usuário ou, em caso de algum problema, será enviado mensagem de erro.

PARA CONVERSAR COM OUTROS USUÁRIOS:
Para simular a conversa entre dois atores ou mais, é necessário que cada usuário faça login por um navegador diferente.

CONVERSAS SIMULTÂNEAS:
A aplicação simula as conversas, porém ainda está em aperfeiçoamento.

RESETAR USUÁRIOS:

Utilize uma plataforma como o insomnia e acesse a rota do tipo DELETE com o caminho "http://localhost:3001" e clique em "send".
Essa ação irá deletar todos os usuários do banco de dados, sendo necessário cadastrar novos usuários para utilizar a aplicação.
