import { combineReducers } from 'redux';
import { constructorIngredientsReducer } from './burgerConstructor';
import { ingredientDetailsReducer } from './currentIngredient';
import { ingredientsReducer } from './ingredients';
import { orderDetailsReducer } from './orderDetails';
import { ingredientCounterReducer } from './ingredientCounter';

const rootReducer = combineReducers({
  constructorIngredients: constructorIngredientsReducer,
  ingredientCounter: ingredientCounterReducer,
  viewedIngredient: ingredientDetailsReducer,
  ingredients: ingredientsReducer,
  order: orderDetailsReducer, // Объект созданного заказа
});

export default rootReducer;
