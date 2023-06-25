import { Router } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicSemesterController } from './academicSemester.controller'
import { AcademicSemesterValidation } from './academicSemester.validation'

const router = Router()

router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createSemester
)

router.get('/', AcademicSemesterController.getAllSemesters)

export const AcademicSemesterRoutes = router
