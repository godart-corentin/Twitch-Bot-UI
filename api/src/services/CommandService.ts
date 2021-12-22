import { inject, singleton } from 'tsyringe'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

import { Command, CommandFile, GetCommandOptions } from '../lib/types'
import { IJSONService } from '.'

export interface ICommandService {
  getPrefix(): Promise<string>
  getAllCommands(): Promise<Array<Command>>
  saveCommandFile(): Promise<void>

  getCommand(options: GetCommandOptions): Promise<Command | null>
  createCommand(commandData: Command): Promise<Command>
  updateCommand(commandData: Command, commandId: string): Promise<Command>
  deleteCommand(commandId: string): Promise<void>
}

@singleton()
export class CommandService implements ICommandService {
  private _jsonService: IJSONService
  private _commands: Array<Command>
  private _prefix: string

  constructor(@inject('IJSONService') jsonService: IJSONService) {
    this._jsonService = jsonService

    this.initializeData()
  }

  // Initialisation
  private async initializeData(): Promise<void> {
    await this.getAllCommands()
    await this.getPrefix()
  }

  // JSON Actions
  async getPrefix(): Promise<string> {
    if (this._prefix) {
      return this._prefix
    }

    const data = await this._jsonService.parseFile<CommandFile>(
      path.join(__dirname, '../../commands.json')
    )

    this._prefix = data.prefix

    return this._prefix
  }

  async getAllCommands(): Promise<Array<Command>> {
    if (this._commands) {
      return this._commands
    }

    const data = await this._jsonService.parseFile<CommandFile>(
      path.join(__dirname, '../../commands.json')
    )

    this._commands = data.commands

    return this._commands || []
  }

  async saveCommandFile(): Promise<void> {
    const prefix = await this.getPrefix()
    const commands = await this.getAllCommands()

    const newCommandFile: CommandFile = {
      prefix,
      commands
    }
    await this._jsonService.saveFile(
      path.join(__dirname, '../../commands.json'),
      JSON.stringify(newCommandFile)
    )
  }

  // CRUD
  async getCommand(options: GetCommandOptions): Promise<Command | null> {
    const commands = await this.getAllCommands()
    if (commands) {
      let command: Command | null = null
      for (const com of commands) {
        if (options.name && com.name === options.name) {
          command = com
        }
        if (options.id && com.id === options.id) {
          command = com
        }
      }
      if (command) {
        return command
      }
      return null
    }
    throw "There isn't any command."
  }

  async createCommand(commandData: Command): Promise<Command> {
    const cmd = await this.getCommand({ name: commandData.name })
    if (!cmd) {
      const newCommand: Command = {
        ...commandData,
        id: uuidv4()
      }
      this._commands.push(newCommand)

      await this.saveCommandFile()

      return newCommand
    } else {
      throw 'This command already exists.'
    }
  }

  async updateCommand(
    commandData: Command,
    commandId: string
  ): Promise<Command> {
    let myCommand = await this.getCommand({ id: commandId })

    if (myCommand) {
      myCommand = {
        ...commandData,
        id: commandId
      }

      const cmdIndex = this._commands.findIndex((cmd) => cmd.id === commandId)
      this._commands[cmdIndex] = myCommand

      await this.saveCommandFile()

      return myCommand
    } else {
      throw "This command doesn't exist."
    }
  }

  async deleteCommand(commandId: string): Promise<void> {
    const command = await this.getCommand({ id: commandId })
    if (command) {
      this._commands = this._commands.filter((com) => com.id !== commandId)

      await this.saveCommandFile()
    } else {
      throw "This command doesn't exist."
    }
  }
}
