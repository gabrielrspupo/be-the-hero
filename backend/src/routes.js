const express = require('express')
const { celebrate, Segments, Joi } = require('celebrate')

const sessionController = require('./controllers/sessionController')
const ngoController = require('./controllers/ngoController')
const incidentController = require('./controllers/incidentController')
const profileController = require('./controllers/profileController')

const routes = express.Router()

/*
 *TIPOS DE PARAMETROS
 
    Query params: parâmetros nomeados enviados na rota apos um "?" (usado para filtros e paginação)
    Route params: parâmetros usados para identificar recursos após "/" (e.g: /users/1 retorna 1o usuário)
        -> nomeados com um ":"
 */

routes.post('/sessions', sessionController.create)

routes.get('/ngos', ngoController.index)
routes.post('/ngos', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        state: Joi.string().required().length(2)
    })
}), ngoController.create) // inserir depois de validar

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}), incidentController.index)
routes.post('/incidents', incidentController.create)
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), incidentController.delete)

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), profileController.index)

module.exports = routes