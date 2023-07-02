import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { paginationFields } from '../../../constants/pagination'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { AcademicFacultyService } from './academicFaculty.service'

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body
  const result = await AcademicFacultyService.createFaculty(payload)
  sendResponse(res, {
    data: result,
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Academic faculty created successfully',
  })
})

const deleteFacultyById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await AcademicFacultyService.deleteFacultyById(id)
  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty deleted successfully',
  })
})

const updateFacultyById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const payload = req.body
  const result = await AcademicFacultyService.updateFacultyById(id, payload)
  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty updated successfully',
  })
})

const getFacultyById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await AcademicFacultyService.getFacultyById(id)
  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty data retrieved successfully',
  })
})

const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields)
  const result = await AcademicFacultyService.getAllFaculty(paginationOptions)
  sendResponse(res, {
    data: result,
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculties data retrieved successfully',
    meta: result.meta,
  })
})

export const AcademicFacultyController = {
  createFaculty,
  deleteFacultyById,
  updateFacultyById,
  getFacultyById,
  getAllFaculty,
}
