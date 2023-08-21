import React, { FC, ReactNode } from 'react';
import styles from './FeedItemDetails.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import data1 from '../../utils/data.json';

interface FeedItemProps {
    // order: any;
}

const FeedItemDetails: FC<FeedItemProps> = () => {

    return (
        <section className={`${styles.container} `}>
            <div className={`${styles.wrapper} ${styles.flex} ${styles.flexColumn}`}>
                {/* <p className={`${styles.flex} ${styles.flexContentCenter} text text_type_digits-default mb-10`}>#034533</p> */}
                <p className={`text text_type_main-medium mt-10 mb-3`}>Black Hole Singularity острый бургер</p>
                <p className={`text text_type_main-default mb-15 ${styles.orderTitleDone}`}>Выполнен</p>
                <p className={`text text_type_main-medium mb-3`}>Состав:</p>

                <ul className={`${styles.scrollable} ${styles.w100} ${styles.ingredientList} mb-10`}>
                    {data1.map((item: any) =>
                        <li className='mb-4'>
                            <div className={`${styles.itemImage}`}>
                                <img src={item.image} alt={`${item.name} изображение`} />
                            </div>

                            <div className={`${styles.itemName}`}>
                                <p className='text text_type_main-default'>{item.name}</p>
                            </div>

                            <div className={`${styles.itemPrice}`}>
                                <p className='mr-2 text text_type_digits-default'>{item.price}</p>
                                <CurrencyIcon type="primary" />
                            </div>

                        </li>
                    )}
                </ul>

                <ul className={`${styles.flex} ${styles.flexContentBetween} ${styles.flexAlignCenter} ${styles.w100}`}>
                    <li className='text text_type_main-default text_color_inactive'>Вчера, 13:50</li>
                    <li className={`${styles.flex} ${styles.flexAlignCenter}`}>
                        <p className='text text_type_digits-default mr-2'>510</p>
                        <CurrencyIcon type="primary" />
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default FeedItemDetails;