// import Redis, { Redis as RedisProps } from 'ioredis'

// import { ICacheProvider } from '../i-cache-provider'

// export default class RedisCacheProvider implements ICacheProvider {
//   private redis: RedisProps

//   constructor() {
//     this.redis = new Redis(cacheConfig.redis)
//   }

//   public async set(key: string, value: any): Promise<void> {
//     await this.redis.set(key, JSON.stringify(value))
//   }

//   public async get<T>(key: string): Promise<T | null> {
//     const data = await this.redis.get(key)

//     if (!data) return null

//     const parseData = JSON.parse(data) as T

//     return parseData
//   }

//   public async remove(key: string): Promise<void> {
//     await this.redis.del(key)
//   }

//   public async removePrefix(prefix: string): Promise<void> {
//     const keys = await this.redis.keys(`${prefix}:*`)

//     const pipeline = this.redis.pipeline()

//     keys.forEach(key => pipeline.del(key))

//     await pipeline.exec()
//   }
// }
