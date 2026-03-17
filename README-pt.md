# 🎮 Game Tracker API

Uma API RESTful para gerenciar sua coleção e backlog de videogames, construída com Node.js, Express e TypeScript.

Baseada neste [repositório incrível](https://github.com/zabeu-engineer/back-to-the-backend/tree/main) de Marcio Zabeu. Criada com amor (e conhecimento).

---

## 📋 Índice

- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Pré-requisitos](#-pré-requisitos)
- [Primeiros Passos](#-primeiros-passos)
- [Endpoints da API](#-endpoints-da-api)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Documentação da API](#-documentação-da-api)
- [Visão de Arquitetura](#-visão-de-arquitetura)
- [TODO / Roadmap](#-todo--roadmap)
- [Licença](#-licença)

---

## ✨ Funcionalidades

- **Gerenciamento de Coleção de Jogos**: Adicione, visualize, pesquise e exclua jogos da sua coleção
- **Rastreamento de Status**: Acompanhe seu progresso com os estados: `backlog`, `jogando`, `finalizado`
- **Suporte a Múltiplas Plataformas**: Acompanhe jogos em plataformas clássicas (NES, SNES, Mega Drive, GameBoy, PS1, N64)
- **Validação de Entrada**: Validação completa das requisições usando schemas Joi
- **Documentação Swagger**: Documentação interativa da API com Swagger UI
- **Arquitetura Limpa**: Arquitetura em camadas com Controllers, Services e Repositories
- **TypeScript**: Segurança de tipos total com TypeScript
- **Desligamento Elegante**: Encerramento adequado do servidor

---

## 🛠 Tecnologias

| Tecnologia   | Finalidade                  |
|--------------|-----------------------------|
| **Node.js**  | Ambiente de execução        |
| **Express 5**| Framework web               |
| **TypeScript**| JavaScript tipado          |
| **Sequelize**| ORM para banco de dados     |
| **PostgreSQL**| Banco de dados relacional  |
| **Joi**      | Validação de requisições    |
| **Swagger**  | Documentação da API         |
| **Docker**   | Containerização do banco    |

---

## 📁 Estrutura do Projeto

```
game-tracker-api/
├── postgresql/
│   └── compose.yaml          # Docker Compose para PostgreSQL
├── src/
│   ├── app.ts                # Configuração do Express
│   ├── server.ts             # Ponto de entrada do servidor
│   ├── config/
│   │   ├── database.ts       # Configuração do Sequelize
│   │   ├── env.ts            # Variáveis de ambiente
│   │   └── swagger.ts        # Configuração do Swagger
│   ├── controllers/
│   │   └── game/             # Controller de jogos
│   ├── docs/
│   │   └── game.docs.yaml    # Documentação OpenAPI/Swagger
│   ├── helpers/
│   │   └── apiError.ts       # Handler de erros customizado
│   ├── middlewares/
│   │   ├── error.ts          # Middleware global de erros
│   │   ├── logger.ts         # Middleware de logs
│   │   └── validation/       # Middlewares de validação
│   ├── repositories/
│   │   └── game/             # Camada de acesso a dados
│   ├── routes/
│   │   └── game/             # Definição das rotas de jogos
│   ├── schemas/
│   │   └── game/             # Schemas Joi de validação
│   ├── services/
│   │   └── game/             # Camada de lógica de negócio
│   └── types/
│       └── game/             # Tipos TypeScript
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📦 Pré-requisitos

- **Node.js** v18 ou superior
- **npm** ou **yarn**
- **Docker** (para o banco PostgreSQL)

---

## 🚀 Primeiros Passos

### 1. Clone o Repositório

```bash
git clone https://github.com/your-username/game-tracker-api.git
cd game-tracker-api
```

### 2. Instale as Dependências

```bash
npm install
```

### 3. Inicie o PostgreSQL com Docker

```bash
cd postgresql
docker compose up -d
```

Isso iniciará um container PostgreSQL com:
- **Database**: `game_tracker_db`
- **User**: `admin`
- **Password**: `admin123`
- **Port**: `5432`

### 4. Configure as Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000
NODE_ENV=development

# Banco de Dados
DB_HOST=localhost
DB_PORT=5432
DB_NAME=game_tracker_db
DB_USERNAME=admin
DB_PASSWORD=admin123
```

### 5. Inicie o Servidor de Desenvolvimento

```bash
npm run dev
```

O servidor iniciará em `http://localhost:3000` com hot-reload habilitado.

### 6. Acesse a Documentação da API

Abra o navegador e acesse: `http://localhost:3000/api-docs`

---

## 🔌 Endpoints da API

### Jogos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/games` | Listar todos os jogos |
| `POST` | `/games` | Adicionar um novo jogo |
| `DELETE` | `/games/:id` | Excluir um jogo pelo ID |
| `GET` | `/games/search` | Buscar jogos com filtros |
| `PATCH` | `/games/:id/status` | Atualizar status do jogo |

### Exemplos de Requisição/Resposta

#### Adicionar um Novo Jogo

```bash
POST /games
Content-Type: application/json

{
  "title": "Super Mario World",
  "year": 1990,
  "platform": "SNES",
  "genre": ["Platformer", "Adventure"],
  "status": "backlog"
}
```

#### Buscar Jogos

```bash
GET /games/search?platform=SNES&status=jogando
```

#### Atualizar Status do Jogo

```bash
PATCH /games/:id/status
Content-Type: application/json

{
  "status": "finalizado"
}
```

### Status dos Jogos

| Status      | Descrição                                 |
|-------------|-------------------------------------------|
| `backlog`   | Jogos que você possui mas não começou     |
| `jogando`   | Jogos que você está jogando atualmente    |
| `finalizado`| Jogos que você já terminou                |

### Plataformas Suportadas

- `NES`
- `SNES`
- `Mega Drive`
- `Gameboy`
- `PS1`
- `N64`

---

## 🔐 Variáveis de Ambiente

| Variável      | Descrição                | Padrão    |
|--------------|--------------------------|-----------|
| `PORT`       | Porta do servidor        | `3000`    |
| `NODE_ENV`   | Modo de ambiente         | `local`   |
| `DB_HOST`    | Host do PostgreSQL       | `localhost`|
| `DB_PORT`    | Porta do PostgreSQL      | `5432`    |
| `DB_NAME`    | Nome do banco de dados   | -         |
| `DB_USERNAME`| Usuário do banco         | -         |
| `DB_PASSWORD`| Senha do banco           | -         |

---

## 📚 Documentação da API

A documentação interativa está disponível via **Swagger UI** em `/api-docs` quando em modo de desenvolvimento.

Você também pode acessar a especificação OpenAPI em `/docs.json`.

---

## 🏗 Visão de Arquitetura

O projeto segue o padrão de **arquitetura em camadas**:

```
┌─────────────────────────────────────────────────────┐
│                    Rotas                            │
│         (Define endpoints e middlewares)            │
└─────────────────────┬───────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│                 Controllers                         │
│     (Lida com requisições e respostas HTTP)         │
└─────────────────────┬───────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│                  Services                           │
│         (Lógica de negócio e validação)             │
└─────────────────────┬───────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│                Repositories                         │
│            (Camada de acesso a dados)               │
└─────────────────────────────────────────────────────┘
```

### Princípios

- **Separação de Responsabilidades**: Cada camada tem uma responsabilidade única
- **Injeção de Dependências**: Services e repositories são injetados via factories
- **Type Safety**: TypeScript com tipos estritos
- **Validação**: Todas as entradas validadas em middleware usando Joi

---

## 📝 TODO / Roadmap

- [ ] **Integrar PostgreSQL**: Substituir armazenamento em memória por models Sequelize conectados ao PostgreSQL
- [ ] **Criar Imagem Docker**: Adicionar Dockerfile para a API e setup multi-container
- [ ] **Adicionar Mais Operações**:
  - [ ] Buscar jogo por ID (`GET /games/:id`)
  - [ ] Atualizar detalhes do jogo (`PUT /games/:id`)
  - [ ] Operações em lote (adicionar/excluir múltiplos jogos)
  - [ ] Paginação nos endpoints de listagem
  - [ ] Ordenação e filtros avançados
- [ ] **Integração IGDB**: Integrar com a [IGDB API](https://api-docs.igdb.com/) para:
  - [ ] Preencher metadados automaticamente (título, gêneros, plataformas, capa)
  - [ ] Validar dados do jogo com IGDB na criação
  - [ ] Sincronizar informações adicionais (resumo, datas de lançamento, avaliações, screenshots)
- [ ] **Funcionalidades Adicionais**:
  - [ ] Autenticação e autorização de usuários
  - [ ] Avaliações e reviews de jogos
  - [ ] Armazenamento de screenshots/capas
  - [ ] Exportar/importar listas de jogos
  - [ ] Dashboard de estatísticas (por status, plataforma, etc.)
- [ ] **Testes**:
  - [ ] Unitários com Jest
  - [ ] Integração
  - [ ] E2E
- [ ] **CI/CD**:
  - [ ] Pipeline GitHub Actions
  - [ ] Testes automatizados em PR
  - [ ] Deploy automatizado

---

## 👤 Autor

**Leonardo Silvatti**
