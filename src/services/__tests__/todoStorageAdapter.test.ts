import {renderHook} from '@testing-library/react-hooks';
import {act} from 'react-dom/test-utils';
import {idGeneratorService} from '../../application/idGeneratorService';
import {LocalStoragePersistenceAdapter} from '../localStoragePersistenceAdapter';
import {useTodoStorageService} from '../useTodoStorageService';

const persistence = new LocalStoragePersistenceAdapter();
let idGen: idGeneratorService;

describe('Todo Storage Adapter', () => {
  beforeEach(async () => {
    idGen = jest.fn().mockReturnValue('mock-id');
    await persistence.deleteAll();
  });

  test('loads todos from persistence into local state upon initializating', async () => {
    const todos = [
      {id: '1', text: 'todo1'},
      {id: '2', text: 'todo2'},
    ];
    await persistence.set('todos', JSON.stringify(todos));

    const {result, waitForNextUpdate} = renderHook(() => useTodoStorageService(persistence, idGen));
    await waitForNextUpdate();
    expect(result.current.todos).toStrictEqual(todos);
  });

  test('provide todos in local state', async () => {
    const {result, waitForNextUpdate} = renderHook(() => useTodoStorageService(persistence, idGen));
    await waitForNextUpdate();

    expect(result.current.todos).toStrictEqual([]);
  });

  test('creates todo with automatically added ids and persistence', async () => {
    const {result, waitForNextUpdate} = renderHook(() => useTodoStorageService(persistence, idGen));
    await waitForNextUpdate();

    act(async () => {
      await result.current.addTodo({id: '', text: 'sample todo'});
    });

    expect(result.current.todos).toStrictEqual([{id: 'mock-id', text: 'sample todo'}]);
    await expect(persistence.get('todos')).resolves.toBe(JSON.stringify([{id: 'mock-id', text: 'sample todo'}]));
  });

  test('deletes todos by id', async () => {
    const {result, waitForNextUpdate} = renderHook(() => useTodoStorageService(persistence, idGen));
    await waitForNextUpdate();
    act(async () => {
      await result.current.addTodo({text: 'sample todo', id: ''});
    });

    act(async () => {
      await result.current.deleteTodo('mock-id');
    });

    expect(result.current.todos).toStrictEqual([]);
    await expect(persistence.get('todos')).resolves.toBe(JSON.stringify([]));
  });
});
