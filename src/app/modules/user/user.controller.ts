import { RequestHandler } from 'express'
import { errorLogger } from '../../../shared/logger'
import { UserService } from './user.service'

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body
    const result = await UserService.createUserService(user)
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    })
  } catch (error: unknown) {
    if (error instanceof Error) errorLogger.error(error.message)
    next(error)
  }
}

export const UserController = {
  createUser,
}
