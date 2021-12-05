import './Main.scss';
import search from '../../image/search.png';
import { useSelector, useDispatch } from 'react-redux';

import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { searchPhone, filterPhone } from '../../action/action';
import SectionView from './SectionView';

let index = 0;

const Main = () => {
  // console.log('render');
  let { buyItem } = useSelector((state) => state.phoneChange);
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const filterArray = ['All', 'Apple', 'Samsung', 'HTC', 'Lenovo', 'Microsoft'];
  const { itemNumber, itemPrice } = numPrice(buyItem);
  const [filterLi, setFilterLi] = useState(index);

  const filterPhoneText = (categoryId) => {
    dispatch(filterPhone(categoryId));
    index = categoryId;
    setFilterLi(index);
  };

  return (
    <main>
      <section className="main_section_left">
        <div className="section_sidebar_top">
          <NavLink to="/BuyPhone" className="buyPhone">
            {itemNumber} item(s) - $ {itemPrice}
          </NavLink>
          <h1>Quick shop</h1>
          <form>
            <input
              onChange={(e) => {
                setValue(e.target.value);
                dispatch(searchPhone(e.target.value));
              }}
              type="text"
              placeholder="Поиск"
              value={value}
            />
            <button>
              <img width="15" src={search} alt="search" />
            </button>
          </form>
        </div>
        <div className="section_sidebar_bottom">
          <h2>Brand</h2>
          <div>
            {filterArray.map((item, i) => {
              return (
                <span
                  style={
                    filterLi === i ? { backgroundColor: 'rgb(33, 102, 206)', color: 'white' } : null
                  }
                  onClick={(e) => {
                    filterPhoneText(i);
                  }}
                  key={i}>
                  {item}
                </span>
              );
            })}
          </div>
        </div>
      </section>
      <SectionView />
    </main>
  );
};

export default Main;

function numPrice(selector) {
  let itemNumber = 0;
  let itemPrice = 0;

  for (let key in selector) {
    if (typeof selector[key] !== 'undefined') {
      itemNumber += selector[key].length;
      itemPrice += selector[key].length * selector[key][0].price;
    }
  }

  return { itemNumber, itemPrice };
}
