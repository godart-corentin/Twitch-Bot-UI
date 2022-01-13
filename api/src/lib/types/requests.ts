import { FastifyRequest } from 'fastify'
import { Command } from '.'

export type VerifyCodeRequest = FastifyRequest<{
  Querystring: { code: string }
}>

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

export type UpdatePrefixRequest = FastifyRequest<{
  Body: {
    prefix: string
  }
}>
