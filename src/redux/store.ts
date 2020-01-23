import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const logger = createLogger({
  collapsed: true,
});

// https://github.com/rt2zz/redux-persist
const persistedReducer = persistReducer(
  {
    key: 'root',
    storage,
  },
  rootReducer
);

export const store = createStore(persistedReducer, applyMiddleware(logger, thunk));
export const persistor = persistStore(store);
