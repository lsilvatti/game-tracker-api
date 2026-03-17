# 🎮 Game Tracker API

A RESTful API for tracking your video game collection and backlog, built with Node.js, Express, and TypeScript.

Based on [this awesome repository](https://github.com/zabeu-engineer/back-to-the-backend/tree/main) by Marcio Zabeu. Created with love (and knowledge).

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
- [API Endpoints](#-api-endpoints)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Architecture Overview](#-architecture-overview)
- [TODO / Roadmap](#-todo--roadmap)
- [License](#-license)

---

## ✨ Features

- **Game Collection Management**: Add, view, search, and delete games from your collection
- **Status Tracking**: Track your gaming progress with states: `backlog`, `playing`, `completed`
- **Multi-Platform Support**: Track games across classic platforms (NES, SNES, Mega Drive, GameBoy, PS1, N64)
- **Input Validation**: Comprehensive request validation using Joi schemas
- **Swagger Documentation**: Interactive API documentation with Swagger UI
- **Clean Architecture**: Layered architecture with Controllers, Services, and Repositories
- **TypeScript Support**: Full type safety with TypeScript
- **Graceful Shutdown**: Proper server shutdown handling

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **Express 5** | Web framework |
| **TypeScript** | Type-safe JavaScript |
| **Sequelize** | ORM for database operations |
| **PostgreSQL** | Relational database |
| **Joi** | Request validation |
| **Swagger** | API documentation |
| **Docker** | Database containerization |

---

## 📁 Project Structure

```text
game-tracker-api/
├── postgresql/
│   └── compose.yaml          # Docker Compose for PostgreSQL
├── src/
│   ├── app.ts                # Express application setup
│   ├── server.ts             # Server entry point
│   ├── config/
│   │   ├── database.ts       # Sequelize database configuration
│   │   ├── env.ts            # Environment variables
│   │   └── swagger.ts        # Swagger documentation setup
│   ├── controllers/
│   │   └── game/             # Game controller (request handling)
│   ├── docs/
│   │   └── game.docs.yaml    # OpenAPI/Swagger documentation
│   ├── helpers/
│   │   └── apiError.ts       # Custom API error handler
│   ├── middlewares/
│   │   ├── error.ts          # Global error middleware
│   │   ├── logger.ts         # Request logger middleware
│   │   └── validation/       # Validation middlewares (body, param, query)
│   ├── repositories/
│   │   └── game/             # Game data access layer
│   ├── routes/
│   │   └── game/             # Game routes definition
│   ├── schemas/
│   │   └── game/             # Joi validation schemas
│   ├── services/
│   │   └── game/             # Business logic layer
│   └── types/
│       └── game/             # TypeScript type definitions
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📦 Prerequisites

- **Node.js** v18 or higher
- **npm** or **yarn**
- **Docker** (for PostgreSQL database)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/game-tracker-api.git
cd game-tracker-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start PostgreSQL with Docker

```bash
cd postgresql
docker compose up -d
```

This will start a PostgreSQL container with:
- **Database**: `game_tracker_db`
- **User**: `admin`
- **Password**: `admin123`
- **Port**: `5432`

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=game_tracker_db
DB_USERNAME=admin
DB_PASSWORD=admin123
```

### 5. Start the Development Server

```bash
npm run dev
```

The server will start on `http://localhost:3000` with hot-reload enabled.

### 6. Access API Documentation

Open your browser and navigate to: `http://localhost:3000/api-docs`

---

## 🔌 API Endpoints

### Games

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/games` | Get all games |
| `POST` | `/games` | Add a new game |
| `DELETE` | `/games/:id` | Delete a game by ID |
| `GET` | `/games/search` | Search games with filters |
| `PATCH` | `/games/:id/status` | Update game status |

### Request/Response Examples

#### Add a New Game

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

#### Search Games

```bash
GET /games/search?platform=SNES&status=playing
```

#### Update Game Status

```bash
PATCH /games/:id/status
Content-Type: application/json

{
  "status": "completed"
}
```

### Game Statuses

| Status | Description |
|--------|-------------|
| `backlog` | Games you own but haven't started |
| `playing` | Games you're currently playing |
| `completed` | Games you've finished |

### Supported Platforms

- `NES`
- `SNES`
- `Mega Drive`
- `Gameboy`
- `PS1`
- `N64`

---

## 🔐 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment mode | `local` |
| `DB_HOST` | PostgreSQL host | `localhost` |
| `DB_PORT` | PostgreSQL port | `5432` |
| `DB_NAME` | Database name | - |
| `DB_USERNAME` | Database user | - |
| `DB_PASSWORD` | Database password | - |

---

## 📚 API Documentation

Interactive API documentation is available via **Swagger UI** at `/api-docs` when running in development mode.

You can also access the raw OpenAPI specification at `/docs.json`.

---

## 🏗 Architecture Overview

The project follows a **layered architecture** pattern:

```text
┌─────────────────────────────────────────────────────┐
│                    Routes                           │
│         (Define endpoints & middlewares)            │
└─────────────────────┬───────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│                 Controllers                         │
│     (Handle HTTP requests/responses)                │
└─────────────────────┬───────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│                  Services                           │
│         (Business logic & validation)               │
└─────────────────────┬───────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────┐
│                Repositories                         │
│            (Data access layer)                      │
└─────────────────────────────────────────────────────┘
```

### Key Principles

- **Separation of Concerns**: Each layer has a single responsibility
- **Dependency Injection**: Services and repositories are injected via factory functions
- **Type Safety**: Full TypeScript support with strict types
- **Validation**: All inputs validated at the middleware level using Joi

---

## 📝 TODO / Roadmap

- [ ] **Integrate PostgreSQL**: Replace in-memory storage with Sequelize models connected to PostgreSQL
- [ ] **Create Docker Image**: Add Dockerfile for the API and multi-container docker-compose setup
- [ ] **Add More Operations**:
  - [ ] Get single game by ID (`GET /games/:id`)
  - [ ] Update game details (`PUT /games/:id`)
  - [ ] Bulk operations (add/delete multiple games)
  - [ ] Pagination support for list endpoints
  - [ ] Sorting and advanced filtering
- [ ] **IGDB Integration**: Integrate with the [IGDB API](https://api-docs.igdb.com/) to:
  - [ ] Auto-fill game metadata (title, genres, platforms, cover art) by searching IGDB
  - [ ] Validate game data against IGDB records on creation
  - [ ] Sync additional game info (summary, release dates, ratings, screenshots)
- [ ] **Additional Features**:
  - [ ] User authentication & authorization
  - [ ] Game ratings and reviews
  - [ ] Screenshots/cover art storage
  - [ ] Export/import game lists
  - [ ] Statistics dashboard (games by status, platform, etc.)
- [ ] **Testing**:
  - [ ] Unit tests with Jest
  - [ ] Integration tests
  - [ ] E2E tests
- [ ] **CI/CD**:
  - [ ] GitHub Actions pipeline
  - [ ] Automated testing on PR
  - [ ] Deployment automation

---

## 👤 Author

**Leonardo Silvatti**
