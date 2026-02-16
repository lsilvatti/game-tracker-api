import { type IGameRepository} from '@repositories/game/index.js';
import type { CreateGameDTO, Game } from 'src/types/index.js';

export interface IGameService {
    getAllGames: () => Promise<Game[]>;
    addGame: (game: CreateGameDTO) => Promise<Game>;
    deleteGame: (id: string) => Promise<boolean>;
    findGame: (parameters: Partial<Game>) => Promise<Game | undefined>;
    findGames: (parameters: Partial<Game>) => Promise<Game[]>;
}

export default function gameService(repository: IGameRepository) {

    const getAllGames = async () => {
        return await repository.getAllGames();
    };

    const addGame = async (game: CreateGameDTO) => {
        const gameObject = {
            id: crypto.randomUUID(),
            ...game,
        }

        return await repository.addGame(gameObject);        
    };

    const deleteGame = async (id: string) => {
        return await repository.deleteGame(id);
    };

    const findGame = async (parameters: Partial<Game>) => {
        return await repository.findGame(parameters);
    };

    const findGames = async (parameters: Partial<Game>) => {
        return await repository.findGames(parameters);
    };

    return ({
        getAllGames,
        addGame,
        deleteGame,
        findGame,
        findGames
    }); 
}