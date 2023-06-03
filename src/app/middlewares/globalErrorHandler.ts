import { NextFunction, Request, Response } from 'express'
import config from '../../config'
import { IGenericErrorMessage } from '../../interfaces/error.interface'

const globalErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  _: NextFunction
) => {
  const statusCode = 500
  const message = 'Internal server error!'
  const errorMessages: IGenericErrorMessage[] = []

  // if (error?.name === 'ValidationError') {
  //   const simplifiedError = handleValidationError(error)
  // }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  })
}

export default globalErrorHandler
