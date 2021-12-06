import { inject, injectable } from 'tsyringe'
import fastify, { FastifyInstance } from 'fastify'

import { ILoggerService } from './services'
import { IConfiguration } from './config'

export interface IApplication {
  run(): void
}

@injectable()
export class Application implements IApplication {
  private _app: FastifyInstance
  private _loggerService: ILoggerService
  private _configuration: IConfiguration

  constructor(
    @inject('ILoggerService') loggerService: ILoggerService,
    @inject('IConfiguration') configuration: IConfiguration
  ) {
    this._loggerService = loggerService
    this._configuration = configuration

    loggerService.Info('Configuration loaded.')

    this._app = fastify()
  }

  run() {
    this._app.listen(this._configuration.app.port, (err, address) => {
      if (err) {
        this._loggerService.Error(err.message)
        process.exit(1)
      }
      this._loggerService.Info(`Server listening at ${address}`)
    })
  }
}
