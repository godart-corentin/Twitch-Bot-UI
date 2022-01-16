import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'

import { Controller, Get, Post, Put, Delete } from '../lib/decorators'
import {
  CreateSchedulerRequest,
  DeleteSchedulerRequest,
  GetSchedulerRequest,
  UpdateSchedulerRequest
} from '../lib/types'
import { SchedulerService, ISchedulerService } from '../services'

@Controller('/schedulers')
export class SchedulerController {
  private _schedulerService: ISchedulerService

  constructor() {
    this._schedulerService = container.resolve(SchedulerService)
  }

  @Get('/')
  async getAll(req: FastifyRequest, reply: FastifyReply) {
    try {
      const schedulers = await this._schedulerService.getAllSchedulers()

      return reply.code(200).send({ schedulers })
    } catch (error) {
      return reply.code(500).send({ error })
    }
  }

  @Get('/:id')
  async get(req: GetSchedulerRequest, reply: FastifyReply) {
    try {
      const scheduler = await this._schedulerService.getScheduler(req.params.id)

      return reply.code(200).send({ scheduler })
    } catch (error) {
      return reply.code(500).send({ error })
    }
  }

  @Post('/')
  async create(req: CreateSchedulerRequest, reply: FastifyReply) {
    try {
      const newScheduler = await this._schedulerService.createScheduler(
        req.body
      )

      return reply.code(200).send({ scheduler: newScheduler })
    } catch (error) {
      return reply.code(500).send({ error })
    }
  }

  @Put('/:id')
  async update(req: UpdateSchedulerRequest, reply: FastifyReply) {
    try {
      const updatedScheduler = await this._schedulerService.updateScheduler(
        req.body,
        req.params.id
      )

      return reply.code(200).send({ scheduler: updatedScheduler })
    } catch (error) {
      return reply.code(500).send({ error })
    }
  }

  @Delete('/:id')
  async delete(req: DeleteSchedulerRequest, reply: FastifyReply) {
    try {
      await this._schedulerService.deleteScheduler(req.params.id)

      return reply.code(200).send({ success: true })
    } catch (error) {
      return reply.code(500).send({ error })
    }
  }
}
