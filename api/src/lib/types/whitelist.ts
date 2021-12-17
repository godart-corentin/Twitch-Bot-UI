export type AuthorizedUser = {
    id: number
    role: 'administrator' | 'moderator'
}

export type WhitelistData = {
    authorizedUsers: Array<AuthorizedUser>
}