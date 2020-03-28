const generateUniqueId = require('../utils/generateUniqueId')
const connection = require('../db/connection')

module.exports = {
    async index(req, res) {
        const ngos = await connection('ngo').select('*')
        return res.json(ngos)
    },
    async create(req, res) {
        const { name, email, whatsapp, city, state } = req.body
        const id = generateUniqueId()

        await connection('ngo').insert({    // inserção demora, então faça a engine esperar (AWAIT) terminar
            id,
            name,
            email,
            whatsapp,
            city,
            state
        })

        return res.json({id})
    }
}