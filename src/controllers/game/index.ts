import { type Request, type Response, type NextFunction } from 'express';
import { type IGameService } from '@services/game/index.js';

export default function GameController(service: IGameService) { 
    const getAllGames = async (req: Request, res: Response, next: NextFunction) => {
        try { 
            const games = await service.getAllGames();
            return res.status(200).json(games);

        } catch (error) { 
            next(error);
        }
    } 

    const addGame = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const game = await service.addGame(req.body);
            return res.status(201).json(game);

        } catch(error) { 
            next(error);
        }
    }

    const deleteGame = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            
            const deleted = await service.deleteGame(id);
            
            if (deleted) {
                return res.status(204).send();
            } else {
                return res.status(404).json({ message: 'Jogo não encontrado' });
            }

        } catch (error) { 
            next(error);
        }
    }

    const findGames = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const games = await service.findGames(req.query);
            return res.status(200).json(games);
            
        } catch (error) {
            next(error);
        }
    }

    return { 
        addGame,
        getAllGames,
        deleteGame,
        findGames
    }
}
