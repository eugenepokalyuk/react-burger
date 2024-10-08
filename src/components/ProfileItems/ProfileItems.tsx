import {useEffect} from "react";
import {useLocation} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../services/hooks/hooks";
import styles from "./ProfileItems.module.css";
import {WS_AUTH_CONNECTION_CLOSED, WS_AUTH_CONNECTION_START} from "../../services/actions/WSActions";
import OrderFeedItem from "../OrderFeedItem/OrderFeedItem";
import {OrderNotFound} from "../OrderNotFound/OrderNotFound";

export const ProfileItems = () => {
    const dispatch = useAppDispatch();

    const { userOrders } = useAppSelector((store) => store.wsReducer);

    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        const cleanedToken = token?.replace("Bearer ", "");

        dispatch({
            type: WS_AUTH_CONNECTION_START,
            payload: `?token=${cleanedToken}`,
        });

        return () => {
            dispatch({
                type: WS_AUTH_CONNECTION_CLOSED,
            });
        };

    }, [dispatch]);

    return (
        <div className={`${styles.content} ${styles.contentHeight}`}>
            <div className={`${styles.w100} ${styles.scrollable} mt-15`}>
                {userOrders
                    ? userOrders.map((order, index:number) => (
                        <OrderFeedItem
                            key={index}
                            order={order}
                            showStatus={true}
                            parentURL={location}
                            state={undefined}
                            setIsModalOpen={undefined}
                        />
                    )) : (
                        <div className={`${styles.errorContainer}`}>
                            <OrderNotFound/>
                        </div>
                    )
                }
            </div>
        </div>
    );
};
