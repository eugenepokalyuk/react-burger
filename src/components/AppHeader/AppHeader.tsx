import { useState, useEffect, FC } from 'react';
import styles from './AppHeader.module.css';
import { NavLink, useMatch } from 'react-router-dom';
import { Logo, BurgerIcon, ListIcon, ProfileIcon, CloseIcon, MenuIcon, ArrowDownIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useMediaQuery } from "react-responsive";
import MobileLogo from '../../images/MobileLogo.png';

const AppHeader: FC = () => {
  const [userName, setUserName] = useState<string>('');
  const user = localStorage.getItem('accessToken');
  const getUserNameFromLS = localStorage.getItem('userName');
  const loginRoute = useMatch("/login");
  const profileRoute = useMatch("/profile");
  const homeRoute = useMatch("/");
  const feedRoute = useMatch("/profile");

  const link = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.link} text_color_primary` : `${styles.link}`;

  useEffect(() => {
    if (user) {
      setUserName(localStorage.getItem('userName') || userName || '');
    }
    setUserName(getUserNameFromLS || userName || '');
  }, [getUserNameFromLS, setUserName, user, userName]);

  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)"
  });

  // Чуть позже вынесу в контекст для адаптивной верстки
  // const isTablet = useMediaQuery({
  //   query: "(max-width: 1224px)"
  // });

  // const isMobile = useMediaQuery({
  //   query: "(max-width: 786px)"
  // });

  // const isPortrait = useMediaQuery({
  //   query: "(orientation: portrait)"
  // });

  // const isRetina = useMediaQuery({
  //   query: "(max-resolution: 300dpi)"
  // });

  const DesktopView: FC = () => {
    return (
      <nav className={styles.nav}>
        <ul className={styles.list}>

          <li>
            <NavLink to='/' className={link}>
              <BurgerIcon type={homeRoute ? "primary" : "secondary"} />
              <p className='text text_type_main-default ml-2'>Конструктор</p>
            </NavLink>
          </li>

          <li className='ml-2'>
            <NavLink to='/feed' className={link}>
              <ListIcon type={feedRoute ? "primary" : "secondary"} />
              <p className='text text_type_main-default ml-2'>Лента заказов</p>
            </NavLink>
          </li>

        </ul>

        <div className={styles.logo}>
          <NavLink to='/' >
            <Logo />
          </NavLink>
        </div>


        <ul className={styles.list}>
          {user
            ? <li>
              <NavLink to='/profile' className={link}>
                <ProfileIcon type={profileRoute ? "primary" : "secondary"} />
                <p className='text text_type_main-default ml-2'>Личный кабинет</p>
              </NavLink>
            </li>

            : <li>
              <NavLink to='/login' className={link}>
                <ProfileIcon type={loginRoute ? "primary" : "secondary"} />
                <p className='text text_type_main-default ml-2'>Личный кабинет</p>
              </NavLink>
            </li>}

        </ul>
      </nav>
    )
  }

  const MobileView: FC = () => {
    const [isBurgerMenuOpen, setBurgerMenuOpen] = useState<boolean>(false);

    const toggleBurgerMenu = () => {
      setBurgerMenuOpen(!isBurgerMenuOpen);
    };

    return (
      <nav className={styles.mobileNav}>
        <div className={styles.mobileLogo}>
          <NavLink to='/'>
            <img src={MobileLogo} alt="Знак закрытия окна" />
          </NavLink>
        </div>

        <div className={styles.burgerMenuButton} onClick={toggleBurgerMenu}>
          <MenuIcon type="primary" />

        </div>

        {isBurgerMenuOpen && (
          <div className={`${styles.burgerMenu} pr-2 pl-2`}>
            <div className={`${styles.burgerMenuHeader} pt-4 pb-4`}>
              <p className='text text_type_main-large'>Меню</p>
              <div className={styles.closeButton} onClick={toggleBurgerMenu}>
                <CloseIcon type="primary" />
              </div>
            </div>

            <ul className={styles.burgerMenuList}>
              <li>
                {user ? (
                  <NavLink to='/profile'>
                    <ProfileIcon type={profileRoute ? "primary" : "secondary"} />
                    <p className={`text text_type_main-medium ${profileRoute ? "" : "text_color_inactive"} ml-2`}>Личный кабинет</p>
                    <ArrowDownIcon type="primary" />
                  </NavLink>
                ) : (
                  <NavLink to='/login'>
                    <ProfileIcon type={loginRoute ? "primary" : "secondary"} />
                    <p className={`text text_type_main-medium ${loginRoute ? "" : "text_color_inactive"} ml-2`}>Личный кабинет</p>
                  </NavLink>
                )}
              </li>
              <li>
                <NavLink to='/'>
                  <BurgerIcon type={homeRoute ? "primary" : "secondary"} />
                  <p className={`text text_type_main-medium ${homeRoute ? "" : "text_color_inactive"} ml-2`}>Конструктор</p>
                </NavLink>
              </li>
              <li>
                <NavLink to='/feed'>
                  <ListIcon type={feedRoute ? "primary" : "secondary"} />
                  <p className={`text text_type_main-medium ${feedRoute ? "" : "text_color_inactive"} ml-2`}>Лента заказов</p>
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </nav>
    );
  };

  return (
    <header className={`${styles.header} pb-4 pt-4`}>
      {
        isDesktop ? <DesktopView /> : <MobileView />
      }
    </header>
  );
};
export default AppHeader;