import { IConstructorState, RootState } from "../types/types";

export const selectConstructorIngredients = (state: {
    constructorIngredients: IConstructorState;
}) => state.constructorIngredients;