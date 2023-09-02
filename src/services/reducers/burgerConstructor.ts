import {
  FETCH_CONSTRUCTOR_INGREDIENTS_REQUEST,
  FETCH_CONSTRUCTOR_INGREDIENTS_SUCCESS,
  FETCH_CONSTRUCTOR_INGREDIENTS_ERROR,
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  MOVE_INGREDIENT_IN_CONSTRUCTOR,
  SET_BUN,
  CLEAR_INGREDIENTS_IN_CONSTRUCTOR
} from '../actions/burgerConstructor';
import { ActionTypes } from '../types/burgerConstructor/ActionTypes';
import { IConstructorState } from '../types/types'

const initialState: IConstructorState = {
  ingredients: [],
  loading: false,
  error: null,
};

export const constructorIngredientsReducer = (
  state: IConstructorState = initialState,
  action: ActionTypes
): IConstructorState => {
  switch (action.type) {
    case FETCH_CONSTRUCTOR_INGREDIENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_CONSTRUCTOR_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredients: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_CONSTRUCTOR_INGREDIENTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_INGREDIENT_TO_CONSTRUCTOR:
      return action.payload.type === 'bun'
        ? { ...state, bun: action.payload }
        : { ...state, ingredients: [...state.ingredients, action.payload] };
    case REMOVE_INGREDIENT_FROM_CONSTRUCTOR:
      const index = state.ingredients.findIndex(
        (item) => item._id === action.key
      );
      if (index !== -1) {
        const updatedIngredients = [...state.ingredients];
        updatedIngredients.splice(index, 1);
        return {
          ...state,
          ingredients: updatedIngredients,
        };
      }
      return state;
    case MOVE_INGREDIENT_IN_CONSTRUCTOR:
      const { dragIndex, hoverIndex } = action.payload;
      const updatedIngredientsMove = [...state.ingredients];
      const draggedItem = updatedIngredientsMove[dragIndex];

      updatedIngredientsMove.splice(dragIndex, 1);
      updatedIngredientsMove.splice(hoverIndex, 0, draggedItem);

      return {
        ...state,
        ingredients: updatedIngredientsMove,
      };
    case SET_BUN:
      return {
        ...state,
        bun: {
          ...action.payload,
          image: action.payload.image_large,
        },
      };
    case CLEAR_INGREDIENTS_IN_CONSTRUCTOR:
      return {
        ...state,
        ingredients: [],
      };
    default:
      return state;
  }
};