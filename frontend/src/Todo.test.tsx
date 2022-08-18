import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import App from './App';
import {LocalStoragePersistenceAdapter} from './services/localStoragePersistenceAdapter';
import userEvent from '@testing-library/user-event';
import idGeneratorAdapter from './services/idGeneratorAdapter';
import {TodoApiAdapter} from './services/todoApiAdapter';

jest.mock('./services/todoApiAdapter');

async function createTodo(todoText: string) {
  await screen.getByText('Add').click();
  const textbox = (await screen.getByRole('textbox')) as HTMLInputElement;
  userEvent.type(textbox, todoText);
  const submit = await screen.getByRole('submit');
  await submit.click();
}

const TODO_1 = 'test todo 1';

test('can add todo', async () => {
  render(
    <App
      persistence={new LocalStoragePersistenceAdapter()}
      idGen={idGeneratorAdapter}
      todoApiService={new TodoApiAdapter()}
    />,
  );

  await createTodo(TODO_1);
  expect(screen.findByText(TODO_1));
});

test('can delete todo', async () => {
  render(
    <App
      persistence={new LocalStoragePersistenceAdapter()}
      idGen={idGeneratorAdapter}
      todoApiService={new TodoApiAdapter()}
    />,
  );

  await createTodo(TODO_1);
  (screen.getByText(TODO_1)!.previousElementSibling as HTMLElement)!.click();
  expect(screen.findByText(TODO_1)).resolves.not.toBeNull();
});

test('get introduction todo', async () => {
  const persistence = new LocalStoragePersistenceAdapter()
  await persistence.deleteAll()
  render(
    <App
      persistence={new LocalStoragePersistenceAdapter()}
      idGen={idGeneratorAdapter}
      todoApiService={new TodoApiAdapter()}
    />,
  );

  await waitFor(() => screen.getAllByRole('listitem'), {timeout: 1000});
});
