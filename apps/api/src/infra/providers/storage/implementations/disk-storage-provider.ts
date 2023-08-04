import fs from 'fs'
import path from 'path'

import { IStorageProvider } from '../i-storage-provider'

import { uploadConfig } from 'src/config/upload'

export class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadsFolder, file)
    )
    return file
  }

  public async deleteFile(file: string): Promise<void> {
    const tmpFilePath = path.resolve(uploadConfig.tmpFolder, file)
    const oldFilePath = path.resolve(uploadConfig.uploadsFolder, file)

    if (fs.existsSync(tmpFilePath)) await fs.promises.unlink(tmpFilePath)
    if (fs.existsSync(oldFilePath)) await fs.promises.unlink(oldFilePath)
  }
}
