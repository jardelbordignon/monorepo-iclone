import fs from 'fs'
import path from 'path'

import aws, { S3 } from 'aws-sdk'
import mime from 'mime-types'

import { IStorageProvider } from '../i-storage-provider'

import { uploadConfig } from 'src/config/upload'

export class S3StorageProvider implements IStorageProvider {
  private s3: S3

  constructor() {
    this.s3 = new aws.S3({ region: 'us-east-1' })
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file)
    const ContentType = mime.lookup(originalPath)
    const fileContent = await fs.promises.readFile(originalPath)

    if (!ContentType) {
      throw new Error('File not found')
    }

    await this.s3
      .putObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
        ContentDisposition: `inline; filename=${file}`,
      })
      .promise()

    await fs.promises.unlink(originalPath)

    return file
  }

  public async deleteFile(file: string): Promise<void> {
    await this.s3
      .deleteObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
      })
      .promise()
  }
}
