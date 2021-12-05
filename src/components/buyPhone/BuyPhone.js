import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './BuyPhone.scss';

import left from '../../image/left.png';
import smile from '../../image/smile.png';
import Phone from './Phone';

const BuyPhone = () => {
  const { buyItem } = useSelector((state) => state.phoneChange);
  const dispatch = useDispatch();

  const newItem = Object.values(buyItem).filter((item) => {
    return typeof item !== 'undefined';
  });

  return (
    <>
      <TransitionGroup component="div" className="buy_wrapper">
        {newItem.length === 0 ? (
          <CSSTransition timeout={4000} classNames="my_item-not">
            <div className="buy_wrapper-notItem">
              <img src={smile} alt="no" />
              <h5>No products selected</h5>
            </div>
          </CSSTransition>
        ) : (
          newItem.map((item) => {
            const itemFirst = item[0];
            return (
              <CSSTransition key={itemFirst.id} timeout={1000} classNames="my_item">
                <Phone item={item} itemFirst={itemFirst} dispatch={dispatch} />
              </CSSTransition>
            );
          })
        )}
        <NavLink id="link" to="/">
          <img width="45" height="40" src={left} alt="left" />
        </NavLink>
      </TransitionGroup>
    </>
  );
};

export default BuyPhone;
