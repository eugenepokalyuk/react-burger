import { createStore, applyMiddleware, Store, ActionCreator, Action } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/index';
import thunk, { ThunkAction } from "redux-thunk";
import { socketMiddleware } from './ws';
import { wsActions, wsAuthActions } from './actions/WSActions';
import { RootState } from './types';

const wsUrl: string = 'wss://norma.nomoreparties.space/orders';
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions), socketMiddleware(wsUrl, wsAuthActions)))
);