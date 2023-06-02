import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import usersService from './app/modules/users/users.service'

// routes
import usersRouter from './app/modules/users/users.route'

const app: Application = express()

// middlewares
app.use(cors())
// * parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application routes
app.use('/api/v1/users/', usersRouter)

// Testing
app.get('/',async (req: Request, res: Response) => {
  await usersService.createUserService({
    id: '999',
    password: '1234',
    role: 'student'
  })
  res.send('Testing route')
})

export default app
