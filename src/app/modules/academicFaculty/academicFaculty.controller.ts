import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
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
    statusCode: httpStatus.CREATED,
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
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Academic faculty updated successfully',
  })
})

export const AcademicFacultyController = {
  createFaculty,
  deleteFacultyById,
  updateFacultyById,
}
