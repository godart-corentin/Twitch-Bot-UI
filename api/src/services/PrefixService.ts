import { inject, singleton } from 'tsyringe'

import { IJSONCommandService } from '.'

export interface IPrefixService {
  getPrefix(): Promise<string>
  updatePrefix(prefix: string): Promise<string>
}

@singleton()
export class PrefixService implements IPrefixService {
  private _jsonCommandService: IJSONCommandService
  private _prefix: string

  constructor(
    @inject('IJSONCommandService') jsonCommandService: IJSONCommandService
  ) {
    this._jsonCommandService = jsonCommandService

    this.initializeData()
  }

  // Initialisation
  private async initializeData(): Promise<void> {
    await this.getPrefix()
  }

  // JSON Actions
  async getPrefix(): Promise<string> {
    if (this._prefix) {
      return this._prefix
    }

    const prefix = await this._jsonCommandService.getPrefix()

    this._prefix = prefix

    return this._prefix
  }

  async updatePrefix(prefix: string): Promise<string> {
    this._prefix = prefix
    await this._jsonCommandService.savePrefix(this._prefix)

    return this._prefix
  }
}
