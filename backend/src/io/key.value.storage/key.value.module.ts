import { Module } from "@nestjs/common";
import { RedisKeyValueStorageAdapter } from "src/services/redis.key.value.storage.adapter";
import {
  KeyValueController,
  KEY_VALUE_STORAGE_SERVICE,
} from "./key.value.controller";

@Module({
  controllers: [KeyValueController],
  providers: [
    {
      provide: KEY_VALUE_STORAGE_SERVICE,
      useClass: RedisKeyValueStorageAdapter,
    },
  ],
})
export class KeyValueModule {}
