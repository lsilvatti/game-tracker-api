import joi from 'joi';
import { GamePlatforms, GameCurrentState } from 'src/types/index.js';

const gameSchema = joi.object({
    title: joi.string().min(3).required(),
    year: joi.date().greater('1958-01-01').less('now'),
    platform: joi.string().valid(...Object.values(GamePlatforms)),
    status: joi.string().valid(...Object.values(GameCurrentState)).default(GameCurrentState.Backlog),
})

export default gameSchema;