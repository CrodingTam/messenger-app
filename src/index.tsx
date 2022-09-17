import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';

//Replaces ReactDOM.render when the .render method is called and enables Concurrent Mode.
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  //** Provide the single redux store in our application*/
  <Provider store={store}>
       <App />
  </Provider>
);

