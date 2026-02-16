import validateBody from '@middlewares/validate-schema/index.js';
import gameSchema from '@schemas/game/index.js';
import { Router } from 'express';

const router = Router();

router.use(validateBody(gameSchema));

export default router;