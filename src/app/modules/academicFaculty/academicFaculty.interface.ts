import { Model } from 'mongoose'

export default interface IAcademicFaculty {
  title: string
}

export type IAcademicFacultyModel = Model<IAcademicFaculty>
