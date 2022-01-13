import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

import { Controller, Get, Post, Put, Delete } from '../lib/decorators'
import {
  CreateCommandRequest,
  DeleteCommandRequest,
  GetCommandByIdRequest,
  GetCommandByNameRequest,
  UpdateCommandRequest
} from '../lib/types'
import { CommandService, ICommandService } from '../services'

@Controller('/commands')
export class CommandController {
  private _commandService: ICommandService

  constructor() {
    this._commandService = container.resolve(CommandService)
  }

  @Get('/')
  async getAll(req: FastifyRequest, reply: FastifyReply) {
    try {
      const commands = await this._commandService.getAllCommands()

      return reply.code(200).send({ commands })
    } catch (error) {
      return reply.code(500).send({ error })
    }
  }

  @Get('/byName/:name')
  async getByName(req: GetCommandByNameRequest, reply: FastifyReply) {
    try {
      const command = await this._commandService.getCommand({
        name: req.params.name
      })

      return reply.code(200).send({ command })
    } catch (error) {
      return reply.code(500).send({ error })
    }
  }

  @Get('/byId/:id')
  async getById(req: GetCommandByIdRequest, reply: FastifyReply) {
    try {
      const command = await this._commandService.getCommand({
        id: req.params.id
      })

      return reply.code(200).send({ command })
    } catch (error) {
      return reply.code(500).send({ error })
    }
  }

  @Post('/')
  async create(req: CreateCommandRequest, reply: FastifyReply) {
    try {
      const newCommand = await this._commandService.createCommand(req.body)

      return reply.code(200).send({ command: newCommand })
    } catch (error) {
      return reply.code(500).send({ error })
    }
  }

  @Put('/:id')
  async update(req: UpdateCommandRequest, reply: FastifyReply) {
    try {
      const updatedCommand = await this._commandService.updateCommand(
        req.body,
        req.params.id
      )

      return reply.code(200).send({ command: updatedCommand })
    } catch (error) {
      return reply.code(500).send({ error })
    }
  }

  @Delete('/:id')
  async delete(req: DeleteCommandRequest, reply: FastifyReply) {
    try {
      await this._commandService.deleteCommand(req.params.id)

      return reply.code(200).send({ success: true })
    } catch (error) {
      return reply.code(500).send({ error })
    }
  }
}
