import { FastifyRequest } from 'fastify'
import { Command, Scheduler } from '.'

export type VerifyCodeRequest = FastifyRequest<{
  Querystring: { code: string }
}>

/** Command Requests */

export type GetCommandByNameRequest = FastifyRequest<{
  Params: {
    name: string
  }
}>

export type GetCommandByIdRequest = FastifyRequest<{
  Params: {
    id: string
  }
}>

export type CreateCommandRequest = FastifyRequest<{
  Body: Command
}>

export type UpdateCommandRequest = FastifyRequest<{
  Body: Command
  Params: {
    id: string
  }
}>

export type DeleteCommandRequest = FastifyRequest<{
  Params: {
    id: string
  }
}>

/** Prefix Requests */

export type UpdatePrefixRequest = FastifyRequest<{
  Body: {
    prefix: string
  }
}>

/** Schedulers Requests */
export type GetSchedulerRequest = FastifyRequest<{
  Params: {
    id: string
  }
}>

export type CreateSchedulerRequest = FastifyRequest<{
  Body: Scheduler
}>

export type UpdateSchedulerRequest = FastifyRequest<{
  Body: Scheduler
  Params: {
    id: string
  }
}>

export type DeleteSchedulerRequest = FastifyRequest<{
  Params: {
    id: string
  }
}>
