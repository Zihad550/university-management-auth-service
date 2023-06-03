export interface IGenericErrorMessage {
  path: string
  message: string
}

export interface IGenericErrorReturn {
  success: boolean
  message: string
  errorMessages: IGenericErrorMessage[]
  stack?: string
}
