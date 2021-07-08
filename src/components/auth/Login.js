import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import validator from 'validator';
import { ToastContainer, toast } from 'react-toastify';
import { authLogin, startLogin } from '../../actions/auth';

import login from '../../assets/login/login.png';
import logo from '../../assets/login/logo.png';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { rol } = useSelector((state) => state.auth);
  // console.log(rol);
  const initialState = {
    username: 'generaladmin',
    password: 'password',
  };
  const [formValues, setFormValues] = useState(initialState);

  const { username, password } = formValues;

  const handleOnChangeLogin = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  // const validationFormulario = () => {
  //   if (username.trim().length === 0 || password.trim().length === 0) {
  //     toast.error('Los campos no deben estar vacios', {
  //       position: toast.POSITION.TOP_RIGTH,
  //     });
  //     return false;
  //   }

  //   if (username === null) {
  //     toast.error('caracteres', {
  //       position: toast.POSITION.TOP_RIGTH,
  //     });
  //     return false;
  //   }

  //   if (password.trim().length < 6) {
  //     toast.error('La contraseña debe tener mas de 6 caracteres', {
  //       position: toast.POSITION.TOP_RIGTH,
  //     });
  //     return false;
  //   }

  //   return true;
  // };

  const handleLogin = (e) => {
    e.preventDefault();

    dispatch(startLogin(username, password));
    // history.push("admin/registro")
    // history.replace(`${rol}`);
    // if (validationFormulario()) {
    // dispatch(authLogin(email, password));
    // toast.success('Datos correctos', {
    //   position: toast.POSITION.TOP_RIGTH,
    // });
    // history.push(`${role}`);
    // }
  };

  return (
    <div className="container-fluid">
      <ToastContainer />
      <div className="row login">
        <div className=" col-4 col-sm-6 col-md-7  col-xl-7 login__img ">
          <img src={login} alt="" />
        </div>
        <div className="col-11 col-sm-5 col-md-4 col-xl-3  login__form ">
          <img src={logo} alt="" />
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Nombre de usuario"
                name="username"
                value={username}
                onChange={handleOnChangeLogin}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                placeholder="Contraseña"
                name="password"
                value={password}
                onChange={handleOnChangeLogin}
              />
            </div>
            {/* <Link to="/registrar">Registarse</Link> */}
            <button type="submit" className="botones">
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
