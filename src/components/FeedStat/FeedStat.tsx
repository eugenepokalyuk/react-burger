import React, { FC } from 'react';
import styles from './FeedStat.module.css';

const FeedStat: FC = () => {
    return (
        <>
            <div className={`${styles.flex}`}>
                <div className={`${styles.w50} mr-9`}>
                    <h1 className='text text_type_main-medium mb-6'>Готовы:</h1>
                    <ul>
                        <li className={`${styles.orderTitleDone} text text_type_digits-default mb-2`}>018232</li>
                        <li className={`${styles.orderTitleDone} text text_type_digits-default mb-2`}>018231</li>
                        <li className={`${styles.orderTitleDone} text text_type_digits-default mb-2`}>018230</li>
                        <li className={`${styles.orderTitleDone} text text_type_digits-default mb-2`}>018229</li>
                        <li className={`${styles.orderTitleDone} text text_type_digits-default mb-2`}>018228</li>
                    </ul>
                </div>

                <div className={styles.w50}>
                    <h1 className='text text_type_main-medium mb-6'>В работе:</h1>
                    <p className='text text_type_main-small'>Все текущие заказы готовы!</p>
                </div>
            </div>

            <div className='mt-15'>
                <p className='text text_type_main-medium'>Выполнено за все время:</p>
                <p className={`${styles.textShadows} text text_type_digits-large`}>18232</p>
            </div>

            <div className='mt-15'>
                <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
                <p className={`${styles.textShadows} text text_type_digits-large`}>8</p>
            </div>
        </>
    )
}

export default FeedStat;