import { Router } from 'express';

import bodyValidationMiddleware from '@middlewares/validation/bodyValidation.js';
import { gameSchema, gameQuerySchema, gameStatusUpdateSchema, idParamSchema } from '@schemas/gameSchemas.js';

import GameRepository from '@repositories/gameRepository.js';
import GameService from '@services/gameService.js';
import GameController from '@controllers/gameController.js';
import queryValidationMiddleware from '@middlewares/validation/queryValidation.js';
import paramValidationMiddleware from '@middlewares/validation/paramValidation.js';

const repository = GameRepository();
const service = GameService(repository);
const controller = GameController(service);

const router = Router();

router.post('/', bodyValidationMiddleware(gameSchema), controller.addGame);
router.get('/', controller.getAllGames);
router.delete('/:id', paramValidationMiddleware(idParamSchema), controller.deleteGame);
router.get('/search', queryValidationMiddleware(gameQuerySchema), controller.findGames);
router.patch('/:id/status', paramValidationMiddleware(idParamSchema), bodyValidationMiddleware(gameStatusUpdateSchema), controller.changeGameStatus);

export default router;