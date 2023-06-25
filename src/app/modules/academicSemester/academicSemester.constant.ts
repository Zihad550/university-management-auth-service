import {
  AcademicSemesterCodesType,
  AcademicSemesterMonthsType,
  AcademicSemesterTitlesType,
} from './academicSemester.interface'

export const academicSemesterMonths: AcademicSemesterMonthsType[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const academicSemesterTitles: AcademicSemesterTitlesType[] = [
  'Autumn',
  'Summer',
  'Fall',
]

export const academicSemesterCodes: AcademicSemesterCodesType[] = [
  '01',
  '02',
  '03',
]

export const academicSemesterTitleCodeMapper: Record<
  AcademicSemesterTitlesType,
  AcademicSemesterCodesType
> = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
}

export const academicSemesterSearchableFields = ['title', 'code', 'year']
export const academicSemesterFilterableFields = [
  'searchTerm',
  'title',
  'code',
  'year',
]
