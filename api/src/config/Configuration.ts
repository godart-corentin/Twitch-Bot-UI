import path from 'path'
import * as dotenv from 'dotenv'
import { singleton } from 'tsyringe'

import { AppConfiguration } from './AppConfiguration'
import { TwitchConfiguration } from './TwitchConfiguration'

export interface IConfiguration {
  app: AppConfiguration
  twitch: TwitchConfiguration
}

@singleton()
export class Configuration implements IConfiguration {
  public app: AppConfiguration
  public twitch: TwitchConfiguration

  constructor() {
    dotenv.config({ path: path.join(__dirname, '../../.env') })

    this.app = {
      debug: process.env.DEBUG?.toLocaleLowerCase() == 'true' ?? false,
      port: process.env.PORT || '8000'
    }

    this.twitch = {
      clientID: process.env.TWITCH_CLIENT_ID || '',
      clientSecret: process.env.TWITCH_CLIENT_SECRET || '',
      redirectURI: process.env.TWITCH_REDIRECT_URI || ''
    }
  }
}
