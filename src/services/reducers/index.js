import { combineReducers } from 'redux';
import { constructorIngredientsReducer } from './burgerConstructor';
import { ingredientDetailsReducer } from './currentIngredient';
import { ingredientsReducer } from './ingredients';
import { orderDetailsReducer } from './orderDetails';
// import { ingredientCounterReducer } from './ingredientCounter';
import { authReducer } from './authReducer';

const rootReducer = combineReducers({
  constructorIngredients: constructorIngredientsReducer,
  viewedIngredient: ingredientDetailsReducer,
  ingredients: ingredientsReducer,
  order: orderDetailsReducer,
  auth: authReducer,
});

export default rootReducer;
