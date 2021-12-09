import { inject, singleton } from 'tsyringe'
import jwt from 'jsonwebtoken'

import { IConfiguration } from '../Configuration'
import { Session } from '../lib/types'
import { ITwitchTokenService } from '.'

export interface ITokenService {
  isExpired(session: Session): boolean
  generateJWT(session: Session): Promise<string | undefined>
  verifyJWT(token: string): Promise<Session>
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

  isExpired(session: Session): boolean {
    const now = new Date()
    const expiredDate = new Date(session.tokenCreationDate)
    expiredDate.setSeconds(expiredDate.getSeconds() + session.expiresIn)

    return now > expiredDate
  }

  generateJWT(session: Session): Promise<string | undefined> {
    return new Promise((resolve, reject) => {
      jwt.sign(
        session,
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

  verifyJWT(token: string): Promise<Session> {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        this._configuration.app.jwtSecret,
        function (err, decoded) {
          if (err) {
            reject(err)
          }
          resolve(decoded as Session)
        }
      )
    })
  }

  async verifyTokens(token: string): Promise<Session | null> {
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
