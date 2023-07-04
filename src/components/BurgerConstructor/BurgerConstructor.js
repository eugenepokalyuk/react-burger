import React, { useState, useContext, useReducer, useEffect, useMemo } from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';
import Modal from '../Modal/Modal';
import PropTypes from 'prop-types';
import OrderDetails from '../OrderDetails/OrderDetails';
import ConstructorIngredients from '../ConstructorIngredients/ConstructorIngredients';
import { BurgerContext } from '../../services/BurgerContext';
import { fetchIngredientsData, createOrder } from '../../utils/api';

const initialState = {
  totalPrice: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_TOTAL_PRICE':
      return {
        ...state,
        totalPrice: action.payload,
      };
    default:
      return state;
  }
};

const BurgerConstructor = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { burgerIngredients, setBurgerIngredients } = useContext(BurgerContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [orderId, setOrderId] = useState(null);

  // Запрос на ингридиенты
  useEffect(() => {
    const getIngredientsData = async () => {
      try {
        const data = await fetchIngredientsData();
        setBurgerIngredients(data);
      } catch (error) {
        // Обработка ошибки
      }
    };

    getIngredientsData();
  }, [setBurgerIngredients]);

  const handleOrderClick = async () => {
    try {
      const ingredientIds = burgerIngredients.map((ingredient) => ingredient._id);
      const response = await createOrder({ ingredients: ingredientIds });
      setOrderId(response.order.number);
      setModalOpen(true);
    } catch (error) {
      // Обработка ошибки
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleIngredientAdd = (ingredient) => {
    dispatch({ type: 'SET_TOTAL_PRICE', payload: ingredient.price });
  };

  const handleIngredientRemove = (ingredient) => {
    // Реализация логики удаления ингредиента
  };

  const totalPrice = useMemo(() => {
    return burgerIngredients.reduce((acc, ingredient) => acc + ingredient.price, 0);
  }, [burgerIngredients]);

  return (
    <section className={`${styles.container} mt-25`}>
      <div>
        <div className={styles.flexContainer}>
          <ConstructorIngredients
            items={burgerIngredients}
            onIngredientAdd={handleIngredientAdd}
            onIngredientRemove={handleIngredientRemove}
          />
        </div>

        <div className={`${styles.infoContainer} mt-10`}>
          <div className={`${styles.infoContainerItem} mr-10`}>
            <p className='text text_type_digits-medium mr-2'>{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button htmlType="button" type="primary" size="large" onClick={handleOrderClick}>
            Оформить заказ
          </Button>
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
  burgerIngredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default BurgerConstructor;
