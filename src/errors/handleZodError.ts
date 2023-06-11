import { ZodError, ZodIssue } from 'zod'
import { IGenericErrorResponse } from '../interfaces/common.interface'
import { IGenericErrorMessage } from '../interfaces/error.interface'

const handleZodError = (error: ZodError): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = error.issues.map(
    (issue: ZodIssue) => ({
      path: issue?.path[issue?.path?.length - 1],
      message: issue?.message,
    })
  )

  return {
    statusCode: 400,
    message: 'Validation Error',
    errorMessages: errors,
  }
}

export default handleZodError
