type StorageDriver = 'cloudinary' | 's3' | 'disk'

export const appSecret = process.env.APP_SECRET
export const appWebUrl = process.env.APP_WEB_URL
export const appApiUrl = process.env.APP_API_URL
//export const storageDriver = process.env.STORAGE_DRIVER
//export const storageBucket = process.env.STORAGE_BUCKET

export const storageConfig = {
  driver: process.env.STORAGE_DRIVER as StorageDriver,
  bucket: process.env.STORAGE_BUCKET,
  filesPath:
    process.env.STORAGE_DRIVER === 's3'
      ? `https://${process.env.STORAGE_BUCKET}.s3.amazonaws.com/`
      : `${process.env.APP_API_URL}/files/`,
}

export const redis = {
  host: process.env.REDIS_HOST,
  port: +process.env.REDIS_PORT,
  password: process.env.REDIS_PASS || undefined,
}
