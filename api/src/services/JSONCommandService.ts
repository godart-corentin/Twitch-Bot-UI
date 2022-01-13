import path from 'path'
import { singleton } from 'tsyringe'

import { Command, CommandFile } from '../lib/types'
import { JSONService } from './JSONService'

export interface IJSONCommandService {
  setCommandsFilepath(path: string): void
  getPrefix(): Promise<string>
  getCommands(): Promise<Array<Command>>
  savePrefix(prefix: string): Promise<void>
  saveCommands(commands: Array<Command>): Promise<void>
}

@singleton()
export class JSONCommandService extends JSONService {
  private commandsFilepath: string

  constructor() {
    super()
    this.commandsFilepath = path.join(__dirname, '../../commands.json')
  }

  setCommandsFilepath(path: string) {
    this.commandsFilepath = path
  }

  private async getCommandsFile(filepath: string): Promise<CommandFile | null> {
    try {
      return await this.parseFile<CommandFile>(filepath)
    } catch (error) {
      return null
    }
  }

  async getPrefix(): Promise<string> {
    const data = await this.getCommandsFile(this.commandsFilepath)
    if (data) {
      return data.prefix
    }
    return ''
  }

  async getCommands(): Promise<Array<Command>> {
    const data = await this.getCommandsFile(this.commandsFilepath)
    if (data) {
      return data.commands
    }
    return []
  }

  async savePrefix(prefix: string) {
    const commands = await this.getCommands()

    const newCommandsFile: CommandFile = {
      prefix,
      commands
    }

    await this.saveFile(this.commandsFilepath, JSON.stringify(newCommandsFile))
  }

  async saveCommands(commands: Array<Command>) {
    const prefix = await this.getPrefix()

    const newCommandsFile: CommandFile = {
      prefix,
      commands
    }

    await this.saveFile(this.commandsFilepath, JSON.stringify(newCommandsFile))
  }
}
