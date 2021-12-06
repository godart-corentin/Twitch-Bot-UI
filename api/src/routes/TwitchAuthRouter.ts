import { TwitchAuthController } from '../handlers'
import { Router } from './Router'

export const TwitchAuthRouter: Router = {
  prefix: '/auth/twitch',
  routes: [
    {
      method: 'GET',
      path: '/redirect',
      handler: TwitchAuthController.redirect
    }
  ]
}
