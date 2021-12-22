import { FastifyRequest } from 'fastify'
import { Command } from '.'

export type VerifyCodeRequest = FastifyRequest<{
  Querystring: { code: string }
}>

export type GetOneCommandRequest = FastifyRequest<{
  Params: {
    name: string
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
