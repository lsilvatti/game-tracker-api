import { type Request, type Response, type NextFunction } from 'express';
import { type IGameService } from '@services/gameService.js';


// review - aqui eu criaria um arquivo de erros customizados, para centralizar os erros da aplicação, e evitar ficar criando erros genéricos com mensagens diferentes. Assim fica mais fácil de tratar os erros na camada de controller, e também facilita a manutenção dos erros da aplicação.
// outra obs: tiparia os retornos também
// duvida, me parece que só ta roletando os erros internos, evitaria de lançar erros de validação ou erros de negócio como erros internos, para facilitar o tratamento dos erros na camada de controller, e também para evitar expor detalhes internos da aplicação para o cliente.
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
    
            await service.deleteGame(id);

            return res.status(204).send();
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

    const changeGameStatus = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const { status } = req.body;
            
            const updatedGame = await service.changeGameStatus(id, status);

            return res.status(200).json(updatedGame);
            
        } catch (error) {
            next(error);
        }
    }

    return { 
        addGame,
        getAllGames,
        deleteGame,
        findGames,
        changeGameStatus
    }
}
