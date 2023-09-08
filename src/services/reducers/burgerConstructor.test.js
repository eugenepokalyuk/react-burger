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
import { constructorIngredientsReducer } from './burgerConstructor'

const initialState = {
  ingredients: [],
  loading: false,
  error: null,
};

let ingredientArray = [{
  _id: '643d69a5c3f7b9001cfa0943',
  name: 'Соус фирменный Space Sauce',
  type: 'sauce',
  proteins: 50,
  fat: 22,
  carbohydrates: 11,
  calories: 14,
  price: 80,
  image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
  __v: 0
}, {
  _id: '643d69a5c3f7b9001cfa0943',
  name: 'Соус фирменный Space Sauce',
  type: 'sauce',
  proteins: 50,
  fat: 22,
  carbohydrates: 11,
  calories: 14,
  price: 80,
  image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
  __v: 0
}];

describe("viewed ingredients reducer test 👇", () => {
  it("should handle REFRESH_TOKEN_SUCCESS", () => {
    const action = { type: FETCH_CONSTRUCTOR_INGREDIENTS_REQUEST };
    const state = constructorIngredientsReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      loading: true,
    });
    expect(state.loading).toBe(true);
  });
  it("should handle FETCH_CONSTRUCTOR_INGREDIENTS_SUCCESS", () => {
    const action = { type: FETCH_CONSTRUCTOR_INGREDIENTS_SUCCESS, payload: ingredientArray };
    const state = constructorIngredientsReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      ingredients: action.payload
    });
  });
  it("should handle FETCH_CONSTRUCTOR_INGREDIENTS_ERROR", () => {
    const error = new Error("Test error message");
    const action = { type: FETCH_CONSTRUCTOR_INGREDIENTS_ERROR, payload: error.message };
    const state = constructorIngredientsReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      error: action.payload,
    });
  });
  it('should handle ADD_INGREDIENT_TO_CONSTRUCTOR for bun', () => {
    const initialState = {
      bun: null,
      ingredients: [],
    };

    const bunIngredient = { type: 'bun', name: 'bun' }; // Замените на фактический ингредиент-булку
    const action = { type: ADD_INGREDIENT_TO_CONSTRUCTOR, payload: bunIngredient };
    const state = constructorIngredientsReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      bun: bunIngredient,
    });
  });
  it('should handle ADD_INGREDIENT_TO_CONSTRUCTOR for non-bun ingredient', () => {
    const initialState = {
      bun: null,
      ingredients: [],
    };

    const nonBunIngredient = { type: 'ingredient', name: 'main' }; // Замените на фактический ингредиент
    const action = { type: ADD_INGREDIENT_TO_CONSTRUCTOR, payload: nonBunIngredient };
    const state = constructorIngredientsReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      ingredients: [...initialState.ingredients, nonBunIngredient],
    });
  });
  it('should handle REMOVE_INGREDIENT_FROM_CONSTRUCTOR when it exists', () => {
    const initialState = { ingredients: [{ _id: 1 }, { _id: 2 }, { _id: 3 }] }; // Пример начального состояния
    const action = {
      type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
      key: 2,
    };
    const state = constructorIngredientsReducer(initialState, action);
    expect(state.ingredients).toEqual([{ _id: 1 }, { _id: 3 }]);
  });
  it('should not handle REMOVE_INGREDIENT_FROM_CONSTRUCTOR when it does not exist', () => {
    const initialState = { ingredients: [{ _id: 1 }, { _id: 3 }] }; // Пример начального состояния
    const action = {
      type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
      key: 2,
    };
    const state = constructorIngredientsReducer(initialState, action);
    expect(state.ingredients).toEqual(initialState.ingredients);
  });
  it("should handle MOVE_INGREDIENT_IN_CONSTRUCTOR", () => {
    const dragIndex = 0;
    const hoverIndex = 1;
    const action = { type: MOVE_INGREDIENT_IN_CONSTRUCTOR, payload: { dragIndex, hoverIndex } };
    const state = constructorIngredientsReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      // ?
      ingredients: [undefined]
    });
  });
  it("should handle CLEAR_INGREDIENTS_IN_CONSTRUCTOR", () => {
    const action = { type: CLEAR_INGREDIENTS_IN_CONSTRUCTOR };
    const state = constructorIngredientsReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      ingredients: [],
    });
  });
  it('should handle SET_BUN action is dispatched', () => {
    const initialState = { bun: null }; // Пример начального состояния
    const bunPayload = {
      name: 'Bun Name',
      image_large: 'bun_large_image.jpg',
    };
    const action = {
      type: SET_BUN,
      payload: bunPayload,
    };
    const state = constructorIngredientsReducer(initialState, action);
    expect(state.bun).toEqual({
      ...bunPayload,
      image: bunPayload.image_large,
    });
  });
  it("should return the initial state for unknown action", () => {
    const action = { type: "UNKNOWN_ACTION" };
    const state = constructorIngredientsReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
    });
  });
});