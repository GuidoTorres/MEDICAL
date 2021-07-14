import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import validator from 'validator';
// import { ToastContainer, toast } from 'react-toastify';
import { startLogin } from '../../actions/auth';

import login from '../../assets/login/login.png';
import logo from '../../assets/login/logo.png';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { role, clinic_type } = useSelector((state) => state.auth);

  const initialState = {
    username: '',
    password: '',
  };
  const [formValues, setFormValues] = useState(initialState);

  const { username, password } = formValues;

  const handleOnChangeLogin = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const validandoRutas = () => {
    if (role.id === 1) {
      history.replace('admin/registro');
      return;
    } else if (role.id === 2) {
      history.replace('empresa/registro');
      return;
    } else if (role.id === 3) {
      history.replace('clinica/toma/reservas');
      return;
    } else if (role.id === 4) {
      history.replace('organizador/solicitud');
      return;
    } else if (role.id === 8) {
      history.replace('laboratorio/subir');
      return;
    } else if (role.id === 9) {
      history.replace('recepcion/usuarios');
      return;
    } else if (role.id === 10) {
      history.replace('facturacion/empresas');
      return;
    } else if (role.id === 11) {
      history.replace('clinica/procesa/reservas');
    } else {
      history.replace('/');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLogin(username, password));
    validandoRutas();
  };

  return (
    <div className="container-fluid">
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
