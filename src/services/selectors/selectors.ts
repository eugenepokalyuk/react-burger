import {IConstructorState} from "../types/types";

export const selectConstructorIngredients = (state:{
    constructorIngredients:IConstructorState;
}) => state.constructorIngredients;
