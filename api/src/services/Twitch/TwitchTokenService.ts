import { inject, singleton } from 'tsyringe'
import axios from 'axios'

import { IConfiguration } from '../../Configuration'
import { TokenResponse } from '../../lib/types'

export interface ITwitchTokenService {
  verifyCode(code: string): Promise<TokenResponse | null>
  refreshToken(refreshToken: string): Promise<TokenResponse | null>
}

@singleton()
export class TwitchTokenService implements ITwitchTokenService {
  private _configuration: IConfiguration

  constructor(@inject('IConfiguration') configuration: IConfiguration) {
    this._configuration = configuration
  }

  async verifyCode(code: string): Promise<TokenResponse | null> {
    const { twitch } = this._configuration
    try {
      const { data }: { data: TokenResponse } = await axios.post(
        `https://id.twitch.tv/oauth2/token?client_id=${twitch.clientID}&client_secret=${twitch.clientSecret}&code=${code}&grant_type=authorization_code&redirect_uri=${twitch.redirectURI}`
      )
      return data as TokenResponse
    } catch (e) {
      return null
    }
  }

  async refreshToken(refreshToken: string): Promise<TokenResponse | null> {
    const { twitch } = this._configuration
    try {
      const { data }: { data: TokenResponse } = await axios.post(
        `https://id.twitch.tv/oauth2/token?grant_type=refresh_token&refresh_token=${refreshToken}&client_id=${twitch.clientID}&client_secret=${twitch.clientSecret}`
      )
      return data as TokenResponse
    } catch (e) {
      return null
    }
  }
}
