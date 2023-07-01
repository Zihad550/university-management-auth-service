import { Router } from 'express'
import { AcademicFacultyController } from './academicFaculty.controller'

const router = Router()

router.post('/create-faculty', AcademicFacultyController.createFaculty)

router.delete('/:id', AcademicFacultyController.deleteFacultyById)

router.patch('/:id', AcademicFacultyController.updateFacultyById)
