import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/index';

import { RootState, AppThunk } from './types';


const initialState: RootState = {
  constructorIngredients: {
    ingredients: [],
    loading: false,
    error: null,
  },
  viewedIngredient: {
    viewedIngredient: null,
  },
  ingredients: {
    ingredients: [],
    loading: false,
    error: null,
  },
  order: {
    orderNumber: null,
    loading: false,
    error: null,
  },
};

export const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(
    applyMiddleware<AppThunk>(thunkMiddleware)
  )
);

