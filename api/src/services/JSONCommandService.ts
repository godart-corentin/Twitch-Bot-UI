import path from 'path'
import { singleton } from 'tsyringe'

import { Command, CommandFile, SaveCommandsFileData } from '../lib/types'
import { JSONService } from './JSONService'

export interface IJSONCommandService {
  getPrefix(): Promise<string>
  getCommands(): Promise<Array<Command>>
  saveCommandsFile(data: SaveCommandsFileData): Promise<void>
}

@singleton()
export class JSONCommandService extends JSONService {
  private async getCommandsFile(): Promise<CommandFile> {
    return await this.parseFile<CommandFile>(
      path.join(__dirname, '../../commands.json')
    )
  }

  async getPrefix(): Promise<string> {
    const { prefix } = await this.getCommandsFile()
    return prefix
  }

  async getCommands(): Promise<Array<Command>> {
    const { commands } = await this.getCommandsFile()
    return commands
  }

  async saveCommandsFile(data: SaveCommandsFileData): Promise<void> {
    const currentCommandsFile = await this.getCommandsFile()
    const newCommandsFile: CommandFile = {
      prefix: data.prefix || currentCommandsFile.prefix,
      commands: data.commands || currentCommandsFile.commands
    }

    await this.saveFile(
      path.join(__dirname, '../../commands.json'),
      JSON.stringify(newCommandsFile)
    )
  }
}
