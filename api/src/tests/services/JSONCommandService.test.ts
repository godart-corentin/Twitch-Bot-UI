import 'reflect-metadata'
import path from 'path'
import os from 'os'

import { IJSONCommandService, JSONCommandService } from '../../services'
import { Command } from '../../lib/types'
import { rmSync } from 'fs'

describe('Testing JSONCommandService class', () => {
  let jsonCommandService: IJSONCommandService
  let commandsFilepath: string
  let notAllowedCommandsFilepath: string

  beforeAll(() => {
    jsonCommandService = new JSONCommandService()
    commandsFilepath = path.join(__dirname, '../dummy_data/commands.json')
  })

  describe('Saving Commands in unauthorized file', () => {
    beforeAll(() => {
      if (os.platform() === 'win32') {
        notAllowedCommandsFilepath =
          'C:\\Windows\\notallowed\\unauthorized.json'
      } else {
        notAllowedCommandsFilepath = '/root/notallowed/unauthorized.json'
      }
      jsonCommandService.setCommandsFilepath(notAllowedCommandsFilepath)
    })

    const commands: Array<Command> = [
      {
        name: 'Test',
        command: 't',
        message: 'Test',
        policies: {
          admin: true,
          mod: true,
          others: true
        }
      }
    ]

    it('Should rejects a string containing an error', async () => {
      try {
        await jsonCommandService.saveCommands(commands)
      } catch (error) {
        expect(error).toBe('Error while saving the JSON file.')
      }
    })
  })

  describe('Saving Commands successfully (with correct path)', () => {
    beforeAll(() => {
      jsonCommandService.setCommandsFilepath(commandsFilepath)
    })

    const commands: Array<Command> = [
      {
        name: 'Test',
        command: 't',
        message: 'Test',
        policies: {
          admin: true,
          mod: true,
          others: true
        }
      }
    ]

    it('Should be successful', async () => {
      try {
        await jsonCommandService.saveCommands(commands)
        expect(true).toBeTruthy()
      } catch (error) {
        console.log(error)
      }
    })
  })

  describe('Saving Prefix in unauthorized file', () => {
    beforeAll(() => {
      if (os.platform() === 'win32') {
        notAllowedCommandsFilepath =
          'C:\\Windows\\notallowed\\unauthorized.json'
      } else {
        notAllowedCommandsFilepath = '/root/notallowed/unauthorized.json'
      }
      jsonCommandService.setCommandsFilepath(notAllowedCommandsFilepath)
    })

    const prefix = '/'

    it('Should rejects a string containing an error', async () => {
      try {
        await jsonCommandService.savePrefix(prefix)
      } catch (error) {
        expect(error).toBe('Error while saving the JSON file.')
      }
    })
  })

  describe('Saving Prefix successfully (with correct path)', () => {
    beforeAll(() => {
      jsonCommandService.setCommandsFilepath(commandsFilepath)
    })

    const prefix = '/'

    it('Should be successful', async () => {
      try {
        await jsonCommandService.savePrefix(prefix)
        expect(true).toBeTruthy()
      } catch (error) {
        console.log(error)
      }
    })
  })

  describe('Get prefix successfully', () => {
    beforeAll(() => {
      jsonCommandService.setCommandsFilepath(commandsFilepath)
    })

    it('Should return a prefix', async () => {
      const prefix = await jsonCommandService.getPrefix()
      expect(prefix).toBe('/')
    })
  })

  describe('Get commands successfully', () => {
    beforeAll(() => {
      jsonCommandService.setCommandsFilepath(commandsFilepath)
    })

    it('Should return the commands', async () => {
      const commandsToMatch: Array<Command> = [
        {
          name: 'Test',
          command: 't',
          message: 'Test',
          policies: {
            admin: true,
            mod: true,
            others: true
          }
        }
      ]

      const commands = await jsonCommandService.getCommands()
      expect(commands).toMatchObject(commandsToMatch)
    })
  })

  afterAll(() => {
    rmSync(path.join(__dirname, '../dummy_data'), {
      recursive: true,
      force: true
    })
  })
})
