import { type Request, type Response, type NextFunction } from 'express';
import { type IGameService } from '@services/game/index.js';

export default function GameController(service: IGameService) { 
    const addGame = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const game = await service.addGame(req.body);
            return res.status(201).json(game);

        } catch(error) { 
            next(error);
        }
    }

    return { 
        addGame
    }
}
