import { useState, useEffect, useMemo, FC } from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import ConstructorIngredients from '../ConstructorIngredients/ConstructorIngredients';
import { createOrder } from '../../utils/api';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { selectUserCredentials } from '../../services/reducers/authReducer'
import { addIngredientToConstructor, clearIngredientsInConstructor } from '../../services/actions/burgerConstructor'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../services/hooks/hooks';
import { Ingredient, OrderResponse } from '../../services/types';

const BurgerConstructor: FC = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const { user: AuthUser } = useAppSelector(selectUserCredentials);
  const [orderId, setOrderId] = useState<string | null>(null);
  const ingredientElement = useAppSelector((store: any) => store.constructorIngredients.ingredients);
  const ingredientElementBun = useAppSelector((store: any) => store.constructorIngredients.bun);
  const dispatch = useAppDispatch();
  const [, setBurgerIngredients] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getIngredientsData = async () => {
      try {
        setBurgerIngredients(ingredientElement.lenght === 0 ? [] : ingredientElement);
      } catch (error) {
        // Обработка ошибки
      }
    };

    getIngredientsData();
  }, [ingredientElement, setBurgerIngredients]);

  interface TIngredient extends Ingredient {};

  const [{ canDrop, dragItem, isHover }, dropTarget] = useDrop<TIngredient, unknown, { canDrop: boolean; dragItem: TIngredient; isHover: boolean }>({
    accept: "items",
    drop(item: TIngredient) {
      dispatch(addIngredientToConstructor(item))
    },
    collect: (monitor: DropTargetMonitor) => ({
      canDrop: monitor.canDrop(),
      dragItem: monitor.getItem(),
      isHover: monitor.isOver(),
    })
  });

  const handleOrderClick = async () => {
    try {
      const ingredientIds = ingredientElement.map((ingredient: Ingredient) => ingredient._id);
      const bunId = ingredientElementBun ? ingredientElementBun._id : '643d69a5c3f7b9001cfa093c';

      if (bunId) {
        ingredientIds.push(bunId);
      }

      const response: OrderResponse = await createOrder({ ingredients: ingredientIds });

      if (response.success) {
        dispatch(clearIngredientsInConstructor()); // Clear constructor ingredients
        setBurgerIngredients([]); // Clear burger ingredients
      }

      setOrderId(response.order.number);
      setModalOpen(true);
    } catch (error) {
      // Обработка ошибки
    }
  };

  const handleAuthClick = async () => {
    navigate('/login', { replace: true });
  }

  const closeModal = () => {
    setModalOpen(false);
  };

  const totalPrice = useMemo(() => {
    const bunPrice = ingredientElementBun ? ingredientElementBun.price : 0;

    const ingredientsPrice = ingredientElement.reduce((total: number, ingredient: Ingredient) => {
      return total + ingredient.price;
    }, 0);
    return bunPrice + ingredientsPrice;

  }, [ingredientElement, ingredientElementBun]);


  return (
    <section className={`${styles.container} mt-25`}>
      <div ref={dropTarget} className={`${isHover && styles.dropIndicator}`}>
        <div className={styles.flexContainer}>
          <ConstructorIngredients
            items={ingredientElement}
          />
        </div>

        <div className={`${styles.infoContainer} mt-10`}>
          <div className={`${styles.infoContainerItem} mr-10`}>
            <p className='text text_type_digits-medium mr-2'>{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
          {AuthUser
            ? <Button htmlType="button" type="primary" size="large" onClick={handleOrderClick} disabled={ingredientElement === undefined || ingredientElementBun === undefined ? true : false}>
              Оформить заказ
            </Button>
            : <Button htmlType="button" type="primary" size="large" onClick={handleAuthClick} disabled={false}>
              Авторизация
            </Button>
          }
        </div>
      </div>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          {orderId ? (
            <OrderDetails orderId={orderId} />
          ) : (
            <p>Ошибка при создании заказа. Попробуйте еще раз.</p>
          )}
        </Modal>
      )}

    </section>
  );
};

export default BurgerConstructor;