import joi from 'joi';
import { GamePlatforms, GameCurrentState } from 'src/types/index.js';

const currentYear = new Date(Date.now()).getFullYear();

const baseGameFields = {
    title: joi.string().min(3).messages({
        'string.base': 'O título deve ser uma string',
        'string.empty': 'O título não pode ser vazio',
        'string.min': 'O título deve conter pelo menos 3 caracteres',
        'any.required': 'O título é obrigatório',
    }),
    year: joi.number().min(1958).max(currentYear).messages({
        'number.base': 'O ano deve ser um número',
        'number.min': 'O ano deve ser posterior a 1958',
        'number.max': 'O ano não pode ser no futuro',
        'any.required': 'O ano é obrigatório',
    }),
    platform: joi.string().valid(...Object.values(GamePlatforms)).messages({
        'any.required': 'A plataforma é obrigatória',
        'any.only': `A plataforma deve ser: ${Object.values(GamePlatforms).join(', ')}`,
    }),
    status: joi.string().valid(...Object.values(GameCurrentState)).messages({
        'any.only': `O status deve ser: ${Object.values(GameCurrentState).join(', ')}`,
    }),
};

export const gameSchema = joi.object({
    title: baseGameFields.title.required(),
    year: baseGameFields.year.required(),
    platform: baseGameFields.platform.required(),
    status: baseGameFields.status.default(GameCurrentState.Backlog)
});

export const gameQuerySchema = joi.object({
    ...baseGameFields 
});