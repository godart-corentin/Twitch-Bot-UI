import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

import { Controller, Get } from '../lib/decorators'
import { MessageResponse } from '../lib/types'
import { TokenService, TwitchUserService } from '../services'

@Controller('/twitch/user')
export class TwitchUserController {
  @Get('/me')
  async me(req: FastifyRequest, reply: FastifyReply) {
    const tokenService = container.resolve(TokenService)
    const twitchUserService = container.resolve(TwitchUserService)

    const jwtToken = req.cookies['__HOST-Token']
    if (jwtToken) {
      const tokens = await tokenService.verifyTokens(jwtToken)
      if (tokens) {
        const newJwtToken = await tokenService.generateJWT({
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          expiresIn: tokens.expiresIn,
          tokenCreationDate: new Date()
        })
        if (newJwtToken) {
          const expiredDate = new Date()
          expiredDate.setSeconds(expiredDate.getSeconds() + 3600)

          reply.setCookie('__HOST-Token', newJwtToken, {
            httpOnly: false,
            expires: expiredDate,
            path: '/'
          })

          const user = await twitchUserService.getUserFromToken(
            tokens.accessToken
          )
          if (user) {
            const isUserAllowed = await twitchUserService.isUserAllowed(user.id)
            if (isUserAllowed) {
              return reply.code(200).send({
                user: {
                  name: user.display_name,
                  picture: user.profile_image_url
                }
              })
            } else {
              reply.clearCookie('__HOST-Token', {
                httpOnly: false,
                path: '/'
              })

              return reply.code(401).send({
                status: 401,
                message: "You're not allowed to access this content."
              } as MessageResponse)
            }
          }
        }
      }
    }
    reply.clearCookie('__HOST-Token', {
      httpOnly: false,
      path: '/'
    })

    return reply.code(401).send({
      status: 401,
      message: 'The token is invalid'
    } as MessageResponse)
  }
}
