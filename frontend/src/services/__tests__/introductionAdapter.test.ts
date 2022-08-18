import {waitFor} from '@testing-library/react';
import {renderHook} from '@testing-library/react-hooks';
import {act} from 'react-dom/test-utils';
import {TodoApiAdapter} from '../todoApiAdapter';
import {LocalStoragePersistenceAdapter} from '../localStoragePersistenceAdapter';
import {useIntroductionService} from '../useIntroductionService';
import {useTodoStorageService} from '../useTodoStorageService';

jest.mock('../todoApiAdapter');

const persistenceService = new LocalStoragePersistenceAdapter();
const todoApiService = new TodoApiAdapter();

describe('Introduction Service', () => {
  beforeEach(async () => {
    await persistenceService.deleteAll();
    await todoApiService.deleteAll();
  });
  test('get initial todo for first time user', async () => {
    const tss = renderHook(() => useTodoStorageService(todoApiService));
    await tss.waitForNextUpdate();
    const {waitForNextUpdate} = renderHook(() => useIntroductionService(persistenceService, tss.result.current));
    await waitForNextUpdate();
    await waitFor(() => expect(persistenceService.get('introduction-usage-date')).resolves.not.toBeNull(), {
      timeout: 1000,
    });
    await expect(persistenceService.get('introduction-usage-date')).resolves.not.toBeNull();
  });

  test(`if todo exist don't add introduction todo`, async () => {
    const tss = renderHook(() => useTodoStorageService(todoApiService));
    await tss.waitForNextUpdate();
    act(async () => {
      await tss.result.current.addTodo({text: 'test todo', id: 0});
    });
    const {waitForNextUpdate} = renderHook(() => useIntroductionService(persistenceService, tss.result.current));
    await waitForNextUpdate();
    await expect(persistenceService.get('introduction-usage-date')).resolves.toBeNull();
  });
});
