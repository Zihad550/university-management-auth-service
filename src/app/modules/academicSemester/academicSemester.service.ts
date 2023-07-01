import httpStatus from 'http-status'
import { SortOrder } from 'mongoose'
import ApiError from '../../../errors/ApiError'
import { paginationHelpers } from '../../../helpers/pagination.helpers'
import { IGenericPaginationResponse } from '../../../interfaces/common.interface'
import { IPaginationOptions } from '../../../interfaces/pagination.interface'
import {
  academicSemesterSearchableFields,
  academicSemesterTitleCodeMapper,
} from './academicSemester.constant'
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
  const { searchTerm, ...filtersData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterSearchableFields.map(item => ({
        [item]: { $regex: searchTerm, $options: 'i' },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const sortConditions: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  const whereConditions = andConditions.length ? { $and: andConditions } : {}

  const result = await AcademicSemester.find(whereConditions)
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

const getSemesterById = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findById(id)
  return result
}

const updateSemester = async (
  id: string,
  payload: Partial<IAcademicSemester>
): Promise<IAcademicSemester | null> => {
  if (
    payload.title &&
    payload.code &&
    academicSemesterTitleCodeMapper[payload.title] !== payload.code
  )
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code')
  return await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
}

const deleteSemesterById = async (id: string) => {
  return await AcademicSemester.findByIdAndDelete(id)
}

export const AcademicSemesterService = {
  createSemester,
  getAllSemesters,
  getSemesterById,
  updateSemester,
  deleteSemesterById,
}
