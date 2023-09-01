import { combineReducers } from 'redux';
import { constructorIngredientsReducer } from './burgerConstructor';
import { ingredientDetailsReducer } from './viewedIngredient';
import { feedDetailsReducer } from './viewedFeedOrder';
import { ingredientsReducer } from './ingredients';
import { orderDetailsReducer } from './orderDetails';
import { authReducer } from './authReducer';
import { wsReducer } from './WSReducers';

const rootReducer = combineReducers({
  constructorIngredients: constructorIngredientsReducer,
  viewedIngredient: ingredientDetailsReducer,
  ingredients: ingredientsReducer,
  order: orderDetailsReducer,
  feedDetails: feedDetailsReducer,
  auth: authReducer,
  wsReducer: wsReducer,
});

export default rootReducer;