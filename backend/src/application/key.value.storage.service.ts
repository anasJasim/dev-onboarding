export interface KeyValueStorageService {
  get(key: string): Promise<string | null>;
  set(key: string, value: unknown): Promise<void>;
  deleteAll(): Promise<void>;
}
