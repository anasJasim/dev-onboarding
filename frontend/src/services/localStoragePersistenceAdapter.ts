export class LocalStoragePersistenceAdapter {
  async set(key: string, value: string) {
    localStorage.setItem(key, value);
  }
  async get(key: string): Promise<string | null> {
    return localStorage.getItem(key);
  }
  async deleteAll() {
    localStorage.clear();
  }
}
