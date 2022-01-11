import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

import { Controller, Get, Put } from '../lib/decorators'
import { UpdatePrefixRequest } from '../lib/types'
import { IPrefixService, PrefixService } from '../services'

@Controller('/prefix')
export class PrefixController {
  private _prefixService: IPrefixService

  constructor() {
    this._prefixService = container.resolve(PrefixService)
  }

  @Get('/')
  async get(req: FastifyRequest, reply: FastifyReply) {
    try {
      const prefix = await this._prefixService.getPrefix()

      return reply.code(200).send({ prefix })
    } catch (error) {
      return reply.code(500).send({ error })
    }
  }

  @Put('/')
  async updatePrefix(req: UpdatePrefixRequest, reply: FastifyReply) {
    try {
      const newPrefix = await this._prefixService.updatePrefix(req.body.prefix)

      return reply.code(200).send({ prefix: newPrefix })
    } catch (error) {
      return reply.code(500).send({ error })
    }
  }
}
