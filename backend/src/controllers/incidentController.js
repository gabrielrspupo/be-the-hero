const connection = require('../db/connection')

module.exports = {
    async index(req, res) {
        const { page = 1 } = req.query // PAGINAÇÃO: por padrao começar na primeira pagina (?page=X)

        const [count] = await connection('incident').count()

        const incidents = await connection('incident')
            .join('ngo', 'ngo.id', '=', 'incident.ngo_id')
            .limit(5)
            .offset(5 * (page - 1))
            .select([
                'incident.*',
                'ngo.name',
                'ngo.email',
                'ngo.whatsapp',
                'ngo.city',
                'ngo.state'
            ])
        
        res.header('X-Total-Count', count['count(*)'])
        return res.json(incidents)
    },
    async create(req, res) {
        const { title, description, value } = req.body
        const ngo_id = req.headers.authorization

        const [id] = await connection('incident').insert({
            title,
            description,
            value,
            ngo_id
        })

        return res.json({ id })
    },
    async delete(req, res) {
        const {id} = req.params
        const ngo_id = req.headers.authorization

        const incident = await connection('incident')
            .where('id', id)
            .select('ngo_id')
            .first();

        if (incident.ngo_id !== ngo_id)
            return res.status(401).json({ error: "Illegal Operation" })  // Unauthorized

        await connection('incident').where('id', id).delete()
        return res.status(204).send() // No Content (sucesso)
    }
}