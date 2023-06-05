import { Model } from 'mongoose'

export default interface IUser {
  id: string
  role: string
  password: string
}

export type UserModel = Model<IUser, Record<string, unknown>>
