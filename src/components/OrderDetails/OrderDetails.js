import React from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './OrderDetails.module.css';
import PropTypes from 'prop-types';

const OrderDetails = ({ items }) => {
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
          extraClass={styles.constructorElement}
        />
      </div>

      <div className={styles.scrollable}>
        <div className={styles.scrollableContent}>
          {items.map((item, index) => (
            <div className={`${styles.DragableItem} mr-2`} key={index}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={item.text}
                price={item.price}
                thumbnail={item.thumbnail}
                extraClass={styles.constructorElement}
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
          extraClass={styles.constructorElement}
        />
      </div>
    </>
  );
};

OrderDetails.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      thumbnail: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default OrderDetails;
