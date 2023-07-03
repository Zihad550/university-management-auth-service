import { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../helpers/pagination.helpers'
import { IGenericPaginationResponse } from '../../../interfaces/common.interface'
import { IPaginationOptions } from '../../../interfaces/pagination.interface'
import IAcademicDepartment from './academicDepartment.interface'
import { AcademicDepartment } from './academicDepartment.model'

const createDepartment = async (
  payload: IAcademicDepartment
): Promise<IAcademicDepartment> => {
  return await AcademicDepartment.create(payload)
}

const deleteDepartmentById = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  return await AcademicDepartment.findByIdAndDelete(id)
}

const getDepartmentById = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  return await AcademicDepartment.findById(id).populate('academicFaculty')
}

const updateDepartment = async (
  id: string,
  payload: IAcademicDepartment
): Promise<IAcademicDepartment | null> => {
  return await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload
  ).populate('academicFaculty')
}

const getAllDepartments = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericPaginationResponse<IAcademicDepartment[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const sortConditions: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) sortConditions[sortBy] = sortOrder

  const result = await AcademicDepartment.find({})
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
  const total = await AcademicDepartment.countDocuments()
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

export const AcademicDepartmentService = {
  createDepartment,
  deleteDepartmentById,
  getDepartmentById,
  updateDepartment,
  getAllDepartments,
}
