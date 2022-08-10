import {PersistenceService} from '@/application/persistenceService';
import {contentType, deleteRequest, getRequest, postRequest} from '../io/api';

export class ServerStoragePersistenceAdapter implements PersistenceService {
  private base = '/key';
  async get(key: string): Promise<string | null> {
    const value = await getRequest(`${this.base}/${key}`).then((response) => response.text())
    return value || null;
  }
  async set(key: string, value: string) {
    await postRequest(`${this.base}/${key}`, {
      headers: contentType.json,
      body: JSON.stringify({value}),
    });
  }
  async deleteAll() {
    await deleteRequest(this.base);
  }
}
