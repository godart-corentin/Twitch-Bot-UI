import path from 'path'
import * as dotenv from 'dotenv'
import { singleton } from 'tsyringe'

import { AppConfiguration } from './AppConfiguration'

export interface IConfiguration {
  app: AppConfiguration
}

@singleton()
export class Configuration implements IConfiguration {
  public app: AppConfiguration

  constructor() {
    dotenv.config({ path: path.join(__dirname, '../../.env') })

    this.app = {
      debug: process.env.DEBUG?.toLocaleLowerCase() == 'true' ?? false,
      port: process.env.PORT || '8000'
    }
  }
}
