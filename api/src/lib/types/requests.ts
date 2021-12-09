import { FastifyRequest } from 'fastify'

export type VerifyCodeRequest = FastifyRequest<{
  Querystring: { code: string }
}>
