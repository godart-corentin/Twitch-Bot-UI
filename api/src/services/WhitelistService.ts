import fs from 'fs'
import path from 'path'
import { singleton } from 'tsyringe'

import { AuthorizedUser, WhitelistData } from '../lib/types'

export interface IWhitelistService {
  getAuthorizedUsers(): Array<AuthorizedUser>
}

@singleton()
export class WhitelistService implements IWhitelistService {
  getAuthorizedUsers(): Array<AuthorizedUser> {
    const filePath = path.join(__dirname, '../../whitelist.json')
    const rawData = fs.readFileSync(filePath)
    const jsonData: WhitelistData = JSON.parse(rawData.toString())
    return jsonData.authorizedUsers
  }
}
