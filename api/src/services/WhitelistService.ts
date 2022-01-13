import fs from 'fs'
import path from 'path'
import { singleton } from 'tsyringe'

import { AuthorizedUser, WhitelistData } from '../lib/types'

export interface IWhitelistService {
  setFilePath(path: string): void
  getAuthorizedUsers(): Array<AuthorizedUser>
}

@singleton()
export class WhitelistService implements IWhitelistService {
  private filepath: string

  constructor() {
    this.filepath = path.join(__dirname, '../../whitelist.json')
  }

  setFilePath(path: string): void {
    this.filepath = path
  }

  getAuthorizedUsers(): Array<AuthorizedUser> {
    const rawData = fs.readFileSync(this.filepath)
    const jsonData: WhitelistData = JSON.parse(rawData.toString())
    return jsonData.authorizedUsers
  }
}
