import { Route } from '../../types'

export const Delete = (path: string): MethodDecorator => {
  return (target: any, propertyKey: string | symbol): void => {
    if (!Reflect.hasMetadata('routes', target.constructor)) {
      Reflect.defineMetadata('routes', [], target.constructor)
    }

    const routes: Array<Route> = Reflect.getMetadata(
      'routes',
      target.constructor
    )

    routes.push({
      requestMethod: 'DELETE',
      path,
      methodName: propertyKey as string
    })
  }
}
