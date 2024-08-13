import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

import type {store} from "../store";
import rootReducer from "../reducers/index";

type RootState = ReturnType<typeof rootReducer>;

type AppDispatch = typeof store.dispatch;

type DispatchFunc = () => AppDispatch;

type FormatDate =
    |Date
    |string;

export const useFormattedDate = (dateString?:FormatDate) => {
    const options:Intl.DateTimeFormatOptions = {
        hour: "numeric",
        minute: "numeric",
    };

    const currentDate = new Date();

    const date = dateString ? new Date(dateString) : currentDate;

    const now = new Date();

    const timeDiff = now.getTime() - date.getTime();

    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (daysDiff === 0) {
        return `Сегодня, ${date.toLocaleTimeString("ru-RU", options)}`;
    } else if (daysDiff === 1) {
        return `Вчера, ${date.toLocaleTimeString("ru-RU", options)}`;
    } else if (daysDiff >= 2 && daysDiff <= 4) {
        return `${daysDiff} дня назад, ${date.toLocaleTimeString(
            "ru-RU",
            options
        )}`;
    } else {
        return `${daysDiff} дней назад, ${date.toLocaleTimeString(
            "ru-RU",
            options
        )}`;
    }
}

export const useAppDispatch:DispatchFunc = useDispatch;

export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector;
