import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from '../components/ui/Navbar';
// import PrivateRoutes from './PrivateRoutes';
import Registro from '../components/admin/registro/Registro';
import RegistroClinica from '../components/admin/registro/RegistroClinica';
import RegistroEmpresa from '../components/admin/registro/RegistroEmpresa';
import Estadistica from '../components/admin/estadistica/Estadistica';
import Usuarios from '../components/admin/usuario/Usuario';
import Servicios from '../components/admin/servicio/Servicio';
import Trabajador from '../components/admin/trabajador/Trabajador';
import { useHistory } from 'react-router-dom';

const AdminRouter = ({ ...rest }) => {
  // let history = useHistory();

  // useEffect(() => {
  //   history.push('/admin/registro');
  // }, [history]);

  return (
    <div>
      <Navbar
        titulo1={'Registro'}
        url1={'/admin/registro'}
        titulo2={'Estadísticas'}
        url2={'/admin/estadistica'}
        titulo3={'Usuarios'}
        url3={'/admin/usuario'}
        titulo4={'Servicios'}
        url4={'/admin/servicios'}
        titulo5={'Trabajadores'}
        url5={'/admin/trabajadores'}
        titulo6={''}
        url6={''}
        ruta={'/admin/registro/clinica'}
      />
      <Switch>
        <Route exact path="/admin/trabajadores" component={Trabajador} />
        <Route exact path="/admin/servicios" component={Servicios} />
        <Route exact path="/admin/usuario" component={Usuarios} />
        <Route exact path="/admin/estadistica" component={Estadistica} />
        <Route
          exact
          path="/admin/registro/empresa"
          component={RegistroEmpresa}
        />
        <Route
          exact
          path="/admin/registro/clinica"
          component={RegistroClinica}
        />
        <Route exact path="/admin/registro" component={Registro} />
      </Switch>
    </div>
  );
};

export default AdminRouter;
