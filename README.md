# teste-Dvexbit

Este projeto é uma API desenvolvida em Node.js com Express e TypeScript, com o objetivo de gerenciar tarefas (CRUD). Ele utiliza o Prisma para interação com o banco de dados, além de contar com validações e tratamento de erros centralizado.

## Sumário

- [Recursos](#recursos)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação e Configuração](#instalação-e-configuração)
- [Endpoints da API](#endpoints-da-api)
- [Tratamento de Erros](#tratamento-de-erros)
- [Dependências](#dependências)


## Recursos

- **CRUD de Tarefas:** Criação, listagem, visualização, atualização e exclusão de tarefas.
- **Validação de Dados:** Verificação se os campos obrigatórios foram preenchidos corretamente.
- **Tratamento Centralizado de Erros:** Utilização de um middleware que diferencia erros esperados (usando uma classe `AppError`) de erros inesperados.
- **Integração com Prisma:** Facilita a interação com o banco de dados.

## Tecnologias Utilizadas

- **Node.js** e **Express** – Criação do servidor e gerenciamento de rotas.
- **TypeScript** – Tipagem estática para maior robustez no desenvolvimento.
- **Prisma** – ORM para comunicação com o banco de dados.
- **Dotenv** – Gerenciamento de variáveis de ambiente.
- **UUID** – Geração de identificadores únicos para as tarefas.
- **Validator** – Validação de campos e dados de entrada.
- **http-status-codes** – Utilização de constantes para os códigos de status HTTP.

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

   Crie um arquivo `.env` na raiz do projeto e defina as variáveis necessárias, como demonstrado no arquivo .env.example


4. **Executar Migrações (se aplicável)**

   ```bash
   npx prisma migrate dev
   ```

5. **Inicie a Aplicação**
   Para rodar a aplicação em ambiente de desenvolvimento, você pode utilizar:

   ```bash
   npm run dev
   ```

## Endpoints da API

### Rotas de Tarefas

- **Criar Tarefa**
  - **POST /task**
  - **Body (JSON):**
    ```json
    {
      "titulo": "Nome da Tarefa",
      "descricao": "descrição",
      "dataDaAtividade": "2025-03-09"
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
      "descricao": "descrição",
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
    - **Status:** 200 (OK) ou 204 (No Content)  
    - **Body:** `{message: "Tarefa com o id 123 deletada com sucesso!"}`

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
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
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

- **@types/express:** Tipagem para Express.
- **@types/node:** Tipagem para Node.js.
- **prisma:** ORM para gerenciamento do banco de dados.
- **tsx:** Ferramenta para execução de TypeScript.
- **typescript:** Linguagem de programação.

### Dependencies

- **@prisma/client:** Cliente para conexão com o banco de dados usando Prisma.
- **dotenv:** Gerenciamento de variáveis de ambiente.
- **express:** Framework para criação do servidor.
- **http-status-codes:** Utilitário para gerenciamento dos códigos de status HTTP.
- **uuid:** Geração de identificadores únicos.
- **validator:** Validação de dados de entrada.
