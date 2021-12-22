import { inject, injectable } from 'tsyringe'
import fastify, { FastifyInstance } from 'fastify'
import fastifyCors from 'fastify-cors'
import fastifyCookie from 'fastify-cookie'

import { ILoggerService } from './services'
import controllers from './controllers'
import { MiddlewareFn, Route } from './lib/types'
import { IConfiguration } from './Configuration'

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
      origin: this._configuration.app.clientURL,
      credentials: true
    })
    this._app.register(fastifyCookie)
  }

  registerRoutes() {
    for (const controller of controllers) {
      const instance: any = new controller()
      const prefix: string = Reflect.getMetadata('prefix', controller)
      const routes: Array<Route> = Reflect.getMetadata('routes', controller)

      for (const route of routes) {
        const middlewares: Array<MiddlewareFn> =
          Reflect.getMetadata(
            'middlewares',
            controller.prototype,
            route.methodName
          ) || []

        this._app.route({
          method: route.requestMethod,
          url: '/api' + prefix + route.path,
          handler: (req, reply) => {
            instance[route.methodName](req, reply)
          },
          preHandler: middlewares
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
