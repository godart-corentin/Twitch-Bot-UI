export type Route = {
  path: string
  requestMethod: 'GET' | 'POST' | 'DELETE' | 'OPTIONS' | 'PUT'
  methodName: string
}
