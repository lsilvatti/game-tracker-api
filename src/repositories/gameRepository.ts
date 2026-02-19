import { type Game } from '../types/game/index.js';

const games: Game[] = [];

export interface GameRepository {
    getAllGames: () => Promise<Game[]>;
    addGame: (game: Game) => Promise<Game>;
    updateGame: (id: string, updatedFields: Partial<Game>) => Promise<Game | null>;
    deleteGame: (id: string) => Promise<boolean>;
    findGames: (parameters: Partial<Game>) => Promise<Game[]>;
}

export default function GameRepository(): GameRepository {
    
    const getAllGames = async (): Promise<Game[]> => {
        return [...games];
    };

    const addGame = async (game: Game): Promise<Game> => {
        games.push(game);
        return game;
    }

    const updateGame = async (id: string, updatedFields: Partial<Game>): Promise<Game | null> => {
        const game = games.find((game) => game.id === id);
        
        if (game) {
            Object.assign(game, updatedFields);
            return game;
        }
        return null;
    }

    const deleteGame = async (id: string): Promise<boolean> => {
        const index = games.findIndex((game) => game.id === id);
        if (index !== -1) {
            games.splice(index, 1);
            return true;
        }
        return false;
    }

    const findGames = async (parameters: Partial<Game>): Promise<Game[]> => {

        // REWVIEW: aqui é importante garantir que a busca seja feita de forma segura, para evitar possíveis injeções ou buscas maliciosas. Por exemplo, se o parâmetro for uma string, é importante escapar caracteres especiais, ou usar uma biblioteca de consulta segura, caso esteja usando um banco de dados. No caso desse repositório em memória, como estamos apenas filtrando um array, não temos esse risco, mas é algo a se considerar quando for implementar o repositório com um banco de dados real.
        // exemplo de busca insegura: games.filter(game => game.name.includes(parameters.name)) - se parameters.name for algo como '"; DROP TABLE games; --', isso poderia causar um problema de injeção. Já com uma busca segura, isso não seria um problema.
        // nesse caso, é importante também validar os parâmetros de busca, para garantir que eles sejam do tipo esperado, e evitar erros ou comportamentos inesperados.
        return games.filter((game) => {
            return Object.entries(parameters).every(([key, value]) => {
                return game[key as keyof Game] === value;
            });
        });
    };

    return ({
        getAllGames,
        addGame,
        updateGame,
        deleteGame,
        findGames,
    });
}