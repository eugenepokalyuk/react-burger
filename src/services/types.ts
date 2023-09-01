import React, { ReactNode } from 'react';
import { ThunkMiddleware } from 'redux-thunk';
import { store } from './store';
import rootReducer from './reducers';

export type Ingredient = {
    _id: string;
    price: number;
    image: string;
    image_large: string;
    name: string;
    type: string;
    uniqueId?: string;
};

export type NutrientProperty = 'calories' | 'proteins' | 'fat' | 'carbohydrates';
export type IngredientItemProps = {
    ingredient: Ingredient;
    getIngredientCount: (ingredient: Ingredient) => number;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedIngredient: React.Dispatch<React.SetStateAction<Ingredient | null>>;
    onClick: () => void;
};
export type CurrencyIconProps = {
    className?: string;
    type: 'primary' | 'secondary';
};
export interface OrderResponse {
    success: boolean;
    order: {
        number: string;
    };
}
export interface DragHandleProps {
    id: string;
    index: number;
    children: ReactNode;
}
export interface DropTargetProps {
    id: string;
    index: number;
    itemType: string;
    onMove: (dragIndex: number, hoverIndex: number, itemType: string) => void;
    children: ReactNode;
}
export interface ConstructorIngredientsProps {
    items: Ingredient[];
}
export type renderBunType = 'top' | 'bottom' | undefined;
export interface ModalProps {
    children: React.ReactNode;
    header?: string;
    onClose: () => void;
}
export interface ModalOverlayProps {
    onClose: () => void;
}
export interface OrderDetailsProps {
    orderId: string;
}
export interface ProtectedRouteProps {
    auth?: boolean;
    children: JSX.Element // Верно ли так помечать данный пропс?
}
interface constructorIngredientsState {
    ingredients: Ingredient[];
    loading: boolean;
    error: any;
};
interface viewedIngredientState {
    viewedIngredient: Ingredient | null;
};
interface ingredientsState {
    ingredients: Ingredient[];
    loading: boolean;
    error: any;
}
interface orderState {
    orderNumber: string | null;
    loading: boolean;
    error: any;
};
export interface RootState {
    constructorIngredients: constructorIngredientsState;
    viewedIngredient: viewedIngredientState;
    // Тут непонятная ошибка для меня, поставил any
    ingredients: ingredientsState | any;
    order: orderState;
}
type StoreAction = {
    type: string;
    payload?: any;
};
export type AppThunk<ReturnType = void> = ThunkMiddleware<
    RootState,
    StoreAction,
    ReturnType
>;
export interface BurgerConstructorBun {
    image_large?: string;
    image?: string
}
export interface BurgerConstructorState {
    ingredients: Ingredient[];
    loading: boolean;
    error: any;
    bun?: BurgerConstructorBun;
}

export type TWSOrder = {
    ingredients: Array<string>;
    name: string;
    _id: string;
    status: string;
    number: number;
    createdAt: string;
    updatedAt: string;
}

export interface OrderData {
    success: boolean;
    orders: TWSOrder[];
    total: number;
    totalToday: number;
}

export interface FeedItemProps {
    order: TWSOrder;
    showStatus: boolean,
    parentURL: any,
    state: any
    // setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setIsModalOpen: any;
}

export interface IIngredient {
    _id: string
    name: string
    type: string
    proteins: number
    fat: number
    carbohydrates: number
    calories: number
    price: number
    image: string
    image_mobile: string
    image_large: string
    __v: number
}