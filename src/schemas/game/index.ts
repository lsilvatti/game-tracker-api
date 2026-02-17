import joi from 'joi';

import { GamePlatforms, GameCurrentState } from 'src/types/index.js';

const currentYear = new Date(Date.now()).getFullYear();

const baseGameFields = {
    id: joi.string().uuid().messages({
        'string.base': 'O ID deve ser uma string',
        'string.guid': 'O ID deve ser um UUID válido',
        'any.required': 'O ID é obrigatório',
    }).description('Identificador único do jogo (UUID)'),
    title: joi.string().min(3).messages({
        'string.base': 'O título deve ser uma string',
        'string.empty': 'O título não pode ser vazio',
        'string.min': 'O título deve conter pelo menos 3 caracteres',
        'any.required': 'O título é obrigatório',
    }).description('Título do jogo'),
    year: joi.number().min(1958).max(currentYear).messages({
        'number.base': 'O ano deve ser um número',
        'number.min': 'O ano deve ser posterior a 1958',
        'number.max': 'O ano não pode ser no futuro',
        'any.required': 'O ano é obrigatório',
    }).description('Ano de lançamento do jogo'),
    platform: joi.string().valid(...Object.values(GamePlatforms)).messages({
        'any.required': 'A plataforma é obrigatória',
        'any.only': `A plataforma deve ser: ${Object.values(GamePlatforms).join(', ')}`,
    }).description('Plataforma do jogo'),
    genre: joi.array().items(joi.string()).messages({
        'array.base': 'O gênero deve ser um array de strings',
        'string.base': 'Cada gênero deve ser uma string',
        'any.required': 'O gênero é obrigatório',
    }).description('Gêneros do jogo'),
    status: joi.string().valid(...Object.values(GameCurrentState)).messages({
        'any.only': `O status deve ser: ${Object.values(GameCurrentState).join(', ')}`,
    }).description('Status atual do jogo'),
};

export const gameSchema = joi.object({
    title: baseGameFields.title.required(),
    year: baseGameFields.year.required(),
    platform: baseGameFields.platform.required(),
    genre: baseGameFields.genre.required(),
    status: baseGameFields.status.default(GameCurrentState.Backlog)
});


export const gameQuerySchema = joi.object({
    ...baseGameFields 
});

export const gameStatusUpdateSchema = joi.object({
    status: baseGameFields.status.required(),
});

export const idParamSchema = joi.object({
    id: baseGameFields.id.required(),
});