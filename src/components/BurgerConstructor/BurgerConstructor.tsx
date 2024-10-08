import {FC, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useMediaQuery} from "react-responsive";
import {DropTargetMonitor, useDrop} from "react-dnd";

import {Button, CurrencyIcon,} from "@ya.praktikum/react-developer-burger-ui-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

import styles from "./BurgerConstructor.module.css";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import ConstructorIngredients from "../ConstructorIngredients/ConstructorIngredients";
import {createOrder} from "../../utils/api";
import {selectUserCredentials} from "../../services/reducers/authReducer";
import {addIngredientToConstructor, clearIngredientsInConstructor,} from "../../services/actions/burgerConstructor";
import {useAppDispatch, useAppSelector} from "../../services/hooks/hooks";
import {IIngredient, OrderResponse} from "../../services/types/types";


const BurgerConstructor:FC = () => {
    const [isModalOpen, setModalOpen] = useState<boolean>(false);

    const { user: AuthUser } = useAppSelector(selectUserCredentials);

    const [orderId, setOrderId] = useState<string|null>(null);

    const isDesktop = useMediaQuery({ minWidth: 961 });

    const isTablet = useMediaQuery({ minWidth: 376, maxWidth: 960 });

    const isMobile = useMediaQuery({ maxWidth: 375 });

    const ingredientElement = useAppSelector((store) => store.constructorIngredients.ingredients);

    const ingredientElementBun = useAppSelector((store) => store.constructorIngredients.bun);

    const dispatch = useAppDispatch();

    const [, setBurgerIngredients] = useState<string[]>([]);

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [{ canDrop, dragItem, isHover }, dropTarget] = useDrop<
        IIngredient,
        unknown,
        { canDrop:boolean; dragItem:IIngredient; isHover:boolean }
    >({
        accept: "items",

        drop(item:IIngredient) {
            dispatch(addIngredientToConstructor(item));
        },

        collect: (monitor:DropTargetMonitor) => ({
            canDrop: monitor.canDrop(),
            dragItem: monitor.getItem(),
            isHover: monitor.isOver(),
        }),
    });

    const handleOrderClick = async () => {
        try {
            setIsLoading(true);

            const ingredientIds = ingredientElement.map(
                (ingredient:IIngredient) => ingredient._id
            );

            const bunId = ingredientElementBun
                ? ingredientElementBun._id
                : "643d69a5c3f7b9001cfa093c";

            bunId && ingredientIds.push(bunId);

            const response:OrderResponse = await createOrder({
                ingredients: ingredientIds,
            });

            if (response.success) {
                dispatch(clearIngredientsInConstructor());

                setBurgerIngredients([]);
            }

            setOrderId(response.order.number);

            setModalOpen(true);

            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    const handleAuthClick = async () => {
        navigate("/login", { replace: true });
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const totalPrice = useMemo(() => {
        const bunPrice = ingredientElementBun ? ingredientElementBun.price : 0;

        const ingredientsPrice = ingredientElement.reduce(
            (total:number, ingredient:IIngredient) => {
                return total + ingredient.price;
            }, 0
        );

        return bunPrice + ingredientsPrice;
    }, [ingredientElement, ingredientElementBun]);

    return (
        <section className={`${styles.container} ${styles.flexCenter} ${styles.h100} ${styles.mb25} mb-5 mt-10`}>
            {isDesktop && (
                <>
                    <div ref={dropTarget} className={`${isHover && styles.dropIndicator}`}>
                        <div className={`${styles.flexContainer} mb-5 mt-10`} data-cy="burgerConstructorContainer">
                            <ConstructorIngredients items={ingredientElement}/>
                        </div>

                        <div className={`${styles.infoContainer}`}>
                            <div className={`${styles.infoContainerItem} mr-2`}>
                                <p className="text text_type_digits-medium mr-2">{totalPrice}</p>

                                <CurrencyIcon type="primary"/>
                            </div>

                            {AuthUser ? (
                                <Button
                                    htmlType="button"
                                    type="primary"
                                    size="large"
                                    onClick={handleOrderClick}
                                    disabled={
                                        ingredientElement === undefined ||
                                        ingredientElementBun === undefined
                                            ? true
                                            : false
                                    }
                                    data-cy="submitConstructorForm"
                                >
                                    Оформить заказ
                                </Button>
                            ) : (
                                <Button
                                    htmlType="button"
                                    type="primary"
                                    size="large"
                                    onClick={handleAuthClick}
                                    disabled={false}
                                >
                                    Авторизация
                                </Button>
                            )}
                        </div>
                    </div>
                    {isLoading && (
                        <Modal onClose={closeModal}>
                            <div className={styles.modalContent}>
                                <h1 className="text text_type_main-large mb-8">Оформляем заказ</h1>

                                <p className="text text_type_main-medium text_color_inactive mb-8">
                                    Подождите пожалуйста, примерное время ожидание 15 сек.
                                </p>

                                <FontAwesomeIcon
                                    icon={faSpinner}
                                    spin
                                    size="5x"
                                    className={`${styles.faSpinner}`}
                                />
                            </div>
                        </Modal>
                    )}

                    {isModalOpen && (
                        <Modal onClose={closeModal}>
                            {orderId ? (
                                <OrderDetails orderId={orderId}/>
                            ) : (
                                <p className="text text_type_main-medium text_color_inactive">Ошибка при создании
                                    заказа. Попробуйте еще раз.</p>
                            )}
                        </Modal>
                    )}
                </>
            )}
            {isMobile || isTablet && (
                <>
                    <div ref={dropTarget} className={`${styles.w100} ${isHover && styles.dropIndicator}`}>
                        <div data-cy="burgerConstructorContainer" className="burgerConstructorContainer">
                            <ConstructorIngredients items={ingredientElement}/>
                        </div>

                        <div className={`${styles.infoContainer}`}>
                            <div className={`${styles.infoContainerItem} mr-10`}>
                                <p className="text text_type_digits-medium mr-2">{totalPrice}</p>

                                <CurrencyIcon type="primary"/>
                            </div>

                            {AuthUser ? (
                                <Button
                                    htmlType="button"
                                    type="primary"
                                    size="large"
                                    onClick={handleOrderClick}
                                    disabled={
                                        ingredientElement === undefined ||
                                        ingredientElementBun === undefined
                                            ? true
                                            : false
                                    }
                                    data-cy="submitConstructorForm"
                                >
                                    Оформить заказ
                                </Button>
                            ) : (
                                <Button
                                    htmlType="button"
                                    type="primary"
                                    size="large"
                                    onClick={handleAuthClick}
                                    disabled={false}
                                >
                                    Авторизация
                                </Button>
                            )}
                        </div>
                    </div>
                    {isLoading && (
                        <Modal onClose={closeModal}>
                            <div className={styles.modalContent}>
                                <h1 className="text text_type_main-large mb-8">Оформляем заказ</h1>

                                <p className="text text_type_main-medium text_color_inactive mb-8">
                                    Подождите пожалуйста, примерное время ожидание 15 сек.
                                </p>

                                <FontAwesomeIcon
                                    icon={faSpinner}
                                    spin
                                    size="5x"
                                    className={`${styles.faSpinner}`}
                                />
                            </div>
                        </Modal>
                    )}

                    {isModalOpen && (
                        <Modal onClose={closeModal}>
                            {orderId ? (
                                <OrderDetails orderId={orderId}/>
                            ) : (
                                <p className="text text_type_main-medium text_color_inactive">Ошибка при создании
                                    заказа. Попробуйте еще раз.</p>
                            )}
                        </Modal>
                    )}
                </>
            )}
        </section>
    );
};

export default BurgerConstructor;
