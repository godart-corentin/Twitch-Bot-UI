import { singleton } from 'tsyringe'
import fs from 'fs'

export interface IJSONService {
  parseFile<T>(filePath: string): Promise<T>
  saveFile(filePath: string, content: string): Promise<void>
}

@singleton()
export class JSONService {
  parseFile<T>(filePath: string): Promise<T> {
    return new Promise((resolve, reject) => {
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      try {
        const data: T = JSON.parse(fileContent)
        resolve(data)
      } catch (err) {
        reject('Error while parsing the JSON file.')
      }
    })
  }

  saveFile(filePath: string, content: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        fs.writeFileSync(filePath, content)
        resolve()
      } catch (err) {
        reject('Error while saving the JSON file.')
      }
    })
  }
}
