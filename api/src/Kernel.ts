import { container } from 'tsyringe'

import { Application } from './Application'
import { Configuration } from './Configuration'
import {
  LoggerService,
  TokenService,
  WhitelistService,
  TwitchUserService,
  TwitchTokenService,
  CommandService,
  JSONService,
  JSONCommandService,
  PrefixService
} from './services'

export class Kernel {
  constructor() {
    this.registerDependencies()
  }

  registerDependencies() {
    container
      .register('IApplication', { useClass: Application })
      .register('IConfiguration', { useClass: Configuration })
      //Twitch services
      .register('ITwitchUserService', { useClass: TwitchUserService })
      .register('ITwitchTokenService', { useClass: TwitchTokenService })
      .register('ICommandService', { useClass: CommandService })
      .register('IPrefixService', { useClass: PrefixService })
      // Other services
      .register('ILoggerService', { useClass: LoggerService })
      .register('ITokenService', { useClass: TokenService })
      .register('IWhitelistService', { useClass: WhitelistService })
      .register('IJSONService', { useClass: JSONService })
      .register('IJSONCommandService', { useClass: JSONCommandService })
  }

  start() {
    container.resolve(Application).run()
  }
}
