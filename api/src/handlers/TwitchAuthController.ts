import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

import { Configuration } from '../config'

export class TwitchAuthController {
  static async redirect(req: FastifyRequest, reply: FastifyReply) {
    const { twitch } = container.resolve(Configuration)
    return reply.redirect(
      301,
      `https://id.twitch.tv/oauth2/authorize?client_id=${twitch.clientID}&redirect_uri=${twitch.redirectURI}&response_type=code&scope=user:read:email`
    )
  }
}
