import {idGeneratorService} from '@/application/idGeneratorService';
import {PersistenceService} from '@/application/persistenceService';
import {Todo} from '@/domain/todo/todo';
import {TodoStorageService} from '@/domain/todo/todoStorageService';
import {useEffect, useState} from 'react';

const TODOS = 'todos';
export function useTodoStorageService(persistence: PersistenceService, idGen: idGeneratorService): TodoStorageService {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loaded, setLoaded] = useState<Boolean>(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const _todos = JSON.parse((await persistence.get(TODOS)) || '[]');
        setTodos(() => _todos);
      } finally {
        setLoaded(true);
      }
    };
    fetchTodos();
  }, []);

  return {
    todos,
    loaded,
    async addTodo(todo: Todo) {
      const newTodo: any = {...todo};
      if (!newTodo.id) {
        newTodo.id = idGen();
      }
      const newTodos = [...todos, newTodo];
      setTodos(() => newTodos);
      await persistence.set(TODOS, JSON.stringify(newTodos));
    },
    async deleteTodo(id: string) {
      const newTodos = todos.filter((todo) => todo.id !== id);
      setTodos((todos) => newTodos);
      await persistence.set(TODOS, JSON.stringify(newTodos));
    },
  };
}
