import { inject, singleton } from 'tsyringe'
import { v4 as uuidv4 } from 'uuid'

import { Command, GetCommandOptions } from '../lib/types'
import { IJSONCommandService } from '.'

export interface ICommandService {
  getAllCommands(): Promise<Array<Command>>
  getCommand(options: GetCommandOptions): Promise<Command | null>
  createCommand(commandData: Command): Promise<Command>
  updateCommand(commandData: Command, commandId: string): Promise<Command>
  deleteCommand(commandId: string): Promise<void>
}

@singleton()
export class CommandService implements ICommandService {
  private _jsonCommandService: IJSONCommandService
  private _commands: Array<Command>

  constructor(
    @inject('IJSONCommandService') jsonCommandService: IJSONCommandService
  ) {
    this._jsonCommandService = jsonCommandService

    this.initializeData()
  }

  // Initialisation
  private async initializeData(): Promise<void> {
    await this.getAllCommands()
  }

  // JSON Actions
  async getAllCommands(): Promise<Array<Command>> {
    if (this._commands) {
      return this._commands
    }

    const commands = await this._jsonCommandService.getCommands()

    this._commands = commands

    return this._commands || []
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

      await this._jsonCommandService.saveCommandsFile({
        commands: this._commands
      })

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

      await this._jsonCommandService.saveCommandsFile({
        commands: this._commands
      })

      return myCommand
    } else {
      throw "This command doesn't exist."
    }
  }

  async deleteCommand(commandId: string): Promise<void> {
    const command = await this.getCommand({ id: commandId })
    if (command) {
      this._commands = this._commands.filter((com) => com.id !== commandId)

      await this._jsonCommandService.saveCommandsFile({
        commands: this._commands
      })
    } else {
      throw "This command doesn't exist."
    }
  }
}
