import './Header.scss';
import logo from '../../image/logo.png';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import PopUpWindow from '../pop-up/PopUpWindow';

import { popUp } from '../../action/action';

const Header = () => {
  const popUpTrigger = useSelector((state) => state.reducer.popUp);
  const liArray = ['Menu', 'Contacts', 'Information', 'Register'];
  const [linksSelected, setLinkSelected] = useState('');
  const navRef = useRef();
  const burger = useRef();
  const logoRef = useRef();
  const [burgerCheck, setBurgerCheck] = useState(true);
  const dispatch = useDispatch();

  if (popUpTrigger) {
    document.querySelector('html').style.overflow = 'hidden';
  } else {
    document.querySelector('html').style.overflow = '';
  }
  useEffect(() => {
    if (window.innerWidth < 500) {
      navRef.current.style.transform = 'translateX(-465px)';
      burger.current.style.display = 'block';

      navRef.current.style.position = 'absolute';
    }
    function resize() {
      if (window.innerWidth < 500) {
        navRef.current.style.transform = 'translateX(-465px)';
        burger.current.style.display = 'block';

        navRef.current.style.position = 'absolute';
      }
      if (window.innerWidth > 500) {
        navRef.current.style.transform = 'translateX(0px)';
        burger.current.style.display = 'none';

        navRef.current.style.position = '';
      }
    }
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  useEffect(() => {
    const span = document.querySelectorAll('#span');
    const burgerTrigger = burger.current;
    const nav = navRef.current;
    function burgerClick() {
      if (burgerCheck) {
        span[0].style.transform = 'translateY(11px) rotate(45deg)';
        span[2].style.transform = 'translateY(-12px) rotate(-45deg';
        span[1].style.display = 'none';

        nav.style.transform = 'translateX(0px)';
        nav.style.position = '';

        setBurgerCheck(false);
      }
      if (!burgerCheck) {
        span[0].style.transform = 'translateY(0) rotate(0deg)';
        span[2].style.transform = 'translateY(0) rotate(0deg';
        span[1].style.display = 'block';

        nav.style.transform = 'translateX(-465px)';
        nav.style.position = 'absolute';

        setBurgerCheck(true);
      }
    }
    burgerTrigger.addEventListener('click', burgerClick);
    return () => {
      burgerTrigger.removeEventListener('click', burgerClick);
    };
  }, [burgerCheck]);

  function onClickLinks(link) {
    setLinkSelected(link);
  }

  function popUpWindow(boolean) {
    dispatch(popUp(boolean));
  }

  return (
    <>
      <header>
        <div onClick={() => popUpWindow(true)} className="header_logo">
          <img ref={logoRef} src={logo} alt="logo" width="50" />
          <h2>Cell phone shop</h2>
        </div>
        <div ref={burger} className="burger">
          <span id="span"></span>
          <span id="span"></span>
          <span id="span"></span>
        </div>
        <nav ref={navRef}>
          <ul>
            {liArray.map((item) => {
              return (
                <li
                  style={
                    linksSelected === item
                      ? { backgroundColor: 'rgb(0, 152, 223)', color: 'black' }
                      : null
                  }
                  onClick={() => onClickLinks(item)}
                  key={item}>
                  {item}
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      {popUpTrigger ? <PopUpWindow /> : null}
    </>
  );
};

export default Header;
