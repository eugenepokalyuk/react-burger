import { useState } from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructor.module.css';
import BasketData from '../../utils/basket.json';
import Modal from '../Modal/Modal';
import PropTypes from 'prop-types';
import OrderDetails from '../OrderDetails/OrderDetails';
import ConstructorIngredients from '../ConstructorIngredients/ConstructorIngredients';

const BurgerConstructor = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOrderClick = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className={`${styles.container} mt-25`}>
      <div>
        <div className={styles.flexContainer} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <ConstructorIngredients items={BasketData} />
        </div>

        <div className={`${styles.infoContainer} mt-10`}>
          <div className={`${styles.infoContainerItem} mr-10`}>
            <p className='text text_type_digits-medium mr-2'>{calculateTotalPrice(BasketData)}</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button htmlType="button" type="primary" size="large" onClick={handleOrderClick}>
            Оформить заказ
          </Button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
          <OrderDetails orderId="034536" />
      </Modal>
    </section>
  );
};

function calculateTotalPrice(items) {
  const firstBunPrice = 20; // Стоимость первой булки
  const lastBunPrice = 20; // Стоимость последней булки

  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
  return totalPrice + firstBunPrice + lastBunPrice;
}

BurgerConstructor.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  )
};

export default BurgerConstructor;