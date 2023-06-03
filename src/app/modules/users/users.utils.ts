import User from './users.model'

export const generateUserId = async (): Promise<string> => {
  let currentId = Number(await findLastUserId()) || 0
  currentId++
  return String(currentId).padStart(5, '0')
}

export const findLastUserId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ _id: -1 })
    .lean()
  return lastUser?.id
}
