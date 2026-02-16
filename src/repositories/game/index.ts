import { type Game } from '../../types/game/index.js';

const games: Game[] = [];

export const getAllGames = (): Game[] => {
  return games;
};

export const addGame = (game: Game): void => {
  games.push(game);
}

export const deleteGame = (id: string): void => {
    const index = games.findIndex((game) => game.id === id);
    if (index !== -1) {
        games.splice(index, 1);
    }
}

export const findGame = (parameters: Partial<Game>): Game | undefined => {
    return games.find((game) => {
        return Object.entries(parameters).every(([key, value]) => {
            return game[key as keyof Game] === value;
        });
    });
};