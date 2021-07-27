import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { startLogout } from '../../actions/auth';
// import { useSelector } from 'react-redux';
import logo from '../../assets/icons/logo.png';
import logosxd from '../../assets/icons/Isotipo.png';
import titles from '../../assets/icons/medical.png';

const Navbar = ({
  titulo1,
  titulo2,
  titulo3,
  titulo4,
  titulo5,
  titulo6,
  url1,
  url2,
  url3,
  url4,
  url5,
  url6,
  ruta,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);
  const [nombre, setNombre] = useState('');

  const handleLogout = () => {
    dispatch(startLogout());
    history.replace('/');
  };

  const mostrarSidebar = () => {
    const side = document.querySelector('.navBarUl').style;

    side.display === '' ? (side.display = 'flex') : (side.display = '');
  };

  // const listado = () => {
  useEffect(() => {
    if (role.id === 1) {
      return setNombre('Administrador');
    } else if (role.id === 2) {
      return setNombre('Cliente corporativo');
    } else if (role.id === 3) {
      return setNombre('Clinica toma muestra');
    } else if (role.id === 4) {
      return setNombre('Organizador');
    } else if (role.id === 8) {
      return setNombre('Laboratorio');
    } else if (role.id === 9) {
      return setNombre('Recepción');
    } else if (role.id === 10) {
      return setNombre('Facturación');
    } else if (role.id === 11) {
      return setNombre('Clinica procesa');
    } else if (role.id === 12) {
      return setNombre('Ventas');
    }
  }, [role.id]);
  // };

  return (
    <nav className="navbar navbar-expand-md navbar-light mb-4">
      <div className="container">
        <div className="containerLogo">
          <Link className="navbarLink navbar-brand text-white" to={ruta}>
            <img
              src={logo}
              alt="Medical Roma"
              className="logoImg d-inline-block align-text-top"
            />
            <img
              src={titles}
              alt="Medical Roma"
              className="logoImg d-inline-block align-text-top"
            />
          </Link>
          <button
            className="buttonNav"
            type="button"
            data-toggle="collapse"
            data-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={(e) => mostrarSidebar()}
          >
            <i className="fas fa-bars" style={{ color: 'white' }}></i>
          </button>
        </div>
        <div>
          <h3 className="nombredeltitulo">Bienvenido {nombre}</h3>
          <ul className=" navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink
                activeClassName="activo"
                className="navLink nav-link"
                aria-current="page"
                to={url1}
                style={{ color: 'white', fontSize: '15px' }}
              >
                {titulo1}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName="activo"
                className="navLink nav-link"
                to={url2}
                style={{ color: 'white', fontSize: '15px' }}
              >
                {titulo2}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName="activo"
                className="navLink nav-link"
                to={url3}
                style={{ color: 'white', fontSize: '15px' }}
              >
                {titulo3}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName="activo"
                className="navLink nav-link"
                to={url4}
                style={{ color: 'white', fontSize: '15px' }}
              >
                {titulo4}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName="activo"
                className="navLink nav-link"
                to={url5}
                style={{ color: 'white', fontSize: '15px' }}
              >
                {titulo5}
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink
                activeClassName="activo"
                className="navLink nav-link"
                to={url6}
                style={{ color: 'white', fontSize: '15px' }}
              >
                {titulo6}
              </NavLink>
            </li> */}
            <button
              className="text-white"
              style={{
                background: 'transparent',
                border: 'none',
                fontSize: '15px',
              }}
              onClick={handleLogout}
            >
              Salir <i className="fas fa-sign-in-alt"></i>
            </button>
          </ul>
        </div>
        <div className="navBarUl">
          <div className="logoSide">
            <Link className="navbarLink navbar-brand" to={ruta}>
              <img
                src={logosxd}
                alt="Medical Roma"
                className="sideLogo d-inline-block "
              />
            </Link>
          </div>
          <h3 className="nombreSubTitulo">Bienvenido {nombre}</h3>
          <ul className="navUl navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink
                activeClassName="activo"
                className="navLink nav-link"
                aria-current="page"
                to={url1}
              >
                {titulo1}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName="activo"
                className="navLink nav-link"
                to={url2}
              >
                {titulo2}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName="activo"
                className="navLink nav-link"
                to={url3}
              >
                {titulo3}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName="activo"
                className="navLink nav-link"
                to={url4}
              >
                {titulo4}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName="activo"
                className="navLink nav-link"
                to={url5}
              >
                {titulo5}
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink
                activeClassName="activo"
                className="navLink nav-link"
                to={url6}
              >
                {titulo6}
              </NavLink>
            </li> */}
            <li className="nav-item">
              <button
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '15px',
                  color: 'white',
                }}
                onClick={handleLogout}
              >
                Salir <i className="fas fa-sign-in-alt"></i>
              </button>
            </li>
          </ul>
          <div className="btnCerrar" onClick={(e) => mostrarSidebar()}>
            <i className="far fa-times-circle"></i>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
