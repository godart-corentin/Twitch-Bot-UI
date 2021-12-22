import { MiddlewareFn } from '../../types'

export const Middleware = (middleware: MiddlewareFn): MethodDecorator => {
  return (target: any, propertyKey: string | symbol): void => {
    if (!Reflect.hasMetadata('middlewares', target, propertyKey)) {
      Reflect.defineMetadata('middlewares', [], target, propertyKey)
    }

    const middlewares: Array<MiddlewareFn> = Reflect.getMetadata(
      'middlewares',
      target,
      propertyKey
    )
    middlewares.push(middleware)

    Reflect.defineMetadata('middlewares', middlewares, target, propertyKey)
  }
}
