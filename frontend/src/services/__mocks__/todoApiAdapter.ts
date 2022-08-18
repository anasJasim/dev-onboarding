import {Todo} from '@/domain/todo/todo';
import {TodoApiService} from '@/domain/todo/todoApiService';
import {getRandomInt} from '../idGeneratorAdapter';

export class TodoApiAdapter implements TodoApiService {
  todos: Todo[] = [];
  async getAll(): Promise<Todo[]> {
    return this.todos;
  }
  async get(id: number): Promise<Todo | null> {
    return this.todos.find((todo) => todo.id === id) || null;
  }
  async addTodo(todo: Todo): Promise<Todo> {
    todo = {...todo, id: getRandomInt()};
    this.todos.push(todo);
    return todo;
  }
  async deleteTodo(id: number): Promise<Todo> {
    const index = this.todos.findIndex((todo) => todo.id === id);
    const todo = this.todos[index];
    this.todos.splice(index, 1);
    return todo;
  }
  async deleteAll(): Promise<void> {
    this.todos = [];
  }
}
