import { OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import Redis, { RedisOptions } from "ioredis";
import { KeyValueStorageService } from "src/application/key.value.storage.service";

export class RedisKeyValueStorageAdapter
  implements KeyValueStorageService, OnModuleDestroy
{
  readonly options: RedisOptions = {
    host: process.env.REDIS_DB_HOST || "redis",
    port: Number(process.env.REDIS_DB_PORT) || 6379,
  };
  redis: Redis = new Redis(this.options);
  constructor() {}
  async onModuleDestroy() {
    this.redis.disconnect();
  }
  async get(key: string): Promise<string | null> {
    return await this.redis.get(key);
  }
  async set(key: string, value: unknown): Promise<void> {
    let _value;
    switch (typeof value) {
      case "string":
      case "number":
        {
          _value = value;
        }
        break;
      default: {
        _value = JSON.stringify(value);
      }
    }
    await this.redis.set(key, _value);
  }
  async deleteAll(): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      const stream = this.redis.scanStream({ match: "" });
      stream.on("data", (keys) => {
        if (keys.length) {
          const pipeline = this.redis.pipeline();
          for (let i = 0; i < keys.length; i++) {
            this.redis.del(keys[i]);
          }
          pipeline.exec();
        }
      });
      stream.on("end", () => {
        resolve();
      });
      stream.on("error", (err) => {
        reject(err);
      });
    });
  }
}
