import CheckMarkIconImage from '../../images/CheckMarkIcon.png';
import styles from './OrderDetails.module.css';
import PropTypes from 'prop-types';

const OrderDetails = ({ orderId }) => {
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

OrderDetails.propTypes = {
  orderId: PropTypes.number.isRequired,
};

export default OrderDetails;