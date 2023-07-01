import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { paginationFields } from '../../../constants/pagination'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { academicSemesterFilterableFields } from './academicSemester.constant'
import IAcademicSemester from './academicSemester.interface'
import { AcademicSemesterService } from './academicSemester.service'

const createSemester = catchAsync(async (req: Request, res: Response) => {
  const { ...academicSemesterData } = req.body
  const result = await AcademicSemesterService.createSemester(
    academicSemesterData
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester created successfully',
    data: result,
  })
})

const getAllSemesters = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicSemesterFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await AcademicSemesterService.getAllSemesters(
    filters,
    paginationOptions
  )
  sendResponse<IAcademicSemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semesters retrieved successfully!',
    data: result.data,
    meta: result.meta,
  })
})

const getSemesterById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await AcademicSemesterService.getSemesterById(id)

  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semesters retrieved successfully!',
    data: result,
  })
})

const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body

  const result = await AcademicSemesterService.updateSemester(id, updatedData)
  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semesters updated successfully!',
    data: result,
  })
})

const deleteSemesterById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await AcademicSemesterService.deleteSemesterById(id)
  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semesters deleted successfully!',
    data: result,
  })
})

export const AcademicSemesterController = {
  createSemester,
  getAllSemesters,
  getSemesterById,
  updateSemester,
  deleteSemesterById,
}
