import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import authReducer from 'features/Auth/services/authSlice';
import cartReducer from 'features/Cart/services/cartSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';


const sagaMiddleware = createSagaMiddleware();
const cartPersistConfig = {
  key: 'cart',
  storage,
  blacklist: ['cartNotification'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  cart: persistReducer(cartPersistConfig, cartReducer),
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['cart'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
