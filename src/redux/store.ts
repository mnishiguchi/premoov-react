import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';

import reducer from './reducers';

const logger = createLogger({
  collapsed: true,
});

export default createStore(reducer, applyMiddleware(logger));
