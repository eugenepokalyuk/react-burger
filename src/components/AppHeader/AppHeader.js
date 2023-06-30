import React from 'react';
import AppHeaderStyles from './AppHeader.module.css';

import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
  return (
    <header className={`${AppHeaderStyles.header} pb-4 pt-4`}>
      <nav className={AppHeaderStyles.nav}>
        <ul className={AppHeaderStyles.list}>
          <li>
            <a href="/#" className={`${AppHeaderStyles.link} ${AppHeaderStyles.capitalize} ${AppHeaderStyles.active}`}>
              <BurgerIcon type="secondary" />
              <p className='text text_type_main-default ml-2'>Конструктор</p>
            </a>
          </li>
          <li className='ml-2'>
            <a href="/#" className={`${AppHeaderStyles.link} ${AppHeaderStyles.capitalize}`}>
              <ListIcon type="secondary" />
              <p className='text text_type_main-default text_color_inactiv ml-2'>Лента заказов</p>
            </a>
          </li>
        </ul>
        <div className={AppHeaderStyles.logo}>
          <a href="/#">
            <Logo />
          </a>
        </div>
        <ul>
          <li className='ml-2'>
            <a href="/#" className={`${AppHeaderStyles.link} ${AppHeaderStyles.capitalize}`}>
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