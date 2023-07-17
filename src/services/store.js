import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/index';

const initialState = {
  constructorIngredients: {
    constructorIngredients: [], // Начальное значение списка ингредиентов для конструктора бургера
    loading: false,
    error: null,
  },
  viewedIngredient: {
    viewedIngredient: null, // Начальное значение просматриваемого ингредиента
  },
  ingredients: {
    ingredients: [], // Начальное значение списка всех полученных ингредиентов
    loading: false,
    error: null,
  },
  order: {
    orderNumber: null, // Начальное значение объекта созданного заказа
    loading: false,
    error: null,
  },
};

export const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);