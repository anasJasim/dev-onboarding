import React, {ChangeEventHandler, FormEventHandler, MouseEventHandler, useState} from 'react';
import {idGeneratorService} from './application/idGeneratorService';
import {PersistenceService} from './application/persistenceService';
import { TodoApiService } from './domain/todo/todoApiService';
import {useIntroductionService} from './services/useIntroductionService';
import {useTodoStorageService} from './services/useTodoStorageService';

function App(props: {persistence: PersistenceService; idGen: idGeneratorService, todoApiService: TodoApiService}) {
  const tss = useTodoStorageService(props.todoApiService);
  useIntroductionService(props.persistence, tss);
  const [isAdding, setAdding] = useState(false);
  const [newTodo, setNewTodo] = useState('');

  const todoInputHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNewTodo(e.target.value);
  };
  const addClickHandler: MouseEventHandler = () => {
    if (isAdding) {
      setAdding(false);
      setNewTodo('');
    } else {
      setAdding(true);
    }
  };
  const submitHandler: FormEventHandler = (e) => {
    e.preventDefault();
    tss.addTodo({text: newTodo, id: 0});
    setAdding(false);
    setNewTodo('');
  };

  return (
    <div>
      <div style={{backgroundColor: 'lightpink', padding: '12px'}}>
        <span style={{WebkitMarginEnd: '12px'}}>Midient Todolist</span>
        <button onClick={addClickHandler}>{isAdding ? 'Cancel' : 'Add'}</button>
      </div>

      {isAdding && (
        <form onSubmit={submitHandler} style={{margin: '12px'}}>
          <input type="text" onChange={todoInputHandler} role="textbox" />
          <input type="submit" role="submit" />
        </form>
      )}

      <ol>
        {tss.todos.map((t) => (
          <li key={t.id}>
            <button style={{WebkitMarginEnd: '8px'}} onClick={() => tss.deleteTodo(t.id)}>
              X
            </button>
            <span>{t.text}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;
