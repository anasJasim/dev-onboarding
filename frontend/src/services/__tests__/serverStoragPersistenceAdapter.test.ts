import { ServerStoragePersistenceAdapter } from "../serverStoragePersistenceAdapter";

describe('Server Persistence Adapter', () => {
  let ssp: ServerStoragePersistenceAdapter;

  beforeEach(async () => {
    if (ssp) await ssp.deleteAll();
    ssp = new ServerStoragePersistenceAdapter();
  });

  test('can save a string value associated to a key', async () => {
    await ssp.set('key', 'value');
    expect(await ssp.get('key')).toBe('value');
  });

  test('returns null for keys with no associated value', async () => {
    const result = await ssp.get('non existing key');

    expect(result).toBeNull();
  });

  test('can get back a value by its key', async () => {
    await ssp.set('key', 'value');

    const result = await ssp.get('key');
    expect(result).toBe('value');
  });

  test('can delete all values', async () => {
    await ssp.set('key', 'value');
    await ssp.set('key2', 'value2');

    await ssp.deleteAll();

    await expect(await ssp.get('key')).toBeNull();
    await expect(await ssp.get('key2')).toBeNull();
  });
});
