Segue abaixo a versão revisada da documentação, agora com as novas rotas e dependências adicionadas:

---

# teste-Dvexbit

Este projeto é uma API desenvolvida em Node.js com Express e TypeScript, com o objetivo de gerenciar tarefas (CRUD) e usuários, além de realizar autenticação. A API utiliza o Prisma para interação com o banco de dados PostgreSQL, conta com validações, tratamento centralizado de erros e proteção das rotas através de um middleware de autenticação.

## Sumário

- [Recursos](#recursos)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação e Configuração](#instalação-e-configuração)
- [Endpoints da API](#endpoints-da-api)
  - [Rotas de Tarefas](#rotas-de-tarefas)
  - [Rotas de Usuário](#rotas-de-usuário)
  - [Rota de Autenticação](#rota-de-autenticação)
- [Tratamento de Erros](#tratamento-de-erros)
- [Dependências](#dependências)

## Recursos

- **CRUD de Tarefas:** Criação, listagem, visualização, atualização e exclusão de tarefas.
- **Gerenciamento de Usuários:** Cadastro, listagem, visualização, atualização e exclusão de usuários.
- **Autenticação:** Endpoint dedicado para login que retorna token de acesso, permitindo o acesso protegido às demais rotas.
- **Validação de Dados:** Verificação se os campos obrigatórios foram preenchidos corretamente.
- **Tratamento Centralizado de Erros:** Middleware que diferencia erros esperados (usando a classe `AppError`) de erros inesperados.
- **Integração com Prisma:** Facilita a comunicação com o banco de dados.

## Tecnologias Utilizadas

- **Node.js** e **Express** – Criação do servidor e gerenciamento de rotas.
- **TypeScript** – Tipagem estática para maior robustez no desenvolvimento.
- **Prisma** – ORM para interação com o banco de dados.
- **Dotenv** – Gerenciamento de variáveis de ambiente.
- **UUID** – Geração de identificadores únicos.
- **Validator** – Validação de campos e dados de entrada.
- **http-status-codes** – Utilização de constantes para os códigos de status HTTP.
- **Bcrypt** – Criptografia de senhas.
- **JSON Web Token (JWT)** – Geração e verificação de tokens de autenticação.
- **Swagger UI Express** – Documentação interativa da API.
- **Jest e Supertest** – Ferramentas para testes.

## Instalação e Configuração

1. **Clone o Repositório**

   ```bash
   git clone https://github.com/LianMiranda/teste-Dvexbit
   cd nome-do-projeto
   ```

2. **Instale as Dependências**

   Utilize o npm (ou yarn) para instalar as dependências:

   ```bash
   npm install
   ```

3. **Configuração das Variáveis de Ambiente**

   Crie um arquivo `.env` na raiz do projeto e defina as variáveis necessárias, conforme demonstrado no arquivo `.env.example`.

4. **Executar Migrações**

   ```bash
   npx prisma migrate dev
   ```

5. **Gere o Prisma Client**

   ```bash
   npx prisma generate
   ```

6. **Inicie a Aplicação**

   Para rodar a aplicação em ambiente de desenvolvimento, utilize:

   ```bash
   npm run dev
   ```

7. **Para rodar com Postman**

   Importe o arquivo `TodoList.postman_collection` no Postman.


## Documentação com Swagger
Acesse a documentação da API via Swagger na rota `/docs`. Realize o cadastro e o login para obter seu token de acesso. Em seguida, clique no botão verde **Authorize** e insira o token para autenticar todas as rotas.

## Endpoints da API

### Rotas de Tarefas

Todas as rotas de tarefas estão protegidas por autenticação (middleware `auth`).

- **Criar Tarefa**
  - **POST /task**
  - **Body (JSON):**
    ```json
    {
      "titulo": "Nome da Tarefa",
      "descricao": "descrição",
      "dataDaAtividade": "2025-03-09",
      "userId": "1232131231231"
    }
    ```
  - **Resposta:**  
    - **Status:** 201 (Created)  
    - **Body:** `{ "message": "Tarefa criada com sucesso", task: { ... } }`

- **Listar Todas as Tarefas**
  - **GET /tasks**
  - **Resposta:**  
    - **Status:** 200 (OK)  
    - **Body:** Array contendo todas as tarefas

- **Obter Tarefa por ID**
  - **GET /task/:id**
  - **Parâmetro:** `id` da tarefa
  - **Resposta:**  
    - **Status:** 200 (OK)  
    - **Body:** Objeto com os dados da tarefa

- **Atualizar Tarefa**
  - **PUT /task/:id**
  - **Parâmetro:** `id` da tarefa
  - **Body (JSON):**
    ```json
    {
      "titulo": "Novo Título",
      "descricao": "Nova descrição",
      "dataDaAtividade": "2025-03-10"
    }
    ```
  - **Resposta:**  
    - **Status:** 200 (OK)  
    - **Body:** `{ "message": "Tarefa atualizada com sucesso", task: { ... } }`

- **Deletar Tarefa**
  - **DELETE /task/:id**
  - **Parâmetro:** `id` da tarefa
  - **Resposta:**  
    - **Status:** 200 (OK)
    - **Body:** `{ "message": "Tarefa com o id 1232131231231 deletada com sucesso!" }`

### Rotas de Usuário

As rotas para gerenciamento de usuários também contam com proteção via middleware de autenticação, exceto na criação do usuário.

- **Criar Usuário**
  - **POST /user**
  - **Body (JSON):**
    ```json
    {
      "email": "email@gmail.com",
      "password": "1234",
      "firstName": "nome",
      "lastName": "sobrenome"
    }
    ```
  - **Resposta:**  
    - **Status:** 201 (Created)  
    - **Body:** `{ "message": "Usuário criado com sucesso", user: { ... } }`

- **Listar Todos os Usuários**
  - **GET /users**
  - **Resposta:**  
    - **Status:** 200 (OK)  
    - **Body:** Array contendo todos os usuários

- **Obter Usuário por ID**
  - **GET /user/:id**
  - **Parâmetro:** `id` do usuário
  - **Resposta:**  
    - **Status:** 200 (OK)  
    - **Body:** Objeto com os dados do usuário

- **Atualizar Usuário**
  - **PUT /user/:id**
  - **Parâmetro:** `id` do usuário
  - **Body (JSON):**
    ```json
    {
      "email": "novoemail@gmail.com",
      "password": "novasenha",
      "actualPassword": "senhaantiga",
      "firstName": "novo nome",
      "lastName": "novo sobrenome"
    }   
    ```
  - **Resposta:**  
    - **Status:** 200 (OK)  
    - **Body:** `{ "message": "Usuário atualizado com sucesso", user: { ... } }`

- **Deletar Usuário**
  - **DELETE /user/:id**
  - **Parâmetro:** `id` do usuário
  - **Resposta:**  
    - **Status:** 200 (OK)
    - **Body:** `{ "message": "Usuário com o id 123 deletado com sucesso!" }`

### Rota de Autenticação

- **Autenticação**
  - **POST /auth**
  - **Body (JSON):**
    ```json
    {
      "email": "email@exemplo.com",
      "senha": "senha_secreta"
    }
    ```
  - **Descrição:** Este endpoint realiza a autenticação do usuário e, caso os dados estejam corretos, retorna um token JWT para acesso às rotas protegidas.
  - **Resposta:**  
    - **Status:** 200 (OK)  
    - **Body:** `{ "token": "seu_token_jwt"}`

## Tratamento de Erros

O projeto conta com um middleware de erros que intercepta e trata as exceções ocorridas durante as requisições. Ele diferencia entre:

- **Erros Conhecidos:** Instâncias da classe `AppError` são tratadas de forma personalizada, retornando o status e a mensagem definidos.
- **Erros Desconhecidos:** São logados no console e retorna uma resposta genérica com status 500 (Internal Server Error).

Exemplo de middleware de erro:

```typescript
export function errorMiddleware(
    err: Error | AppError,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
                status: 'error',
                message: err.message,
        });
        return;
    }

    console.error(err); 

    res.status(500).json({
                status: 'error',
                message: 'Internal Server Error',
    });
}
```

## Dependências

### DevDependencies

```json
"devDependencies": {
  "@types/bcrypt": "^5.0.2",
  "@types/express": "^5.0.0",
  "@types/jsonwebtoken": "^9.0.9",
  "@types/node": "^22.13.9",
  "prisma": "^6.4.1",
  "ts-node": "^10.9.2",
  "tsx": "^4.19.3",
  "typescript": "^5.8.2"
}
```

### Dependencies

```json
"dependencies": {
  "@prisma/client": "^6.4.1",
  "@types/jest": "^29.5.14",
  "@types/supertest": "^6.0.2",
  "@types/swagger-ui-express": "^4.1.8",
  "bcrypt": "^5.1.1",
  "dotenv": "^16.4.7",
  "express": "^4.21.2",
  "http-status-codes": "^2.3.0",
  "jest": "^29.7.0",
  "jsonwebtoken": "^9.0.2",
  "supertest": "^7.0.0",
  "swagger-ui-express": "^5.0.1",
  "ts-jest": "^29.2.6",
  "uuid": "^11.1.0",
  "validator": "^13.12.0"
}
```

---

### Mapeamento das Rotas (Exemplo de Configuração de Rotas)

```typescript
// Rotas de Tarefas (com middleware de autenticação)
router.post("/task", auth, TaskController.create);
router.get("/tasks", auth, TaskController.findAll);
router.get("/task/:id", auth, TaskController.findById);
router.put("/task/:id", auth, TaskController.update);
router.delete("/task/:id", auth, TaskController.delete);

// Rotas de Usuário
router.post("/user", UserController.create);
router.get("/users", auth, UserController.findAll);
router.get("/user/:id", auth, UserController.findById);
router.put("/user/:id", auth, UserController.update);
router.delete("/user/:id", auth, UserController.delete);

// Rota de Autenticação
router.post("/auth", AuthController.login);
```