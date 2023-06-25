import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { paginationHelpers } from '../../../helpers/pagination.helpers'
import { IGenericPaginationResponse } from '../../../interfaces/common.interface'
import { IPaginationOptions } from '../../../interfaces/pagination.interface'
import { academicSemesterTitleCodeMapper } from './academicSemester.constant'
import IAcademicSemester from './academicSemester.interface'
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
  paginationOptions: IPaginationOptions
): Promise<IGenericPaginationResponse<IAcademicSemester[]>> => {
  const { limit, page, skip } =
    paginationHelpers.calculatePagination(paginationOptions)

  const result = await AcademicSemester.find({}).sort().skip(skip).limit(limit)
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
