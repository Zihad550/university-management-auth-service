import { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../helpers/pagination.helpers'
import { IGenericPaginationResponse } from '../../../interfaces/common.interface'
import { IPaginationOptions } from '../../../interfaces/pagination.interface'
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

const getFacultyById = async (id: string): Promise<IAcademicFaculty | null> => {
  return await AcademicFaculty.findById(id)
}

const getAllFaculty = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericPaginationResponse<IAcademicFaculty[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const sortConditions: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) sortConditions[sortBy] = sortOrder

  const result = await AcademicFaculty.find({})
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
  const total = await AcademicFaculty.countDocuments()
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

export const AcademicFacultyService = {
  createFaculty,
  deleteFacultyById,
  updateFacultyById,
  getFacultyById,
  getAllFaculty,
}
