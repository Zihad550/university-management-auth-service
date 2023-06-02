import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorLogger, logger } from './shared/logger'

async function bootstrap() {
  try {
    await mongoose.connect(config.dbUri as string)
    app.listen(config.port, () => {
      logger.info(`App listening on port ${config.port}`)
    })
    logger.info(`Successfully connected to DB`)
  } catch (err) {
    errorLogger.error('Failed to connect database', err)
  }
}

bootstrap()
