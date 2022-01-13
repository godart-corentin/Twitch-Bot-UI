import 'reflect-metadata'
import path from 'path'
import { rmSync } from 'fs'

import {
  IPrefixService,
  JSONCommandService,
  PrefixService
} from '../../services'

describe('Testing PrefixService.ts', () => {
  let prefixService: IPrefixService

  beforeAll(() => {
    const jsonCommandService = new JSONCommandService()
    jsonCommandService.setCommandsFilepath(
      path.join(__dirname, '../dummy_data/commands.json')
    )
    prefixService = new PrefixService(jsonCommandService)
  })

  describe('Update prefix successfully', () => {
    it('Should return the new prefix', async () => {
      const prefix = await prefixService.updatePrefix('k')
      expect(prefix).toBe('k')
    })
  })

  describe('Get prefix', () => {
    it('Should return the prefix', async () => {
      const prefix = await prefixService.getPrefix()
      expect(prefix).toBe('k')
    })
  })

  afterAll(() => {
    rmSync(path.join(__dirname, '../dummy_data'), {
      force: true,
      recursive: true
    })
  })
})
