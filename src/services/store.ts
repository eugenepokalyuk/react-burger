import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/index';
import thunk from "redux-thunk";
import { socketMiddleware } from './ws';
import { wsActions, wsAuthActions } from './actions/WSActions';

const wsUrl: string = 'wss://norma.nomoreparties.space/orders';
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions), socketMiddleware(wsUrl, wsAuthActions)))
);