import {applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../services/reducers/index';

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
