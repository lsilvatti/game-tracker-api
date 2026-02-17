import { Router } from 'express';

import bodyValidationMiddleware from '@middlewares/bodyValidation/index.js';
import { gameSchema, gameQuerySchema } from '@schemas/game/index.js';

import GameRepository from '@repositories/game/index.js';
import GameService from '@services/game/index.js';
import GameController from '@controllers/game/index.js';
import queryValidationMiddleware from '@middlewares/queryValidation/index.js';

const repository = GameRepository();
const service = GameService(repository);
const controller = GameController(service);

const router = Router();

router.post('/', bodyValidationMiddleware(gameSchema), controller.addGame);
router.get('/', controller.getAllGames);
router.delete('/:id', controller.deleteGame);
router.get('/search', queryValidationMiddleware(gameQuerySchema), controller.findGames);

export default router;