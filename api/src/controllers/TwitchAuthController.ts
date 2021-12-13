import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

import { Controller, Get } from '../lib/decorators'
import { MessageResponse, VerifyCodeRequest } from '../lib/types'
import { Configuration } from '../Configuration'
import { TokenService, TwitchTokenService } from '../services'

@Controller('/twitch/auth')
export class TwitchAuthController {
  @Get('/redirect')
  async redirect(req: FastifyRequest, reply: FastifyReply) {
    const { twitch } = container.resolve(Configuration)
    return reply.redirect(
      301,
      `https://id.twitch.tv/oauth2/authorize?client_id=${
        twitch.clientID
      }&redirect_uri=${
        twitch.redirectURI
      }&response_type=code&scope=${twitch.scopes.join(' ')}`
    )
  }

  @Get('/verifyCode')
  async verifyCode(req: VerifyCodeRequest, reply: FastifyReply) {
    const { code } = req.query
    const tokenService = container.resolve(TokenService)
    const twitchTokenService = container.resolve(TwitchTokenService)
    if (code) {
      const twitchTokens = await twitchTokenService.verifyCode(code)
      if (twitchTokens) {
        const jwtToken = await tokenService.generateJWT({
          accessToken: twitchTokens.access_token,
          refreshToken: twitchTokens.refresh_token,
          expiresIn: twitchTokens.expires_in,
          tokenCreationDate: new Date()
        })

        if (jwtToken) {
          const expiredDate = new Date()
          expiredDate.setSeconds(expiredDate.getSeconds() + 3600)

          reply.setCookie('__HOST-Token', jwtToken, {
            httpOnly: false,
            expires: expiredDate,
            path: '/'
          })

          return reply.code(200).send({
            status: 200,
            message: 'La connexion a bien été effectuée.'
          } as MessageResponse)
        }
      }
    }

    return reply.code(400).send({
      status: 200,
      message: "Le code n'a pas été fourni."
    } as MessageResponse)
  }
}
