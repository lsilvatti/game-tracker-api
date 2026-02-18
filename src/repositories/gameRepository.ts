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