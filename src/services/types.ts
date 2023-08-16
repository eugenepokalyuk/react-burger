import React, { ReactNode } from 'react';
import { ThunkMiddleware } from 'redux-thunk';
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
    orderId: string | null;
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