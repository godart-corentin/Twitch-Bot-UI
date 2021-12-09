import { inject, singleton } from 'tsyringe'
import figlet from 'figlet'
import chalk from 'chalk'

import { IConfiguration } from '../Configuration'

export interface ILoggerService {
  Ascii(write: string): void
  Info(write: string): void
  Debug(write: string, ...args: any): void
  Warn(write: string): void
  Error(write: string): void
}

@singleton()
export class LoggerService implements ILoggerService {
  private _configuration: IConfiguration

  constructor(@inject('IConfiguration') configuration: IConfiguration) {
    this._configuration = configuration
  }

  public Ascii(write: string): void {
    const asciiText = figlet.textSync(write, { font: 'Standard' })
    console.log(chalk.bold.cyan(asciiText))
  }

  public Info(write: string): void {
    console.info(`${chalk.bold.blue('[INFO]')} ${write}`)
  }

  public Debug(write: string, ...args: any): void {
    if (this._configuration.app.debug) {
      console.debug(`[DEBUG] ${write}`, args)
    }
  }

  public Warn(write: string): void {
    console.warn(`${chalk.bold.keyword('orange')('[WARNING]')} ${write}`)
  }

  public Error(write: string): void {
    console.error(`${chalk.bold.red('[ERROR]')} ${write}`)
  }
}
