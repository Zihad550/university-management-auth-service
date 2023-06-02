import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  port: process.env.PORT,
  dbUri:
    process.env.DB_URI || 'mongodb://localhost:27017/university-management',
  default_user_pass: process.env.DEFAULT_USER_PASS
}
