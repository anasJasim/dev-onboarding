import {Todo} from '@/domain/todo/todo';
import {TodoApiService} from '@/domain/todo/todoApiService';
import {contentType, deleteRequest, getRequest, postRequest} from '../io/api';

export class TodoApiAdapter implements TodoApiService {
  private readonly base = '/todo';
  async getAll(): Promise<Todo[]> {
    return await getRequest(`${this.base}`)
      .then((response) => response.json())
      .then((json) => json.todos);
  }
  async get(id: number): Promise<Todo | null> {
    return await getRequest(`${this.base}/${id}`)
      .then((response) => response.json())
      .then((json) => json.todo || null);
  }
  async addTodo(todo: Todo): Promise<Todo> {
    return await postRequest(`${this.base}`, {headers: contentType.json, body: JSON.stringify({todo})})
      .then((response) => response.json())
      .then((json) => json.todo);
  }
  async deleteTodo(id: number): Promise<Todo> {
    return await deleteRequest(`${this.base}/${id}`)
      .then((response) => response.json())
      .then((json) => json.todo);
  }
  async deleteAll(): Promise<void> {
    await deleteRequest(this.base);
  }
}
