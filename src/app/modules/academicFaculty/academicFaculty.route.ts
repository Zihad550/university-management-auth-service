import { Router } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicFacultyController } from './academicFaculty.controller'
import { AcademicFacultyValidation } from './academicFaculty.validation'

const router = Router()

router.post(
  '/create-faculty',
  validateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema),
  AcademicFacultyController.createFaculty
)

router.delete('/:id', AcademicFacultyController.deleteFacultyById)

router.patch(
  '/:id',
  validateRequest(AcademicFacultyValidation.updateAcademicFacultyZodSchema),
  AcademicFacultyController.updateFacultyById
)

router.get('/:id', AcademicFacultyController.getFacultyById)

router.get('/', AcademicFacultyController.getAllFaculty)
