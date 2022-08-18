import {Todo} from './todo';

export interface TodoStorageService {
  todos: Todo[];
  loaded: Boolean;
  addTodo: (todo: Todo) => Promise<Todo>;
  deleteTodo: (id: number) => Promise<void>;
}
