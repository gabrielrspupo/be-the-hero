const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/db/connection')

describe('NGO', () => {
    beforeEach(async () => {
        await connection.migrate.rollback()
        await connection.migrate.latest()
    })

    it('should be able to create a new NGO', async () => {
        const response = await request(app)    
            .post('/ngos')
            .send({
                name: "ONG",
                email: "ong@ong.org.br",
                whatsapp: "16900000000",
                city: "City",
                state: "ST"
            })
        expect(response.body).toHaveProperty('id')
        expect(response.body.id).toHaveLength(8)
    })

    afterAll(async () => {
        await connection.destroy()
    })

    
})