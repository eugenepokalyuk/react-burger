import React from 'react';
import styles from './AppHeader.module.css';

import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
  return (
    <header className={`${styles.header} pb-4 pt-4`}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li>
            <a href="/#" className={`${styles.link} ${styles.capitalize} ${styles.active}`}>
              <BurgerIcon type="secondary" />
              <p className='text text_type_main-default ml-2'>Конструктор</p>
            </a>
          </li>
          <li className='ml-2'>
            <a href="/#" className={`${styles.link} ${styles.capitalize}`}>
              <ListIcon type="secondary" />
              <p className='text text_type_main-default text_color_inactiv ml-2'>Лента заказов</p>
            </a>
          </li>
        </ul>
        <div className={styles.logo}>
          <a href="/#">
            <Logo />
          </a>
        </div>
        <ul>
          <li className='ml-2'>
            <a href="/#" className={`${styles.link} ${styles.capitalize}`}>
              <ProfileIcon type="secondary" />
              <p className='text text_type_main-default text_color_inactiv ml-2'>Личный кабинет</p>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default AppHeader;