import { inject, singleton } from 'tsyringe'
import axios from 'axios'

import { IConfiguration } from '../Configuration'
import { TwitchModerator, TwitchModeratorResponse } from '../lib/types'

export interface ITwitchChannelService {
  getModerators(token: string): Promise<Array<TwitchModerator> | null>
}

@singleton()
export class TwitchChannelService implements ITwitchChannelService {
  private _configuration: IConfiguration

  constructor(@inject('IConfiguration') configuration: IConfiguration) {
    this._configuration = configuration
  }

  async getModerators(token: string): Promise<Array<TwitchModerator> | null> {
    try {
      const { data }: { data: TwitchModeratorResponse } = await axios.get(
        `https://api.twitch.tv/helix/moderation/moderators?broadcaster_id=${this._configuration.twitch.channelId}`,
        {
          headers: {
            Authorization: 'Bearer ' + token,
            'Client-Id': this._configuration.twitch.clientID
          }
        }
      )
      return data.data
    } catch (e) {
      console.log(e)
      return null
    }
  }
}
