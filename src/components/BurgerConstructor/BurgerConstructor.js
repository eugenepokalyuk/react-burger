import React, { useState } from 'react';
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorStyles from './BurgerConstructor.module.css';
import BasketData from '../../utils/basket.json';
import Modal from '../Modal/Modal';
import PropTypes from 'prop-types';

import CheckMarkIconImage from '../../images/CheckMarkIcon.png';


const BurgerConstructor = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOrderClick = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // render() {
  return (
    <section className={`${BurgerConstructorStyles.container} mt-25`}>
      <div>
        <div className={BurgerConstructorStyles.flexContainer} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <BasketBody items={BasketData} />
        </div>

        <div className={`${BurgerConstructorStyles.infoContainer} mt-10`}>
          <div className={`${BurgerConstructorStyles.infoContainerItem} mr-10`}>
            <p className='text text_type_digits-medium mr-2' >{calculateTotalPrice(BasketData)}</p>
            <CurrencyIcon type="primary" />
          </div>
          <Button htmlType="button" type="primary" size="large" onClick={handleOrderClick}>
            Оформить заказ
          </Button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 className={`${BurgerConstructorStyles.textShadows} text text_type_digits-large mb-8`}>034536</h2>
        <p className='text text_type_main-medium'>идентификатор заказа</p>
        <div className='mb-15 mt-15'>
          <img src={CheckMarkIconImage} alt="Знак закрытия окна" />
        </div>
        <p className='text text_type_main-default mb-2'>Ваш заказ начали готовить</p>
        <p className='text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитальной станции</p>
      </Modal>

    </section>
  );
  // }
}

function BasketBody({ items }) {
  // Я понимаю, что это очень плохая реализция. Я сделаю лучше но немного позже
  const firstBunPrice = 20; // Стоимость первой булки
  const lastBunPrice = 20; // Стоимость последней булки

  return (
    <>
      <div className='mr-4'>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={firstBunPrice}
          thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
          extraClass={BurgerConstructorStyles.constructorElement}
        />
      </div>

      <div className={BurgerConstructorStyles.scrollable}>
        <div className={BurgerConstructorStyles.scrollableContent}>

          {items.map((item, index) => (
            <div className={`${BurgerConstructorStyles.DragableItem} mr-2`} key={index}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={item.text}
                price={item.price}
                thumbnail={item.thumbnail}
                extraClass={BurgerConstructorStyles.constructorElement}
              />
            </div>
          ))}

        </div>
      </div>

      <div className='mr-4'>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={lastBunPrice}
          thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
          extraClass={BurgerConstructorStyles.constructorElement}
        />
      </div>
    </>
  )
}

function calculateTotalPrice(items) {
  // Я понимаю, что это очень плохая реализция. Я сделаю лучше но немного позже
  const firstBunPrice = 20; // Стоимость первой булки
  const lastBunPrice = 20; // Стоимость последней булки

  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
  return totalPrice + firstBunPrice + lastBunPrice;
}

BurgerConstructor.propTypes = {
  // Пропсы
};

BasketBody.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      thumbnail: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default BurgerConstructor;