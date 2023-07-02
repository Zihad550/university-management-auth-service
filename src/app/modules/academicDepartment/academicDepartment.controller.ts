import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { paginationFields } from '../../../constants/pagination'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { AcademicDepartmentService } from './academicDepartment.service'

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const academicSemesterData = req.body
  const result = await AcademicDepartmentService.createDepartment(
    academicSemesterData
  )

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Academic department created successfully',
    data: result,
  })
})

const deleteDepartmentById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await AcademicDepartmentService.deleteDepartmentById(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department deleted successfully',
    data: result,
  })
})

const getDepartmentById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await AcademicDepartmentService.getDepartmentById(id)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Academic department retrieved successfully',
    data: result,
  })
})

const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const payload = req.body
  const result = await AcademicDepartmentService.updateDepartment(id, payload)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Academic semester created successfully',
    data: result,
  })
})

const getAllDepartments = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields)

  const result = await AcademicDepartmentService.getAllDepartments(
    paginationOptions
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semesters retrieved successfully!',
    data: result.data,
    meta: result.meta,
  })
})

export const AcademicDepartmentController = {
  createDepartment,
  deleteDepartmentById,
  getDepartmentById,
  updateDepartment,
  getAllDepartments,
}
