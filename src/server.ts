import { Server } from 'http'
import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorLogger, logger } from './shared/logger'

async function bootstrap() {
  let server: Server
  try {
    await mongoose.connect(config.dbUri as string)
    server = app.listen(config.port, () => {
      logger.info(`App listening on port ${config.port}`)
    })
    logger.info(`Successfully connected to DB`)
  } catch (err) {
    errorLogger.error('Failed to connect database', err)
  }

  process.on('unhandledRejection', error => {
    console.log('Unhandled Rejection is detected, we are closing our server')
    if (server)
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
      })
    else process.exit(1)
  })
}

bootstrap()
