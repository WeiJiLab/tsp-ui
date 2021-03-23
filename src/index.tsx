import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'antd/dist/antd.min.css';
import "@ant-design/flowchart/dist/index.css";
import "./i18n/configs"
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Spin } from "antd";

import rootStore from "./redux/store";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
      <Provider store={rootStore.store}>
        <PersistGate loading={<Spin/>} persistor={rootStore.persistor}>
          <App/>
          <Toaster position='top-center' reverseOrder={false} />
        </PersistGate>
      </Provider>
    </React.StrictMode>
);
