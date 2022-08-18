import {Todo} from '@/domain/todo/todo';
import {renderHook} from '@testing-library/react-hooks';
import {TodoApiAdapter} from '../todoApiAdapter';
import {useTodoStorageService} from '../useTodoStorageService';

const todoApiService = new TodoApiAdapter();

describe('Todo Storage Adapter', () => {
  test('loads todos from persistence into local state upon initializating', async () => {
    const todo1 = await todoApiService.addTodo({id: 0, text: 'mytodo1'});
    const todo2 = await todoApiService.addTodo({id: 0, text: 'mytodo2'});

    const {result, waitForNextUpdate} = renderHook(() => useTodoStorageService(todoApiService));
    await waitForNextUpdate();
    await expect(result.current.todos.find((todo) => todo.id === todo1.id)).toMatchObject({text: 'mytodo1'});
    await expect(result.current.todos.find((todo) => todo.id === todo2.id)).toMatchObject({text: 'mytodo2'});
  });

  test('can add todo', async () => {
    const {result, waitForNextUpdate} = renderHook(() => useTodoStorageService(todoApiService));
    await waitForNextUpdate();

    let todo: Todo;
    todo = await result.current.addTodo({id: 0, text: 'sample todo'});

    expect(result.current.todos.find((_todo) => _todo.id === todo.id)).toMatchObject({text: 'sample todo'});
  });

  test('delete todo by id', async () => {
    const {result, waitForNextUpdate} = renderHook(() => useTodoStorageService(todoApiService));
    await waitForNextUpdate();

    let todo: Todo;
    todo = await result.current.addTodo({id: 0, text: 'sample todo'});

    await result.current.deleteTodo(todo.id)

    expect(result.current.todos.find((_todo) => _todo.id === todo.id)).toBeUndefined();
  });
});
