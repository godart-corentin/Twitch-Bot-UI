import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify'

export type Route = {
  path: string
  requestMethod: 'GET' | 'POST' | 'DELETE' | 'OPTIONS' | 'PUT'
  methodName: string
}

export type MiddlewareFn = (
  request: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction
) => void
