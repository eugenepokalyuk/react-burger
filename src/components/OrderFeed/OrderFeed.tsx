import { FC, RefObject, useEffect, useRef, useState } from 'react';
import styles from './OrderFeed.module.css';
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../services/hooks/hooks';
import OrderFeedItem from '../OrderFeedItem/OrderFeedItem';
import OrderFeedStat from '../OrderFeedStat/OrderFeedStat';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from '../../services/actions/WSActions';
import { OrderNotFound } from '../OrderNotFound/OrderNotFound';
import { useMediaQuery } from 'react-responsive';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

export const OrderFeed: FC = () => {
    const dispatch = useAppDispatch();
    const [, setIsModalOpen] = useState<boolean>(false);
    const orders = useAppSelector(store => store.wsReducer.orders)
    const location = useLocation();
    const [loading, isLoading] = useState<boolean>(Boolean);
    const [activeTab, setActiveTab] = useState<string>("Заказы");

    const orderRef = useRef<HTMLHeadingElement>(null);
    const statRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        dispatch({ type: WS_CONNECTION_START, payload: '/all' });
        isLoading(true);
        return () => { dispatch({ type: WS_CONNECTION_CLOSED }); }
    }, [dispatch]);

    const isDesktop = useMediaQuery({ minWidth: 961 });
    const isTablet = useMediaQuery({ minWidth: 376, maxWidth: 960 });
    const isMobile = useMediaQuery({ maxWidth: 375 });

    const handleTabClick = (
        value: string,
        ref: RefObject<HTMLHeadingElement>
    ) => {
        setActiveTab(value);
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <section className={styles.container}>
            {isDesktop && (
                <>
                    <h1 className='text text_type_main-large mb-5 mt-10'>Лента заказов</h1>
                    <div className={styles.wrapper}>

                        <div className={`${styles.w100} ${styles.scrollable}`}>
                            {loading
                                ? orders.map((order) => (
                                    <OrderFeedItem
                                        key={uuidv4()}
                                        order={order}
                                        showStatus={false}
                                        parentURL={location}
                                        state={{ background: location }}
                                        setIsModalOpen={setIsModalOpen}
                                    />
                                ))
                                : <OrderNotFound />}
                        </div>

                        <div className={styles.w100}>
                            {loading
                                ? <OrderFeedStat />
                                : <OrderFeedStat isEmpty />
                            }
                        </div>

                    </div>
                </>
            )}

            {isMobile || isTablet && (
                <>
                    <div>
                        <h1 className={`${styles.textCenter} text text_type_main-large mb-5 mt-10`}>Лента заказов</h1>
                        <div className={styles.wrapper}>
                            <div className={styles.container_flex}>
                                <Tab
                                    value="Заказы"
                                    active={activeTab === "Заказы"}
                                    onClick={() => handleTabClick("Заказы", orderRef)}
                                    data-tab="Заказы"
                                >
                                    Заказы
                                </Tab>
                                <Tab
                                    value="Статистика"
                                    active={activeTab === "Статистика"}
                                    onClick={() => handleTabClick("Статистика", statRef)}
                                    data-tab="Статистика"
                                >
                                    Статистика
                                </Tab>
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.w100} ${styles.scrollable}`} ref={orderRef} data-tab="Заказы">
                        {loading
                            ? orders.map((order) => (
                                <OrderFeedItem
                                    key={uuidv4()}
                                    order={order}
                                    showStatus={false}
                                    parentURL={location}
                                    state={{ background: location }}
                                    setIsModalOpen={setIsModalOpen}
                                />
                            ))
                            : <OrderNotFound />}
                    </div>

                    <div className={`${styles.w100} mt-10`} ref={statRef} data-tab="Статистика">
                        {loading
                            ? <OrderFeedStat />
                            : <OrderFeedStat isEmpty />
                        }
                    </div>
                </>
            )}
        </section>
    );
}