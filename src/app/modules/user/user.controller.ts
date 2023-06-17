import { RequestHandler } from 'express'
import { UserService } from './user.service'

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { ...userData } = req.body
    const result = await UserService.createUser(userData)
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    })
  } catch (error: unknown) {
    next(error)
  }
}

export const UserController = {
  createUser,
}
