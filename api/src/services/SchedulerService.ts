import { inject, singleton } from 'tsyringe'
import { v4 as uuidv4 } from 'uuid'

import { Scheduler } from '../lib/types'
import { IJSONSchedulerService } from '.'

export interface ISchedulerService {
  getAllSchedulers(): Promise<Array<Scheduler>>
  getScheduler(id: string): Promise<Scheduler | null>
  createScheduler(schedulerData: Scheduler): Promise<Scheduler>
  updateScheduler(
    schedulerData: Scheduler,
    schedulerId: string
  ): Promise<Scheduler>
  deleteScheduler(schedulerId: string): Promise<void>
}

@singleton()
export class SchedulerService implements ISchedulerService {
  private _jsonSchedulerService: IJSONSchedulerService
  private _schedulers: Array<Scheduler>

  constructor(
    @inject('IJSONSchedulerService') jsonSchedulerService: IJSONSchedulerService
  ) {
    this._jsonSchedulerService = jsonSchedulerService

    this.initializeData()
  }

  // Initialisation
  private async initializeData(): Promise<void> {
    await this.getAllSchedulers()
  }

  // JSON Actions
  async getAllSchedulers(): Promise<Array<Scheduler>> {
    if (this._schedulers) {
      return this._schedulers
    }

    const schedulers = await this._jsonSchedulerService.getSchedulers()

    this._schedulers = schedulers

    return this._schedulers || []
  }

  // CRUD
  async getScheduler(id: string): Promise<Scheduler | null> {
    const schedulers = await this.getAllSchedulers()
    if (schedulers) {
      let scheduler: Scheduler | null = null
      for (const com of schedulers) {
        if (com.id === id) {
          scheduler = com
        }
      }
      if (scheduler) {
        return scheduler
      }
      return null
    }
    throw "There isn't any scheduler."
  }

  async createScheduler(schedulerData: Scheduler): Promise<Scheduler> {
    const newScheduler: Scheduler = {
      ...schedulerData,
      id: uuidv4()
    }
    this._schedulers.push(newScheduler)

    await this._jsonSchedulerService.saveSchedulers(this._schedulers)

    return newScheduler
  }

  async updateScheduler(
    schedulerData: Scheduler,
    schedulerId: string
  ): Promise<Scheduler> {
    let myScheduler = await this.getScheduler(schedulerId)

    if (myScheduler) {
      myScheduler = {
        ...schedulerData,
        id: schedulerId
      }

      const cmdIndex = this._schedulers.findIndex(
        (cmd) => cmd.id === schedulerId
      )
      this._schedulers[cmdIndex] = myScheduler

      await this._jsonSchedulerService.saveSchedulers(this._schedulers)

      return myScheduler
    } else {
      throw "This scheduler doesn't exist."
    }
  }

  async deleteScheduler(schedulerId: string): Promise<void> {
    const scheduler = await this.getScheduler(schedulerId)
    if (scheduler) {
      this._schedulers = this._schedulers.filter(
        (com) => com.id !== schedulerId
      )

      await this._jsonSchedulerService.saveSchedulers(this._schedulers)
    } else {
      throw "This scheduler doesn't exist."
    }
  }
}
