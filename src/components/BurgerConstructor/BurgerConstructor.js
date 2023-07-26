import { useState, useContext, useEffect, useMemo } from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import ConstructorIngredients from '../ConstructorIngredients/ConstructorIngredients';
import { BurgerContext } from '../../services/BurgerContext';
import { createOrder } from '../../utils/api';
import { useDrop } from 'react-dnd';
import { selectConstructorIngredients } from '../../services/reducers/ingredients';
import { selectUserCredentials } from '../../services/reducers/authReducer'
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { addIngredientToConstructor } from '../../services/actions/burgerConstructor'
import { useNavigate } from 'react-router-dom';

const BurgerConstructor = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { error: AuthError, user: AuthUser } = useSelector(selectUserCredentials);
  const { burgerIngredients, setBurgerIngredients } = useContext(BurgerContext);
  const [orderId, setOrderId] = useState(null);
  const constructorIngredients = useSelector(selectConstructorIngredients);
  const dispatch = useDispatch();
  const ingredientElement = useSelector(store => store.constructorIngredients.ingredients);
  const ingredientElementBun = useSelector(store => store.constructorIngredients.bun);
  const navigate = useNavigate();

  useEffect(() => {
    const getIngredientsData = async () => {
      try {
        setBurgerIngredients(ingredientElement.lenght === 0 ? null : ingredientElement);
      } catch (error) {
        // Обработка ошибки
      }
    };

    getIngredientsData();
  }, [constructorIngredients]);

  const [{ isHover }, dropTarget] = useDrop({
    accept: "items",
    drop(item) {
      dispatch(addIngredientToConstructor(item))
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });

  const handleOrderClick = async () => {
    try {
      const ingredientIds = burgerIngredients.map((ingredient) => ingredient._id);
      const bunId = ingredientElementBun ? ingredientElementBun._id : '643d69a5c3f7b9001cfa093c';

      // Добавляем bunId в список ingredientIds
      if (bunId) {
        ingredientIds.push(bunId);
      }

      const response = await createOrder({ ingredients: ingredientIds });
      setOrderId(response.order.number);
      setModalOpen(true);
    } catch (error) {
      // Обработка ошибки
    }
  };

  const handleAuthClick = async () => {
    try {
      navigate('/login', { replace: true });
    } catch (error) {
      // Обработка ошибки
    }
  }

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleIngredientAdd = (ingredient) => {
    // Реализация логики добавления ингредиента
    dispatch(addIngredientToConstructor(ingredient))
  };

  const handleIngredientRemove = (ingredient) => {
    // Реализация логики удаления ингредиента
    dispatch(addIngredientToConstructor(ingredient))
  };

  const totalPrice = useMemo(() => {
    const bunPrice = ingredientElementBun ? ingredientElementBun.price : 0;

    const ingredientsPrice = burgerIngredients.reduce((total, ingredient) => {
      return total + ingredient.price;
    }, 0);

    return bunPrice + ingredientsPrice;
  }, [burgerIngredients, ingredientElementBun]);

  return (
    <section className={`${styles.container} mt-25`}>
      <div ref={dropTarget} className={`${isHover && styles.dropIndicator}`}>
        <div className={styles.flexContainer}>
          <ConstructorIngredients
            items={burgerIngredients}
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

BurgerConstructor.propTypes = {
  burgerIngredients: PropTypes.arrayOf(PropTypes.object),
  setBurgerIngredients: PropTypes.func,
};

export default BurgerConstructor;