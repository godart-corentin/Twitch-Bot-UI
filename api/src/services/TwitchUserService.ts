import { inject, singleton } from 'tsyringe'
import axios from 'axios'

import { IConfiguration } from '../Configuration'
import { TwitchUserResponse } from '../lib/types'
import { ITwitchChannelService } from '.'

export interface ITwitchUserService {
  getUserFromToken(token: string): Promise<TwitchUserResponse | null>
}

@singleton()
export class TwitchUserService implements ITwitchUserService {
  private _configuration: IConfiguration
  private _twitchChannelService: ITwitchChannelService

  constructor(
    @inject('IConfiguration') configuration: IConfiguration,
    @inject('ITwitchChannelService') twitchChannelService: ITwitchChannelService
  ) {
    this._configuration = configuration
    this._twitchChannelService = twitchChannelService
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

  async isUserAllowed(token: string, userId: string): Promise<boolean> {
    try {
      let allowed = false
      const moderators = await this._twitchChannelService.getModerators(token)
      console.log(moderators)
      if (moderators) {
        for (const moderator of moderators) {
          if (userId === moderator.user_id) {
            allowed = true
          }
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
