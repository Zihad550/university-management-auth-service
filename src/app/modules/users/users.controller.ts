import { NextFunction, Request, Response } from 'express'
import { errorLogger } from '../../../shared/logger'
import usersService from './users.service'

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req.body
    const result = await usersService.createUserService(user)
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

export default { createUser }
