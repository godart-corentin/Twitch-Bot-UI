import { container } from 'tsyringe'

import { Application } from './Application'
import { Configuration } from './config'
import { LoggerService } from './services'

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
  }

  start() {
    container.resolve(Application).run()
  }
}
