import {Todo} from './todo';

export interface TodoApiService {
  getAll: () => Promise<Todo[]>;
  get: (id: number) => Promise<Todo | null>;
  addTodo: (todo: Todo) => Promise<Todo>;
  deleteTodo: (id: number) => Promise<Todo>;
  deleteAll: () => Promise<void>;
}
