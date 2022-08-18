import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';
import {LocalStoragePersistenceAdapter} from './services/localStoragePersistenceAdapter';
import { TodoApiAdapter } from './services/todoApiAdapter';

test('renders learn react link', () => {
  render(<App persistence={new LocalStoragePersistenceAdapter()} idGen={() => 'id'} todoApiService={new TodoApiAdapter()} />);

  const linkElement = screen.getByText(/Midient/i);

  expect(linkElement).toBeInTheDocument();
});
