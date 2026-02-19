import type { GameRepository } from '@repositories/index.js';
import apiError from '@helpers/apiError.js';
import type { CreateGameDTO, Game, GameCurrentState } from '../types/game/index.js';
import crypto from 'crypto';
export interface GameService {
    getAllGames: () => Promise<Game[]>;
    addGame: (game: CreateGameDTO) => Promise<Game>;
    deleteGame: (id: string) => Promise<boolean>;
    findGames: (parameters: Partial<Game>) => Promise<Game[]>;
    changeGameStatus: (id: string, status: GameCurrentState) => Promise<Game | null>;
}
// REVIEW acho interessante tipar os retornos também
export default function gameService(repository: GameRepository): GameService {

    const getAllGames = async (): Promise<Game[]> => {
        const games = await repository.getAllGames();
        return games;
    };

    const addGame = async (game: CreateGameDTO): Promise<Game> => {

        // REVIEW - aqui eu geraria o ID do jogo dentro do repositório, ao invés de gerar na camada de serviço. Assim a camada de serviço fica mais focada na lógica de negócio, e a camada de repositório fica responsável por lidar com os detalhes de armazenamento, como geração de IDs, conexões com banco, etc. Além disso, isso facilita a troca do mecanismo de armazenamento no futuro, caso seja necessário.
        //outras obs: quando aplicar no banco, usar o ID gerado pelo banco, ao invés de gerar um ID manualmente, para evitar possíveis conflitos de ID e garantir a unicidade dos registros.
        const gameObject = {
            id: crypto.randomUUID(),
            ...game,
        }

        return await repository.addGame(gameObject);        
    };

    const deleteGame = async (id: string): Promise<boolean> => {
        const deleted = await repository.deleteGame(id);

        // review - eu aqui procuraria o jogo antes de tentar deletar, e lançaria um erro caso ele não exista, ao invés de retornar false. Assim a camada de controller pode lidar melhor com os erros, e fica mais claro o motivo do erro (404 vs 500 por exemplo)
        // outra obs: quando aplicar no banco criar um deletamento lógico, ao invés de deletar o registro, para evitar perda de dados e facilitar auditoria
        if(!deleted) { 
            
            throw apiError('Jogo não encontrado', 404);
        }

        return deleted;
    };

    const findGames = async (parameters: Partial<Game>): Promise<Game[]> => {
        const games = await repository.findGames(parameters);
        return games;
    };

    const changeGameStatus = async (id: string, status: GameCurrentState): Promise<Game | null> => {

        // REVIEW - aqui também, eu buscaria o jogo primeiro, para verificar se ele existe, e lançaria um erro caso ele não exista, ao invés de retornar null. Assim a camada de controller pode lidar melhor com os erros, e fica mais claro o motivo do erro (404 vs 500 por exemplo)
        const game = await repository.updateGame(id, { status });
        if (!game) {
            throw apiError('Jogo não encontrado', 404);
        }
        return game;
    };

    return ({
        getAllGames,
        addGame,
        deleteGame,
        findGames,
        changeGameStatus
    }); 
}