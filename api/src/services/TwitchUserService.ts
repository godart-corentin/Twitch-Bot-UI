import { inject, singleton } from 'tsyringe'
import axios from 'axios'

import { IConfiguration } from '../Configuration'
import { TwitchUserResponse } from '../lib/types'

export interface ITwitchUserService {
  getUserFromToken(token: string): Promise<TwitchUserResponse | null>
}

@singleton()
export class TwitchUserService implements ITwitchUserService {
  private _configuration: IConfiguration

  constructor(@inject('IConfiguration') configuration: IConfiguration) {
    this._configuration = configuration
  }

  async getUserFromToken(token: string): Promise<TwitchUserResponse | null> {
    try {
      const { data } = await axios.get(`https://api.twitch.tv/helix/users`, {
        headers: {
          Authorization: 'Bearer ' + token,
          'Client-Id': this._configuration.twitch.clientID
        }
      })
      return data.data[0] as TwitchUserResponse
    } catch (e) {
      return null
    }
  }
}
