import { Module } from "@nestjs/common";
import { InProcessKeyValueStorageAdapter } from "src/services/in.process.key.value.storage.adapter";
import {
  keyValueController,
  KEY_VALUE_STORAGE_SERVICE,
} from "./key.value.controller";

@Module({
  controllers: [keyValueController],
  providers: [
    {
      provide: KEY_VALUE_STORAGE_SERVICE,
      useClass: InProcessKeyValueStorageAdapter,
    },
  ],
})
export class KeyValueModule {}
