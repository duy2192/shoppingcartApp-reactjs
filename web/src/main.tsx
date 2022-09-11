import { persistor, store } from 'app/store';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import './index.css';
import { RouterWrapper } from 'components/Router';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <ToastContainer autoClose={2000} />
          <RouterWrapper>
            <App />
          </RouterWrapper>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
