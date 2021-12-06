import './PopUpWindow.scss';
import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import close from '../../image/close.png';
import { popUp } from '../../action/action';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const PopUpWindow = () => {
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
            password: Yup.number().min(5, 'не менее 5').required('Обязательное поля'),
            text: Yup.string().min(6, 'минимум 6 символа').required('Обязательное поля'),
          })}
          onSubmit={(values, { resetForm }) => {
            fetch('https://jsonplaceholder.typicode.com/posts', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(values, null, 2),
            })
              .then((data) => {
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
              text
              <Field as="textarea" name="text"></Field>
            </label>
            {<ErrorMessage className="error" name="text" component="div" />}
            <button type="submit">submit</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
export default PopUpWindow;
