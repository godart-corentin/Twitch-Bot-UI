export type Scheduler = {
  id?: string
  name: string
  minutes: number
  messages: Array<string>
  random?: boolean
}

export type SchedulerFile = {
  schedulers: Array<Scheduler>
}
