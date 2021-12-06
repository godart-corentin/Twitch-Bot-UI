import { HTTPMethods, RouteHandlerMethod } from 'fastify'

type Route = {
  method: HTTPMethods
  path: string
  handler: RouteHandlerMethod
}

export type Router = {
  prefix: string
  routes: Array<Route>
}
