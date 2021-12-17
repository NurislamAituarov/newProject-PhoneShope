import './PopUpWindow.scss';
import { useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import close from '../../image/close.png';
import { popUp } from '../../action/action';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import Spinner from '../Spinner/Spinner';

const PopUpWindow = () => {
  const [loader, setLoader] = useState(false);
  const [success, setSuccess] = useState(false);
  const formRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener('click', (e) => {
      if (e.target === document.querySelector('.container')) {
        popUpClose();
      }
    });

    return () => {
      window.removeEventListener('click', (e) => {
        if (e.target === document.querySelector('.container')) {
          popUpClose();
        }
      });
    };
  }, []);

  function popUpClose() {
    dispatch(popUp(false));
  }
  return (
    <div className="container">
      <div className="container__block fadePopUp">
        <img onClick={popUpClose} width="20px" src={close} alt="close" />
        <Formik
          initialValues={{
            name: '',
            password: '',
            text: '',
          }}
          validationSchema={Yup.object({
            name: Yup.string().min(2, 'минимум два символа').required('Обязательное поля'),
            password: Yup.string().matches(/\d/g, 'Только цифра').required('Обязательное поля'),
            text: Yup.string().min(6, 'минимум 6 символа').required('Обязательное поля'),
          })}
          onSubmit={(values, { resetForm }) => {
            setLoader(true);
            fetch('https://jsonplaceholder.typicode.com/posts', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(values, null, 2),
            })
              .then((data) => {
                setLoader(false);
                setSuccess(true);
                return data.json();
              })
              .then((data) => {
                console.log(data);
              })
              .catch(() => {
                alert('Error');
              })
              .finally(() => {
                resetForm({ values: '' });
                setTimeout(() => {
                  dispatch(popUp(false));
                  setSuccess(false);
                }, 1000);
              });
          }}>
          <Form ref={formRef}>
            <label>
              name
              <Field type="text" name="name" />
            </label>
            {<ErrorMessage className="error" name="name" component="div" />}
            <label>
              password
              <Field type="text" name="password" />
            </label>
            {<ErrorMessage className="error" name="password" component="div" />}
            <label>
              <Field
                id="form__textarea"
                as="textarea"
                name="text"
                placeholder="Напишите о ваших навыках"></Field>
            </label>
            {<ErrorMessage className="error" name="text" component="div" />}
            <button type="submit">submit</button>
          </Form>
        </Formik>
      </div>
      {loader ? <div className="wrapper__spinner">{<Spinner />}</div> : null}
      {success ? (
        <div className="wrapper__spinner">
          <h2>Загрузка успешна завершилась</h2>
        </div>
      ) : null}
    </div>
  );
};
export default PopUpWindow;
