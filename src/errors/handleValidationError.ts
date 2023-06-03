import mongoose from 'mongoose'
import {
  IGenericErrorMessage,
  IGenericErrorReturn,
} from '../interfaces/error.interface'

const handleValidationError = (
  error: mongoose.Error.ValidationError
): IGenericErrorReturn => {
  const errors: IGenericErrorMessage[] = Object.values(error.errors).map(
    el => ({
      message: el?.message,
      path: el?.path,
    })
  )

  return {
    success: false,
    errorMessages: errors,
    message: 'Validation error',
    stack: error.stack,
  }
}

export default handleValidationError
