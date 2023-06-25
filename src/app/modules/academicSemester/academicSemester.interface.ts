import { Model } from 'mongoose'

export type AcademicSemesterMonthsType =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'

export type AcademicSemesterTitlesType = 'Autumn' | 'Summer' | 'Fall'

export type AcademicSemesterCodesType = '01' | '02' | '03'

export default interface IAcademicSemester {
  title: AcademicSemesterTitlesType
  year: number
  code: AcademicSemesterCodesType
  startMonth: AcademicSemesterMonthsType
  endMonth: AcademicSemesterMonthsType
}

export type AcademicSemesterModel = Model<IAcademicSemester>

export interface IAcademicSemesterFilters {
  searchTerm: string
}
