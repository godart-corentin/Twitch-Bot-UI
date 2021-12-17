import { inject, singleton } from 'tsyringe'
import axios from 'axios'

import { IConfiguration } from '../Configuration'
import { TwitchUserResponse } from '../lib/types'
import { IWhitelistService } from '.'

export interface ITwitchUserService {
  getUserFromToken(token: string): Promise<TwitchUserResponse | null>
  isUserAllowed(userId: string): Promise<boolean>
}

@singleton()
export class TwitchUserService implements ITwitchUserService {
  private _configuration: IConfiguration
  private _whitelistService: IWhitelistService

  constructor(
    @inject('IConfiguration') configuration: IConfiguration,
    @inject('IWhitelistService') whitelistService: IWhitelistService
  ) {
    this._configuration = configuration
    this._whitelistService = whitelistService
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

  async isUserAllowed(userId: string): Promise<boolean> {
    try {
      let allowed = false

      const authorizedUsers = this._whitelistService.getAuthorizedUsers()
      for (const user of authorizedUsers) {
        if (userId === user.id.toString()) {
          allowed = true
        }
      }

      if (userId === this._configuration.twitch.channelId) {
        allowed = true
      }

      return allowed
    } catch (e) {
      console.log(e)
      return false
    }
  }
}
