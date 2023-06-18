import cors from 'cors'
import express, { Application } from 'express'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import routes from './app/routes'

// routes

const app: Application = express()

// middlewares
app.use(cors())
// * parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application routes
app.use('/api/v1', routes)

// * global error handler
app.use(globalErrorHandler)

export default app
