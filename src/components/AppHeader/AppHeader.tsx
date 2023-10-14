import { useState, useEffect, FC } from 'react';
import styles from './AppHeader.module.css';
import { NavLink, useMatch } from 'react-router-dom';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import mobileLogo from '../../images/MobileLogo.png'

const AppHeader: FC = () => {
  const [userName, setUserName] = useState<string>('');
  const user = localStorage.getItem('accessToken');
  const getUserNameFromLS = localStorage.getItem('userName');
  const homeRoute = useMatch("/");
  const loginRoute = useMatch("/login");
  const feedRoute = useMatch("/feed");
  const profileRoute = useMatch("/profile");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isDesktop = useMediaQuery({ minWidth: 961 });
  const isTablet = useMediaQuery({ minWidth: 451, maxWidth: 960 });
  const isMobile = useMediaQuery({ maxWidth: 450 });

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const link = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.link} text_color_primary` : `${styles.link}`;

  useEffect(() => {
    user && setUserName(localStorage.getItem('userName') || userName || '');
    setUserName(getUserNameFromLS || userName || '');
  }, [getUserNameFromLS, setUserName, user, userName]);

  return (
    <header className={`${styles.header} pb-4 pt-4`}>
      {isDesktop && (
        <nav className={styles.nav}>
          <ul className={`${styles.list} ${styles.width100n3} ${styles.flexStart}`}>

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

          <div className={`${styles.logo} ${styles.width100n3} ${styles.flexCenter}`}>
            <NavLink to='/' >
              <Logo />
            </NavLink>
          </div>

          <ul className={`${styles.list} ${styles.width100n3} ${styles.flexEnd}`}>
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
              </li>
            }
          </ul>
        </nav>
      )}

      {isTablet && (
        <nav className={styles.nav}>
          <ul className={`${styles.list} ${styles.width100n3} ${styles.flexStart}`}>

            <li>
              <NavLink to='/' className={link}>
                <BurgerIcon type={homeRoute ? "primary" : "secondary"} />
              </NavLink>
            </li>

            <li className='ml-2'>
              <NavLink to='/feed' className={link}>
                <ListIcon type={feedRoute ? "primary" : "secondary"} />
              </NavLink>
            </li>

          </ul>

          <div className={`${styles.logo} ${styles.width100n3} ${styles.flexCenter}`}>
            <NavLink to='/' >
              <Logo />
            </NavLink>
          </div>

          <ul className={`${styles.list} ${styles.width100n3} ${styles.flexEnd}`}>
            {user
              ? <li>
                <NavLink to='/profile' className={link}>
                  <ProfileIcon type={profileRoute ? "primary" : "secondary"} />
                </NavLink>
              </li>

              : <li>
                <NavLink to='/login' className={link}>
                  <ProfileIcon type={loginRoute ? "primary" : "secondary"} />
                </NavLink>
              </li>
            }
          </ul>
        </nav>
      )}

      {(isMobile) && (
        <nav className={styles.nav}>
          <NavLink to='/'>
            <img src={mobileLogo} alt="Logo" />
          </NavLink>
          <FontAwesomeIcon icon={faBars} size="2x" onClick={handleMenuClick} className={styles.menuIconBar} />
          {isMenuOpen && (
            <ul className={`${styles.menu}`} >
              <NavLink to='/profile' className={'p-4 mt-4'}>
                <li className={`${styles.menuItem} text text_type_main-medium`}><ProfileIcon type={loginRoute ? "primary" : "secondary"} /> Личный кабинет</li>
              </NavLink>

              <NavLink to='/' className={'p-4 mt-4'}>
                <li className={`${styles.menuItem} text text_type_main-medium`}><BurgerIcon type={homeRoute ? "primary" : "secondary"} /> Конструктор бургеров</li>
              </NavLink>

              <NavLink to='/feed' className={'p-4 mt-4'}>
                <li className={`${styles.menuItem} text text_type_main-medium`}><ListIcon type={feedRoute ? "primary" : "secondary"} /> Лента заказов</li>
              </NavLink>
            </ul>
          )}
        </nav>
      )}
    </header>
  );
};
export default AppHeader;