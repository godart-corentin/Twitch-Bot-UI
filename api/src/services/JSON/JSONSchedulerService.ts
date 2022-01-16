import path from 'path'
import { singleton } from 'tsyringe'

import { Scheduler, SchedulerFile } from '../../lib/types'
import { JSONService } from './JSONService'

export interface IJSONSchedulerService {
  setSchedulersFilepath(path: string): void
  getPrefix(): Promise<string>
  getSchedulers(): Promise<Array<Scheduler>>
  savePrefix(prefix: string): Promise<void>
  saveSchedulers(schedulers: Array<Scheduler>): Promise<void>
}

@singleton()
export class JSONSchedulerService extends JSONService {
  private schedulersFilepath: string

  constructor() {
    super()
    this.schedulersFilepath = path.join(__dirname, '../../../schedulers.json')
  }

  setSchedulersFilepath(path: string) {
    this.schedulersFilepath = path
  }

  private async getSchedulersFile(
    filepath: string
  ): Promise<SchedulerFile | null> {
    try {
      return await this.parseFile<SchedulerFile>(filepath)
    } catch (error) {
      return null
    }
  }

  async getSchedulers(): Promise<Array<Scheduler>> {
    const data = await this.getSchedulersFile(this.schedulersFilepath)
    if (data) {
      return data.schedulers
    }
    return []
  }

  async saveSchedulers(schedulers: Array<Scheduler>) {
    const newSchedulersFile: SchedulerFile = {
      schedulers
    }

    await this.saveFile(
      this.schedulersFilepath,
      JSON.stringify(newSchedulersFile)
    )
  }
}
