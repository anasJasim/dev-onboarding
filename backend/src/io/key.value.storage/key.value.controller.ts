import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from "@nestjs/common";
import { KeyValueStorageService } from "src/application/key.value.storage.service";

export const KEY_VALUE_STORAGE_SERVICE = "KeyValueStorageService";

@Controller("/api/v1/key")
export class KeyValueController {
  constructor(
    @Inject(KEY_VALUE_STORAGE_SERVICE)
    private keyValueStorage: KeyValueStorageService
  ) {}

  @Get(":key")
  async get(@Param("key") key: string) {
    return (await this.keyValueStorage.get(key)) || "";
  }

  @Post(":key")
  async set(@Param("key") key: string, @Body() body: { value: unknown }) {
    const value = body.value;
    return await this.keyValueStorage.set(key, value);
  }

  @Delete("")
  async deleteAll() {
    return await this.keyValueStorage.deleteAll();
  }
}
