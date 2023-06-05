import cors from 'cors'
import express, { Application } from 'express'

// routes
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { UserRoutes } from './app/modules/user/user.route'

const app: Application = express()

// middlewares
app.use(cors())
// * parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application routes
app.use('/api/v1/users/', UserRoutes)

// Testing route
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   // throw new ApiError(400, 'Not found')
//   //   throw new Error('Not found')
//   Promise.reject(new Error('Unhandled Promise Rejection'))
//   // next('Not found') // Error
// })

// * global error handler
app.use(globalErrorHandler)

export default app
