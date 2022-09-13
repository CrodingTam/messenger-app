import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';

// const firebaseConfig = {
//   apiKey: "AIzaSyBLujf2xf5lFiPdocH_KBACG2qxmDrXb_A",
//   authDomain: "messenger-app-7fdb7.firebaseapp.com",
//   projectId: "messenger-app-7fdb7",
//   storageBucket: "messenger-app-7fdb7.appspot.com",
//   messagingSenderId: "237528365356",
//   appId: "1:237528365356:web:9f5e718bfb6a83aeae1489",
//   measurementId: "G-Q8LXSVX09X"
// };

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const hehe = store;
console.log(hehe);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  //<React.StrictMode>
  <Provider store={store}>
       <App />
  </Provider>
  //</React.StrictMode>
);

