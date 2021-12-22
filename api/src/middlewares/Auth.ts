import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify'

export const AuthGuard = (
  request: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction
) => {
  console.log(request.cookies)
  done()
}
