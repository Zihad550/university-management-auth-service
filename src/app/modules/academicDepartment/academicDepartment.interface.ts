import { Model, Types } from 'mongoose'
import IAcademicFaculty from '../academicFaculty/academicFaculty.interface'

export default interface IAcademicDepartment {
  title: string
  academicFaculty: Types.ObjectId | IAcademicFaculty
}

export type IAcademicDepartmentModel = Model<
  IAcademicDepartment,
  Record<string, unknown>
>
