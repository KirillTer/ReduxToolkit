import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';
import AppRouter from './components/AppRouter'

const store = setupStore();

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

root.render(
    <Provider store={store}>
      <AppRouter />
    </Provider>
);
