# Lista de Tarefas Full Stack

Este é um projeto full stack de uma lista de tarefas que inclui autenticação de usuários e gerenciamento de tarefas. Os usuários podem se cadastrar, fazer login e logout. Apenas usuários autenticados podem acessar determinadas áreas da aplicação. Eles podem criar, visualizar, editar e excluir suas próprias tarefas, as quais incluem título, descrição, data de criação e status (concluída ou não concluída). A interface da aplicação é limpa, intuitiva e responsiva, utilizando o framework Nuxt.js com o nuxt-quasar-ui para criar elementos de interface consistentes e elegantes.

## Pré-requisitos

- Node.js
- PostgreSQL

## Instalação

### Backend

1. Navegue até o diretório "backend".
2. Execute o comando `npm install` para instalar as dependências.
3. Crie um banco de dados PostgreSQL.
4. Configure o arquivo `.env` com os dados do banco criado. Exemplo:

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/database?schema=public"
```

5. Execute o comando para criar os dados no banco de dados:

```bash
$npx prisma migrate dev --name init
```

6. Inicie o servidor com o comando:

```bash
$npm run start:dev
```

### Frontend

1. Navegue até o diretório "frontend".
2. Execute o comando `npm install` para instalar as dependências.
3. Após a instalação, execute o comando:

```bash
$npm run dev
```

para iniciar a aplicação.

## Tecnologias Utilizadas

#### Backend:
- Nest.js
- Prisma
- PostgreSQL

#### Frontend:
- Nuxt.js
- nuxt-quasar-ui

## Estrutura do Projeto

- `backend/`: Contém o código do servidor backend.
- `frontend/`: Contém o código do cliente frontend.
