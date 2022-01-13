import 'reflect-metadata'
import path from 'path'
import os from 'os'
import { rmSync } from 'fs'

import { IJSONService, JSONService } from '../../services'

describe('Testing JSONService class', () => {
  let jsonService: IJSONService
  let filepath: string

  beforeAll(() => {
    jsonService = new JSONService()
    filepath = path.join(__dirname, '../dummy_data/test.json')
  })

  describe('Saving File with incorrect content', () => {
    const incorrectContent = 'null'

    it('Should rejects a string containing an error', async () => {
      try {
        await jsonService.saveFile(filepath, incorrectContent)
      } catch (error) {
        expect(error).toBe('Error while saving the JSON file.')
      }
    })
  })

  describe('Saving File with correct content', () => {
    const test = {
      test: 'test'
    }

    it('Should be successful', async () => {
      try {
        await jsonService.saveFile(filepath, JSON.stringify(test))
        expect(true).toBeTruthy()
      } catch (error) {
        console.log(error)
      }
    })
  })

  describe('Saving File in unauthorized folder', () => {
    const test = {
      test: 'test'
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
        await jsonService.saveFile(filePath, JSON.stringify(test))
      } catch (error) {
        expect(error).toBe('Error while saving the JSON file.')
      }
    })
  })

  describe('Parsing File with incorrect path', () => {
    it('Should rejects a string containing an error', async () => {
      try {
        await jsonService.parseFile<{ test: string }>(
          path.join(__dirname, './dummy_data/not_exists.json')
        )
      } catch (error) {
        expect(error).toBe('Error while parsing the JSON file.')
      }
    })
  })

  describe('Parsing File with correct path', () => {
    it('Should parse the file correctly', async () => {
      const test = {
        test: 'test'
      }
      const parsedFile = await jsonService.parseFile<{ test: string }>(filepath)
      expect(parsedFile).toMatchObject(test)
    })
  })

  afterAll(() => {
    rmSync(path.join(__dirname, '../dummy_data'), {
      recursive: true,
      force: true
    })
  })
})
