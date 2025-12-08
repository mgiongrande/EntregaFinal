import express from 'express'
import cors from 'cors'
import {params} from './config/params.js'
import productsRouter from './routes/products.routes.js'
import offersRouter from './routes/offers.routes.js'
import loginRouter from './routes/login.routes.js'
import 'dotenv/config'

const app = express()

app.use(express.json())

app.use(cors())

// Rutas
app.use(params.routes.product, productsRouter)
app.use(params.routes.offer, offersRouter)
app.use(params.routes.login, loginRouter)

// Middleware rutas no encontradas
app.use((req,res) => {
  res.status(404).json({error:'Ruta no encontrada.'})
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))