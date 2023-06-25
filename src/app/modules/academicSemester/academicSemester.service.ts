import httpStatus from 'http-status'
import { SortOrder } from 'mongoose'
import ApiError from '../../../errors/ApiError'
import { paginationHelpers } from '../../../helpers/pagination.helpers'
import { IGenericPaginationResponse } from '../../../interfaces/common.interface'
import { IPaginationOptions } from '../../../interfaces/pagination.interface'
import { academicSemesterTitleCodeMapper } from './academicSemester.constant'
import IAcademicSemester, {
  IAcademicSemesterFilters,
} from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code')

  const result = await AcademicSemester.create(payload)
  return result
}

const getAllSemesters = async (
  filters: IAcademicSemesterFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericPaginationResponse<IAcademicSemester[]>> => {
  const { searchTerm } = filters

  const andConditions = []
  const academicSemesterSearchableFields = ['title', 'code', 'year']

  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterSearchableFields.map(item => ({
        [item]: { $regex: searchTerm, $options: 'i' },
      })),
    })
  }

  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const sortConditions: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  const result = await AcademicSemester.find({ $and: andConditions })
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
  const total = await AcademicSemester.countDocuments()
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

export const AcademicSemesterService = {
  createSemester,
  getAllSemesters,
}
