import path from 'path'
import os from 'os'
import { rmSync } from 'fs'
import 'reflect-metadata'
import { container } from 'tsyringe'

import { CommandFile } from '../lib/types'
import { IJSONService, JSONService } from '../services'

describe('Testing JSONService class', () => {
  let jsonService: IJSONService
  let commandFilepath: string

  beforeAll(() => {
    jsonService = container.resolve(JSONService)
    commandFilepath = path.join(__dirname, './dummy_data/commands.json')
  })

  describe('Saving File with incorrect content', () => {
    const incorrectContent = 'null'

    it('Should rejects a string containing an error', async () => {
      try {
        await jsonService.saveFile(commandFilepath, incorrectContent)
      } catch (error) {
        expect(error).toBe('Error while saving the JSON file.')
      }
    })
  })

  describe('Saving File with correct content', () => {
    const content: CommandFile = {
      commands: [
        {
          name: 'Test',
          command: 't',
          message: 'Ceci est un test',
          policies: { admin: true, mod: true, others: true },
          id: '1'
        }
      ],
      prefix: '!'
    }

    it('Should rejects a string containing an error', async () => {
      try {
        await jsonService.saveFile(commandFilepath, JSON.stringify(content))
        expect(true).toBeTruthy()
      } catch (error) {
        console.log(error)
      }
    })
  })

  describe('Saving File in unauthorized folder', () => {
    const content: CommandFile = {
      commands: [
        {
          name: 'Test',
          command: 't',
          message: 'Ceci est un test',
          policies: { admin: true, mod: true, others: true },
          id: '1'
        }
      ],
      prefix: '!'
    }
    let filePath: string

    beforeAll(() => {
      if (os.platform() === 'win32') {
        filePath = 'C:\\Windows\\notallowed\\unauthorized.json'
      } else {
        filePath = '/root/notallowed/unauthorized.json'
      }
    })

    it('Should rejects a string containing an error', async () => {
      try {
        await jsonService.saveFile(filePath, JSON.stringify(content))
      } catch (error) {
        expect(error).toBe('Error while saving the JSON file.')
      }
    })
  })

  describe('Parsing File with incorrect path', () => {
    it('Should rejects a string containing an error', async () => {
      try {
        await jsonService.parseFile<CommandFile>(
          path.join(__dirname, './dummy_data/not_exists.json')
        )
      } catch (error) {
        expect(error).toBe('Error while parsing the JSON file.')
      }
    })
  })

  describe('Parsing File with correct path', () => {
    it('Should parse the file correctly', async () => {
      const commandFileExample: CommandFile = {
        commands: [
          {
            name: 'Test',
            command: 't',
            message: 'Ceci est un test',
            policies: { admin: true, mod: true, others: true },
            id: '1'
          }
        ],
        prefix: '!'
      }
      const parsedFile = await jsonService.parseFile<CommandFile>(
        commandFilepath
      )
      expect(parsedFile).toMatchObject(commandFileExample)
    })
  })

  afterAll(() => {
    rmSync(path.join(__dirname, './dummy_data'), {
      recursive: true,
      force: true
    })
  })
})
