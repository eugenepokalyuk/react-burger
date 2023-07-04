import React, { useState, useContext, useReducer, useEffect } from 'react';
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
        console.error(error);
      }
    };

    getIngredientsData();
  }, []);

  const handleOrderClick = async () => {
    try {
      const ingredientIds = burgerIngredients.map((ingredient) => ingredient._id);
      const response = await createOrder({ ingredients: ingredientIds });
      setOrderId(response.order.number);
      setModalOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleIngredientAdd = (ingredient) => {
    dispatch({ type: 'SET_TOTAL_PRICE', payload: ingredient.price });
  };

  const handleIngredientRemove = (ingredient) => {
    // Implement the logic for removing an ingredient
  };

  return (
    <section className={`${styles.container} mt-25`}>
      <div>
        <div className={styles.flexContainer} style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end' }}>
          <ConstructorIngredients 
            items={burgerIngredients} 
            onIngredientAdd={handleIngredientAdd} 
            onIngredientRemove={handleIngredientRemove}
          />
        </div>

        <div className={`${styles.infoContainer} mt-10`}>
          <div className={`${styles.infoContainerItem} mr-10`}>
            <p className='text text_type_digits-medium mr-2'>{state.totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button htmlType="button" type="primary" size="large" onClick={handleOrderClick}>
            Оформить заказ
          </Button>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {orderId ? (
          <OrderDetails orderId={orderId} />
        ) : (
          <p>Ошибка при создании заказа. Попробуйте еще раз.</p>
        )}
      </Modal>
    </section>
  );
};

BurgerConstructor.propTypes = {
  burgerIngredients: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      thumbnail: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default BurgerConstructor;