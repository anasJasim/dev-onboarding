import {Todo} from '@/domain/todo/todo';
import {TodoApiService} from '@/domain/todo/todoApiService';
import {TodoStorageService} from '@/domain/todo/todoStorageService';
import {useEffect, useState} from 'react';

const TODOS = 'todos';
export function useTodoStorageService(todoApiService: TodoApiService): TodoStorageService {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loaded, setLoaded] = useState<Boolean>(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const _todos = (await todoApiService.getAll()) || [];
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
      const newTodo = await todoApiService.addTodo(todo);
      const newTodos = [...todos, newTodo];
      setTodos(() => newTodos);
      return newTodo
    },
    async deleteTodo(id: number) {
      await todoApiService.deleteTodo(id);
      const newTodos = todos.filter((todo) => todo.id !== id);
      setTodos((todos) => newTodos);
    },
  };
}
