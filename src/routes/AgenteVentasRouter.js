import React, { useEffect } from 'react';
import { Route } from 'react-router';
import Empresa from '../components/agenteventas/Empresa';
import Registro from '../components/agenteventas/Registro';
import Servicio from '../components/agenteventas/Servicio';
import Navbar from '../components/ui/Navbar';
// import { useHistory } from 'react-router-dom';

const AgenteVentasRouter = () => {
  // let history = useHistory();

  // useEffect(() => {
  //   history.push('/ventas/registro');
  // }, [history]);

  return (
    <div>
      <Navbar
        titulo1={'Registro '}
        url1={'/ventas/registro'}
        titulo2={'Servicios'}
        url2={'/ventas/servicios'}
        titulo3={''}
        url3={''}
        titulo4={''}
        url4={''}
        titulo5={''}
        url5={''}
        titulo6={''}
        url6={''}
        ruta={'/ventas/registro'}
      />

      <Route exact path="/ventas/registro" component={Registro} data={true} />
      <Route
        exact
        path="/ventas/registro/empresa"
        component={Empresa}
        data={true}
      />

      <Route exact path="/ventas/servicios" component={Servicio} data={true} />

      {/* <Route
        exact
        path="/ventas/servicios/editar"
        component={ServiciosEditar}
        data={true}
      /> */}
    </div>
  );
};

export default AgenteVentasRouter;
