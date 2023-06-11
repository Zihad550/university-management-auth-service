import { Model } from 'mongoose'

export default interface IAcademicSemester {
  title: string
  year: number
  code: string
  startMonth: string
  endMonth: string
}

export type AcademicSemesterModel = Model<IAcademicSemester>
