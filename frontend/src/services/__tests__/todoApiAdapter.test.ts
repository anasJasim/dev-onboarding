import {TodoApiService} from '@/domain/todo/todoApiService';
import {TodoApiAdapter} from '../todoApiAdapter';

describe('Todo Api Adapter', () => {
  let todoApiService: TodoApiService = new TodoApiAdapter();
  test('can add todo', async () => {
    const todo = await todoApiService.addTodo({id: 0, text: 'mytodo'});
    await expect(todoApiService.get(todo.id)).resolves.toMatchObject({text: 'mytodo'});
  });
  test('can delete todo', async () => {
    const todo = await todoApiService.addTodo({id: 0, text: 'mytodo'});

    await todoApiService.deleteTodo(todo.id);

    await expect(todoApiService.get(todo.id)).resolves.toBe(null);
  });
  test('can get all todos', async () => {
    const todo1 = await todoApiService.addTodo({id: 0, text: 'mytodo1'});
    const todo2 = await todoApiService.addTodo({id: 0, text: 'mytodo2'});

    const todos = await todoApiService.getAll();

    expect(todos.find((todo) => todo.id === todo1.id)).toMatchObject({text: 'mytodo1'});
    expect(todos.find((todo) => todo.id === todo2.id)).toMatchObject({text: 'mytodo2'});
  });
});
