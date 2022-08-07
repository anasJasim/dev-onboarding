import {renderHook} from '@testing-library/react-hooks';
import {act} from 'react-dom/test-utils';
import idGeneratorAdapter from '../idGeneratorAdapter';
import {LocalStoragePersistenceAdapter} from '../localStoragePersistenceAdapter';
import {useIntroductionService} from '../useIntroductionService';
import {useTodoStorageService} from '../useTodoStorageService';

const persistenceService = new LocalStoragePersistenceAdapter();

// let tss: TodoStorageService;
describe('Introduction Service', () => {
  beforeEach(async () => {
    await persistenceService.deleteAll();
  });
  test('get initial todo for first time user', async () => {
    const tss = renderHook(() => useTodoStorageService(persistenceService, idGeneratorAdapter));
    await tss.waitForNextUpdate();
    const {waitForNextUpdate} = renderHook(() => useIntroductionService(persistenceService, tss.result.current));
    await waitForNextUpdate();
    expect(persistenceService.get('introduction-usage-date')).resolves.not.toBeNull();
  });

  test(`if todo exist don't add introduction todo`, async () => {
    const tss = renderHook(() => useTodoStorageService(persistenceService, idGeneratorAdapter));
    await tss.waitForNextUpdate();

    act(async () => {
      await tss.result.current.addTodo({text: 'test todo', id: ''});
    });
    const {waitForNextUpdate} = renderHook(() => useIntroductionService(persistenceService, tss.result.current));
    await waitForNextUpdate();
    expect(persistenceService.get('introduction-usage-date')).resolves.toBeNull();
  });
});
