import {LocalStoragePersistenceAdapter} from '../localStoragePersistenceAdapter';

describe('LocalStorage Persistence Adapter', () => {
  let lsp: LocalStoragePersistenceAdapter;

  beforeEach(async () => {
    if (lsp) await lsp.deleteAll();
    lsp = new LocalStoragePersistenceAdapter();
  });

  test('can save a string value associated to a key', async () => {
    await lsp.set('key', 'value');
    expect(await lsp.get('key')).toBe('value');
  });

  test('returns null for keys with no associated value', async () => {
    const result = await lsp.get('non existing key');

    expect(result).toBeNull();
  });

  test('can get back a value by its key', async () => {
    await lsp.set('key', 'value');

    const result = await lsp.get('key');
    expect(result).toBe('value');
  });

  test('can delete all values', async () => {
    await lsp.set('key', 'value');
    await lsp.set('key2', 'value2');

    await lsp.deleteAll();

    await expect(await lsp.get('key')).toBeNull();
    await expect(await lsp.get('key2')).toBeNull();
  });
});
