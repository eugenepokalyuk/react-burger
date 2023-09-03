import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import { ThunkMiddleware } from 'redux-thunk';

export type NutrientProperty = 'calories' | 'proteins' | 'fat' | 'carbohydrates';
export type IngredientItemProps = {
    ingredient: IIngredient;
    getIngredientCount: (ingredient: IIngredient) => number;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedIngredient: React.Dispatch<React.SetStateAction<IIngredient | null>>;
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
    items: IIngredient[];
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
    ingredients: IIngredient[];
    loading: boolean;
    error: null | unknown;
};
export interface IViewedIngredientState {
    viewedIngredient: IIngredient | null;
};
export interface IIngredientsState {
    ingredients: IIngredient[];
    loading: boolean;
    error: null | unknown;
}
export interface IOrderState {
    orderNumber: string | null;
    loading: boolean;
    error: null | unknown;
};

export type TUser = {
    email: string,
    name: string
}

export interface IAuthState {
    // auth: {
    user: TUser | null,
    // }
    error: null | unknown,
}

type StoreAction = {
    type: string;
    payload?: string;
};
export type AppThunk<ReturnType = void> = ThunkMiddleware<
    RootState,
    StoreAction,
    ReturnType
>;
export interface BurgerConstructorBun {
    price: number;
    name: string;
    _id: string;
    image_large?: string;
    image?: string
}
export interface IConstructorState {
    ingredients: IIngredient[];
    loading: boolean;
    error: null | unknown;
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
    parentURL: { pathname: string },
    state: any,
    setIsModalOpen: Dispatch<SetStateAction<boolean>> | boolean | undefined;
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
    uniqueId?: string;
}

export interface RootState {
    constructorIngredients: constructorIngredientsState;
    viewedIngredient: IViewedIngredientState;
    ingredients: IIngredientsState;
    order: IOrderState;
    auth: IAuthState,

    feedDetails: IViewedFeedOrderState,
    wsReducer: TOrdersState,
}
export type TOrdersState = {
    wsConnected: boolean;
    wsError?: Event;
    wsAuthConnected: boolean;
    wsAuthError?: Event;
    orders: Array<TWSOrder>;
    userOrders: Array<TWSOrder>;
    total: number;
    totalToday: number;
}
export interface IViewedFeedOrderState {
    viewedFeedOrder: TWSOrder | null;
}