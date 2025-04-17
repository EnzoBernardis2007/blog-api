import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import routes from './routes/index.js'

// settings
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use('/api', routes)

// connect to the database MongoDB
const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        })
        console.log('Conectado ao MongoDB')
    } catch (err) {
        console.error('Erro ao conectar no MongoDB:', err)
    }
}

if (process.env.NODE_ENV !== 'test') {
    connectToDatabase()
    .then(() => {
        app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`)
    })
})
}

export { app, connectToDatabase } 