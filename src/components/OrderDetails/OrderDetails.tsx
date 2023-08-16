import React, { useEffect, FC } from 'react';
import CheckMarkIconImage from '../../images/CheckMarkIcon.png';
import styles from './OrderDetails.module.css';
import { useAppDispatch } from '../../services/hooks/hooks';
import { fetchOrderNumberRequest, updateOrderNumber } from '../../services/actions/orderDetails';

import { OrderDetailsProps } from '../../services/types';

const OrderDetails: FC<OrderDetailsProps> = ({ orderId }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOrderNumberRequest());
    dispatch(updateOrderNumber(orderId));
  }, [dispatch, orderId]);

  return (
    <>
      <h2 className={`${styles.textShadows} text text_type_digits-large mb-8`}>
        {orderId}
      </h2>
      <p className='text text_type_main-medium'>идентификатор заказа</p>
      <div className='mb-15 mt-15'>
        <img src={CheckMarkIconImage} alt="Знак закрытия окна" />
      </div>
      <p className='text text_type_main-default mb-2'>Ваш заказ начали готовить</p>
      <p className='text text_type_main-default text_color_inactive'>
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
}

export default OrderDetails;