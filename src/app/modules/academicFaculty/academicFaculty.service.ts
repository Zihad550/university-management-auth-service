import IAcademicFaculty from './academicFaculty.interface'
import { AcademicFaculty } from './academicFaculty.model'

const createFaculty = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty> => {
  return await AcademicFaculty.create(payload)
}

const deleteFacultyById = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  return await AcademicFaculty.findByIdAndDelete(id)
}

const updateFacultyById = async (
  id: string,
  payload: Partial<IAcademicFaculty>
): Promise<IAcademicFaculty | null> => {
  return await AcademicFaculty.findOneAndUpdate({ _id: id }, payload)
}

export const AcademicFacultyService = {
  createFaculty,
  deleteFacultyById,
  updateFacultyById,
}
