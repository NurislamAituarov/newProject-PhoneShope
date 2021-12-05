import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './PhoneInfo.scss';

const PhoneInfo = () => {
  const { phoneId } = useParams();
  const phoneItem = useSelector((state) =>
    state.reducer.items.filter((item) => item.id === phoneId),
  )[0];

  return (
    <div className="wrapper_phone_info">
      <h2>{phoneItem.name}</h2>
      <img src={phoneItem.image} alt={phoneItem.name} />
      <p>Camera: {phoneItem.camera}</p>
      <p>Cpu: {phoneItem.cpu}</p>
      <p>Display: {phoneItem.display}</p>
      <p>Memory: {phoneItem.memory}</p>
      <p>Size: {phoneItem.size}</p>
      <p>Weight: {phoneItem.weight}</p>
      <div className="back">
        <NavLink to="/">Back</NavLink>
      </div>
    </div>
  );
};

export default PhoneInfo;
