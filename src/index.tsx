import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './config';
import App from './App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import rootStore from './redux/store';
import { Toaster } from 'react-hot-toast';
import { ScpSpan } from './components';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={rootStore.store}>
      <PersistGate loading={<ScpSpan />} persistor={rootStore.persistor}>
        <App />
        <Toaster position='top-center' reverseOrder={false} />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
