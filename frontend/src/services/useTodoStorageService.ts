import {Todo} from '@/domain/todo/todo';
import {TodoApiService} from '@/domain/todo/todoApiService';
import {TodoStorageService} from '@/domain/todo/todoStorageService';
import {useEffect, useState} from 'react';
import {Subscription} from 'rxjs';
import {WsMessage, WsServiceAdapter} from './wsServiceAdapter';

const TODOS = 'todos';

export function useTodoStorageService(todoApiService: TodoApiService, wsService: WsServiceAdapter): TodoStorageService {
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
    const wsSubscription: Subscription = wsService.getMessage().subscribe(onMessage);
    () => {
      wsSubscription.unsubscribe();
    };
  }, []);

  function onMessage(wsEvent: WsMessage) {
    switch (wsEvent.event) {
      case 'add-todo':
        {
          console.log(wsEvent.data);
          setTodos((todos) => [...todos, wsEvent.data]);
        }
        break;
      case 'delete-todo':
        {
          setTodos((todos) => todos.filter((todo) => todo.id !== wsEvent.data.id));
        }
        break;
      case 'delete-all-todos':
        {
          setTodos((todos) => []);
        }
        break;
    }
  }

  return {
    todos,
    loaded,
    async addTodo(todo: Todo) {
      return await todoApiService.addTodo(todo);
    },
    async deleteTodo(id: number) {
      await todoApiService.deleteTodo(id);
    },
  };
}
