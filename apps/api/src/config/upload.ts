import crypto from 'crypto'
import path from 'path'

import multer, { StorageEngine } from 'multer'

import { storageConfig } from '.'

export const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp')

interface IUploadConfig {
  config: {
    // disk: {}
    aws: {
      bucket: string
    }
  }

  driver: typeof storageConfig.driver
  multer: {
    storage: StorageEngine
  }

  tmpFolder: string

  uploadsFolder: string
}

export const uploadConfig: IUploadConfig = {
  config: {
    //disk: {},
    aws: {
      bucket: storageConfig.bucket,
    },
  },

  driver: storageConfig.driver,
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex')
        const fileName = `${fileHash}-${file.originalname}`

        return callback(null, fileName)
      },
    }),
  },

  tmpFolder,

  uploadsFolder: path.resolve(tmpFolder, 'uploads'),
}
