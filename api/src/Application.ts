import { inject, injectable } from 'tsyringe'
import fastify, { FastifyInstance } from 'fastify'
import fastifyCors from 'fastify-cors'

import { ILoggerService } from './services'
import { IConfiguration } from './config'
import routers from './routes'

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

    this.registerPlugins()
    this.registerRoutes()
  }

  registerPlugins() {
    this._app.register(fastifyCors, {
      origin: '*'
    })
  }

  registerRoutes() {
    for (const router of routers) {
      for (const route of router.routes) {
        this._app.route({
          ...route,
          url: `${router.prefix}${route.path}`
        })
      }
    }
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
