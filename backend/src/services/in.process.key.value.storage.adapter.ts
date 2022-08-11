import { KeyValueStorageService } from "src/application/key.value.storage.service";
export class InProcessKeyValueStorageAdapter implements KeyValueStorageService {
  storage: Map<string, any>;
  constructor() {
    this.storage = new Map();
  }
  async get(key: string): Promise<string | null> {
    return await (this.storage.get(key) || null);
  }
  async set(key: string, value: unknown): Promise<void> {
    await this.storage.set(key, value);
  }
  async deleteAll(): Promise<void> {
    this.storage = new Map();
  }
}
