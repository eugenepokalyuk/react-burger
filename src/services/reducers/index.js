import { combineReducers } from 'redux';
import { constructorIngredientsReducer } from './burgerConstructor';
import { ingredientDetailsReducer } from './currentIngredient';
import { ingredientsReducer } from './ingredients';
import { orderDetailsReducer } from './orderDetails';

const rootReducer = combineReducers({
  constructorIngredients: constructorIngredientsReducer,
  // burgerIngredients: constructorIngredientsReducer, // Список ингредиентов в текущем конструкторе бургера
  viewedIngredient: ingredientDetailsReducer,
  ingredients: ingredientsReducer,
  order: orderDetailsReducer, // Объект созданного заказа
});

export default rootReducer;
