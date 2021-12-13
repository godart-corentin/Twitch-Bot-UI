export type AppConfiguration = {
  debug: boolean
  port: string
  jwtSecret: string
  clientURL: string
}

export type TwitchConfiguration = {
  clientID: string
  clientSecret: string
  redirectURI: string
  channelId: string
  scopes: Array<string>
}
