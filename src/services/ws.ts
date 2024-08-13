import type {Middleware, MiddlewareAPI} from 'redux';
import {Dispatch} from "redux";

import {IWSActions, TWSActions, TWSAuthActions} from "./actions/WSActions";
import {AppThunk} from './types/types';

export const socketMiddleware = (wsUrl:string, wsActions:IWSActions):Middleware => {
    return (store:MiddlewareAPI<Dispatch, AppThunk>) => {
        let socket:WebSocket|null = null;

        let isConnectionOpen = false;

        return next => (action:TWSActions|TWSAuthActions) => {
            const { dispatch } = store;

            const { type, payload } = action;

            const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

            if (type === wsInit) {
                socket = new WebSocket(`${wsUrl}${payload}`);
                isConnectionOpen = true;
            }

            if (socket) {
                socket.onopen = event => {
                    dispatch({ type: onOpen, payload: event });
                };

                socket.onerror = event => {
                    dispatch({ type: onError, payload: event });
                };

                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    const { success, ...restParsedData } = parsedData;
                    dispatch({ type: onMessage, payload: restParsedData });
                };

                socket.onclose = event => {
                    if (isConnectionOpen) {
                        dispatch({ type: onClose, payload: event });
                    } else {
                        return;
                    }
                };

                if (type === onClose) {
                    isConnectionOpen = false;
                    socket.close();
                }
            }

            next(action);
        };
    };
};
