export type TwitchModerator = {
  user_id: string
  user_login: string
  user_name: string
}

/* Responses */

export type TokenResponse = {
  access_token: string
  expires_in: number
  refresh_token: string
  scope: Array<string>
  token_type: string
}

export type TwitchUserResponse = {
  id: string
  login: string
  display_name: string
  type: string
  broadcaster_type: string
  description: string
  profile_image_url: string
  offline_image_url: string
  view_count: number
  email: string
  created_at: string
}

export type TwitchModeratorResponse = {
  data: Array<TwitchModerator>
}
