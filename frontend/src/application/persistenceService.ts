export interface PersistenceService {
  set: (key: string, value: string) => Promise<void>;
  get: (key: string) => Promise<string | null>;
  deleteAll: () => Promise<void>;
}
