import { container } from 'tsyringe'

import { Application } from './Application'
import { Configuration } from './Configuration'
import {
  LoggerService,
  TokenService,
  TwitchUserService,
  TwitchTokenService
} from './services'

export class Kernel {
  constructor() {
    this.registerDependencies()
  }

  registerDependencies() {
    container
      .register('IApplication', { useClass: Application })
      .register('IConfiguration', { useClass: Configuration })
      //services
      .register('ILoggerService', { useClass: LoggerService })
      .register('ITokenService', { useClass: TokenService })
      .register('ITwitchUserService', { useClass: TwitchUserService })
      .register('ITwitchTokenService', { useClass: TwitchTokenService })
  }

  start() {
    container.resolve(Application).run()
  }
}
