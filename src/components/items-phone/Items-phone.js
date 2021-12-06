import './Items-phone.scss';
import { useState, memo } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { buyNow, removePhone } from '../../action/action';
import addItem from '../../image/addBlack.png';
import deleted from '../../image/delete.png';

const ItemsPhone = memo(({ item }) => {
  // console.log('render');
  const buyPhoneItem = useSelector((state) => state.phoneChange.buyItem);
  const description = item.description.split(' ');
  const newDescription = description.splice(0, 7).join(' ');
  const imgRef = useRef();
  const addPhone = useRef();
  const deletedRef = useRef();
  const dispatch = useDispatch();
  const [triggerAddPhoneButton, setTriggerAddPhoneButton] = useState(false);

  function buyPhone(item) {
    dispatch(buyNow(item));
    setTriggerAddPhoneButton(true);
    setTimeout(() => {
      setTriggerAddPhoneButton(false);
    }, 200);
  }
  function onMouseEnter() {
    imgRef.current.style.opacity = '0.3';
    addPhone.current.style.display = 'block';
    deletedRef.current.style.display = 'block';
  }
  function onMouseOut() {
    imgRef.current.style.opacity = '1';
    addPhone.current.style.display = 'none';
    deletedRef.current.style.display = 'none';
  }
  return (
    <>
      <div
        onMouseOver={() => onMouseEnter()}
        onMouseOut={() => onMouseOut()}
        className="phone_item">
        <div
          ref={imgRef}
          className="img_phone"
          style={triggerAddPhoneButton ? { transform: 'scale(1.1)' } : { transform: 'scale(1)' }}>
          <LazyLoadImage effect="blur" src={item.image} alt="img-phone" />
        </div>
        <div className="img_phone_information">
          <div className="img_phone_text">
            <h3>{item.name}</h3>
            <p>${item.price}</p>
          </div>
          <span>{newDescription} ...</span>
          <div className="phone_item_btn">
            <NavLink to="/BuyPhone">
              <button onClick={() => buyPhone(item)}>Buy Now</button>
            </NavLink>
            <NavLink to={`/PhoneInfo/${item.id}`}>
              <button>More info</button>
            </NavLink>
          </div>
        </div>
        <TransitionGroup>
          <CSSTransition timeout={500} classNames="item">
            <img
              style={
                triggerAddPhoneButton ? { transform: 'scale(0.9)' } : { transform: 'scale(1)' }
              }
              className="fade phone__add_img"
              onClick={() => buyPhone(item)}
              ref={addPhone}
              src={addItem}
              alt="add"
            />
          </CSSTransition>
        </TransitionGroup>
        <img
          src={deleted}
          alt="deleted"
          style={triggerAddPhoneButton ? { transform: 'scale(0.9)' } : { transform: 'scale(1)' }}
          className="fade phone__add_img deleted"
          onClick={() => {
            Object.values(buyPhoneItem)[0] && dispatch(removePhone(item));
          }}
          ref={deletedRef}
        />
      </div>
    </>
  );
});
export default ItemsPhone;
