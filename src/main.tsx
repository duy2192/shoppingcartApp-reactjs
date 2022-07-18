import { persistor, store } from 'app/store';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { GlobalLoading,RouterLoading } from 'components/Loading';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<GlobalLoading />} persistor={persistor}>
        <BrowserRouter>
          <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <GlobalLoading loading={false}/>
            <RouterLoading >
            <App />
            </RouterLoading>
          </SnackbarProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
