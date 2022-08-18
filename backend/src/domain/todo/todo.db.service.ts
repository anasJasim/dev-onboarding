import { Todo } from "@prisma/client";
export { Todo };
export const TODO_DB_SERVICE = "TODO_DB_SERVICE";
export interface TodoDbService {
  add: (todo: Todo) => Promise<Todo>;
  get: (id: number) => Promise<Todo | null>;
  getAll: () => Promise<Todo[]>;
  delete: (id: number) => Promise<Todo>;
  deleteAll: () => Promise<void>;
}
