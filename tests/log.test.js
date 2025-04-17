import request from 'supertest'
import mongoose from 'mongoose'
import { app, connectToDatabase } from '../src/index.js'
import Log from '../src/models/Log.js'

let createdLogId

beforeAll(async () => {
    process.env.NODE_ENV = 'test'
    await connectToDatabase()
})

afterEach(async () => {
    await Log.deleteMany()
})

afterAll(async () => {
    await mongoose.connection.close()
})

describe('Log API', () => {

    it('should create a new log', async () => {
        const res = await request(app)
            .post('/api/logs')
            .send({
                title: "Como usar MongoDB com Express",
                content: "Neste post vamos explorar como integrar MongoDB ao Express usando Mongoose.",
                tags: ["JS", "TS"]
            })

        expect(res.statusCode).toBe(201)
        expect(res.body).toHaveProperty('_id')
        expect(res.body.title).toBe("Como usar MongoDB com Express")

        createdLogId = res.body._id
    })

    it('should get all logs', async () => {
        await Log.create({ title: 'Log 1', content: 'Texto 1', tags: ['tag1'] })
        await Log.create({ title: 'Log 2', content: 'Texto 2', tags: ['tag2'] })

        const res = await request(app).get('/api/logs')

        expect(res.statusCode).toBe(200)
        expect(Array.isArray(res.body)).toBe(true)
        expect(res.body.length).toBe(2)
    })

    it('should get a log by id', async () => {
        const newLog = await Log.create({
            title: 'Log específico',
            content: 'Conteúdo específico',
            tags: ['único']
        })

        const res = await request(app).get(`/api/logs/${newLog._id}`)

        expect(res.statusCode).toBe(200)
        expect(res.body.title).toBe('Log específico')
    })

    it('should return 404 if log not found on getById', async () => {
        const fakeId = new mongoose.Types.ObjectId()
        const res = await request(app).get(`/api/logs/${fakeId}`)

        expect(res.statusCode).toBe(404)
        expect(res.body).toHaveProperty('error', 'Log not found')
    })

    it('should update a log by id', async () => {
        const log = await Log.create({
            title: 'Antigo',
            content: 'Conteúdo antigo',
            tags: []
        })

        const res = await request(app)
            .put(`/api/logs/${log._id}`)
            .send({
                title: 'Atualizado',
                content: 'Novo conteúdo',
                tags: ['nova']
            })

        expect(res.statusCode).toBe(200)
        expect(res.body.title).toBe('Atualizado')
    })

    it('should return 404 when updating a non-existent log', async () => {
        const fakeId = new mongoose.Types.ObjectId()
        const res = await request(app).put(`/api/logs/${fakeId}`).send({
            title: 'Atualizado',
            content: 'Conteúdo'
        })

        expect(res.statusCode).toBe(404)
        expect(res.body).toHaveProperty('error', 'Log not found')
    })

    it('should delete a log by id', async () => {
        const log = await Log.create({
            title: 'Para deletar',
            content: 'Deletar isso',
            tags: []
        })

        const res = await request(app).delete(`/api/logs/${log._id}`)

        expect(res.statusCode).toBe(200)
        expect(res.body).toHaveProperty('message', 'Log deleted successfully')
    })

    it('should return 404 when deleting a non-existent log', async () => {
        const fakeId = new mongoose.Types.ObjectId()
        const res = await request(app).delete(`/api/logs/${fakeId}`)

        expect(res.statusCode).toBe(404)
        expect(res.body).toHaveProperty('error', 'Log not found')
    })
})
