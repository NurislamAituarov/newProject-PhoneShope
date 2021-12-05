import { useRef, useState } from 'react';
import { removeAllPhone, buyNow, removePhone } from '../../action/action';
import Spinner from '../../spinner/Spinner';

import minus from '../../image/minus.png';
import plus from '../../image/plus.png';
import remove from '../../image/delete.png';
import many2 from '../../image/many2.png';
import phone from '../../image/phone.png';
import phoneBlack from '../../image/phoneBlack.png';

const Phone = ({ item, itemFirst, dispatch }) => {
  const itemRef = useRef();
  const [phoneImg, setPhoneImg] = useState('');
  const [spinnerTrigger, setSpinnerTrigger] = useState(false);

  function changeImg(name) {
    setPhoneImg(name);
  }

  function addPhone(item) {
    dispatch(buyNow(item));
  }

  function removePhoneItem(item) {
    dispatch(removePhone(item));
  }

  function request(item, name, price) {
    const object = {};
    object.name = name;
    object.price = price * item.length;
    const div = document.createElement('div');
    // div.innerHTML = 'Ваш запрос обрабатывается';
    div.classList.add('show-inform');
    itemRef.current.appendChild(div);
    setSpinnerTrigger(true);
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(object),
    })
      .then((response) => response.json())
      .then((data) => {
        div.innerHTML = 'Ваш запрос успешно завершился';
        setSpinnerTrigger(false);
      })
      .catch((err) => {
        alert('Error: ');
      })
      .finally(() => {
        setTimeout(() => dispatch(removeAllPhone(item[0])), 1000);
      });
  }
  return (
    <div tabindex="0" ref={itemRef} key={itemFirst.id} className="item">
      <div className="item__wrapper_general">
        <div
          className="item__general"
          onMouseOver={() => changeImg(itemFirst.name)}
          onMouseOut={() => changeImg('not')}>
          <img id="item__img" onClick={() => removePhoneItem(itemFirst)} src={minus} alt="minus" />
          <strong>{item.length} </strong>
          {phoneImg === itemFirst.name ? (
            <img id="img" src={phone} alt={item.name} />
          ) : (
            <img id="img" src={phoneBlack} alt={item.name} />
          )}
          <img id="item__img" onClick={() => addPhone(itemFirst)} src={plus} alt="plus" />
        </div>
        <h2>{itemFirst.name}</h2>
        <p>{itemFirst.weight}</p>
        <p id="item_price">
          {itemFirst.price * item.length}
          <img width="30" src={many2} alt="img" />
        </p>
      </div>
      <div id="item__buy-remove">
        <span onClick={() => request(item, itemFirst.name, itemFirst.price)}>Buy Now</span>
        <div onClick={() => dispatch(removeAllPhone(itemFirst))}>
          <img width="19" src={remove} alt="delete" />
        </div>
      </div>
      {spinnerTrigger ? <Spinner /> : null}
    </div>
  );
};

export default Phone;
