import {Todo} from './todo';

export interface TodoStorageService {
  todos: Todo[];
  loaded: Boolean;
  addTodo: (todo: Todo) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
}
