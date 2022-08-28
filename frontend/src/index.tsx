import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {idGeneratorService} from './application/idGeneratorService';
import {PersistenceService} from './application/persistenceService';
import reportWebVitals from './reportWebVitals';
import {TodoApiAdapter} from './services/todoApiAdapter';
import idGeneratorAdapter from './services/idGeneratorAdapter';
import {ServerStoragePersistenceAdapter} from './services/serverStoragePersistenceAdapter';
import {WsServiceAdapter} from './services/wsServiceAdapter';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <App
      persistence={new ServerStoragePersistenceAdapter() as PersistenceService}
      idGen={idGeneratorAdapter as idGeneratorService}
      todoApiService={new TodoApiAdapter()}
      wsService={new WsServiceAdapter()}
    />
  </React.StrictMode>,
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
