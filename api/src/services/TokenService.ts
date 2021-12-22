import { inject, singleton } from 'tsyringe'
import jwt from 'jsonwebtoken'

import { IConfiguration } from '../Configuration'
import { UserTokens } from '../lib/types'
import { ITwitchTokenService } from '.'

export interface ITokenService {
  isExpired(userTokens: UserTokens): boolean
  generateJWT(userTokens: UserTokens): Promise<string | undefined>
  verifyJWT(token: string): Promise<UserTokens>
}

@singleton()
export class TokenService implements ITokenService {
  private _configuration: IConfiguration
  private _twitchTokenService: ITwitchTokenService

  constructor(
    @inject('IConfiguration') configuration: IConfiguration,
    @inject('ITwitchTokenService') twitchTokenService: ITwitchTokenService
  ) {
    this._configuration = configuration
    this._twitchTokenService = twitchTokenService
  }

  isExpired(userTokens: UserTokens): boolean {
    const now = new Date()
    const expiredDate = new Date(userTokens.tokenCreationDate)
    expiredDate.setSeconds(expiredDate.getSeconds() + userTokens.expiresIn)

    return now > expiredDate
  }

  generateJWT(userTokens: UserTokens): Promise<string | undefined> {
    return new Promise((resolve, reject) => {
      jwt.sign(
        userTokens,
        this._configuration.app.jwtSecret,
        {},
        function (err, token) {
          if (err) {
            reject(err)
          }
          resolve(token)
        }
      )
    })
  }

  verifyJWT(token: string): Promise<UserTokens> {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        this._configuration.app.jwtSecret,
        function (err, decoded) {
          if (err) {
            reject(err)
          }
          resolve(decoded as UserTokens)
        }
      )
    })
  }

  async verifyTokens(token: string): Promise<UserTokens | null> {
    try {
      let tokens = await this.verifyJWT(token)
      if (this.isExpired(tokens)) {
        const newTokens = await this._twitchTokenService.refreshToken(
          tokens.refreshToken
        )
        if (newTokens) {
          tokens = {
            accessToken: newTokens.access_token,
            refreshToken: newTokens.refresh_token,
            expiresIn: newTokens.expires_in,
            tokenCreationDate: new Date()
          }
        }
      }

      return tokens
    } catch (e) {
      return null
    }
  }
}
