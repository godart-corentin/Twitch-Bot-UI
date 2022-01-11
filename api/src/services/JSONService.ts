import { singleton } from 'tsyringe'
import fs from 'fs'
import path from 'path'

const fsPromises = fs.promises

export interface IJSONService {
  parseFile<T>(filePath: string): Promise<T>
  saveFile(filepath: string, content: string): void
}

@singleton()
export class JSONService implements IJSONService {
  parseFile<T>(filePath: string): Promise<T> {
    return new Promise((resolve, reject) => {
      try {
        const fileContent = fs.readFileSync(filePath, 'utf-8')
        const data: T = JSON.parse(fileContent)
        resolve(data)
      } catch (err) {
        reject('Error while parsing the JSON file.')
      }
    })
  }

  async saveFile(filepath: string, content: string): Promise<void> {
    try {
      fs.mkdirSync(path.dirname(filepath), { recursive: true })
      await fsPromises.writeFile(filepath, content)
    } catch (err) {
      throw 'Error while saving the JSON file.'
    }
  }
}
