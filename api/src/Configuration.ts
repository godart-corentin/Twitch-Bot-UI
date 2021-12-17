import path from 'path'
import * as dotenv from 'dotenv'
import { singleton } from 'tsyringe'

import { AppConfiguration, TwitchConfiguration } from './lib/types'

export interface IConfiguration {
  app: AppConfiguration
  twitch: TwitchConfiguration
}

@singleton()
export class Configuration implements IConfiguration {
  public app: AppConfiguration
  public twitch: TwitchConfiguration

  constructor() {
    dotenv.config({ path: path.join(__dirname, '../.env') })

    this.app = {
      debug: process.env.DEBUG?.toLocaleLowerCase() == 'true' ?? false,
      port: process.env.PORT || '8000',
      jwtSecret: process.env.JWT_SECRET || '',
      clientURL: process.env.CLIENT_URL || ''
    }

    this.twitch = {
      clientID: process.env.TWITCH_CLIENT_ID || '',
      clientSecret: process.env.TWITCH_CLIENT_SECRET || '',
      redirectURI: process.env.TWITCH_REDIRECT_URI || '',
      channelId: process.env.CHANNEL_ID || '',
      scopes: ['user:read:email']
    }
  }
}
