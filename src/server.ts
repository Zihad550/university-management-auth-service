import { Server } from 'http'
import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorLogger, logger } from './shared/logger'

process.on('uncaughtException', error => {
  logger.info('Uncaught exception is detected......')
  errorLogger.error(error)
  process.exit(1)
})
let server: Server

async function bootstrap() {
  try {
    await mongoose.connect(config.dbUri as string)
    server = app.listen(config.port, () => {
      logger.info(`App listening on port ${config.port}`)
    })
    logger.info(`Successfully connected to DB`)
  } catch (err) {
    errorLogger.error('Failed to connect database', err)
  }

  // it detects async promises, async errors
  process.on('unhandledRejection', error => {
    logger.info('Unhandled Rejection is detected, we are closing our server')
    if (server)
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
      })
    else process.exit(1)
  })
}

bootstrap()

// signal termination
// send a signal to close the server
// by pm => process manager
process.on('SIGTERM', () => {
  logger.info('SIGTERM')
  if (server) {
    server.close()
  }
})
