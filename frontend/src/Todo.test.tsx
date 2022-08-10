import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import App from './App';
import {LocalStoragePersistenceAdapter} from './services/localStoragePersistenceAdapter';
import userEvent from '@testing-library/user-event';
import idGeneratorAdapter from './services/idGeneratorAdapter';

beforeEach(() => {
  const persistence = new LocalStoragePersistenceAdapter();
  persistence.deleteAll();
});

async function createTodo(todoText: string) {
  await screen.getByText('Add').click();
  const textbox = (await screen.getByRole('textbox')) as HTMLInputElement;
  userEvent.type(textbox, todoText);
  const submit = await screen.getByRole('submit');
  await submit.click();
}

const TODO_1 = 'test todo 1';

test('can add todo', async () => {
  render(<App persistence={new LocalStoragePersistenceAdapter()} idGen={idGeneratorAdapter} />);

  await createTodo(TODO_1);
  await screen.getByText(TODO_1);
});

test('can delete todo', async () => {
  render(<App persistence={new LocalStoragePersistenceAdapter()} idGen={idGeneratorAdapter} />);

  await createTodo(TODO_1);
  (screen.getByText(TODO_1)!.previousElementSibling as HTMLElement)!.click();
  waitFor(() => expect(screen.findByText(TODO_1)).resolves.toThrow());
});

test('get introduction todo', async () => {
  render(<App persistence={new LocalStoragePersistenceAdapter()} idGen={idGeneratorAdapter} />);

  waitFor(() => screen.getAllByRole('listitem'), {timeout: 1000});
});
