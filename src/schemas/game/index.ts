import joi from 'joi';
import { GamePlatforms, GameCurrentState } from 'src/types/index.js';

const gameSchema = joi.object({
    title: joi.string().min(3).required().messages({
        'string.base': 'O título deve ser uma string',
        'string.empty': 'O título não pode ser vazio',
        'string.min': 'O título deve conter pelo menos 3 caracteres',
        'any.required': 'O título é obrigatório',
    }),
    year: joi.date().greater('1958-01-01').less('now').messages({
        'date.base': 'O ano deve ser uma data válida',
        'date.greater': 'O ano deve ser posterior a 1958',
        'date.less': 'O ano não pode ser no futuro',
    }),
    platform: joi.string().valid(...Object.values(GamePlatforms)).messages({
        'string.base': 'A plataforma deve ser uma string',
        'any.only': `A plataforma deve ser uma das seguintes: ${Object.values(GamePlatforms).join(', ')}`,
    }),
    status: joi.string().valid(...Object.values(GameCurrentState)).default(GameCurrentState.Backlog).optional().messages({
        'string.base': 'O status deve ser uma string',
        'any.only': `O status deve ser um dos seguintes: ${Object.values(GameCurrentState).join(', ')}`,
    }),
})

export default gameSchema;