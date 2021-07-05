import React, { useEffect } from 'react';
import Navbar from '../components/ui/Navbar';
// import PrivateRoutes from './PrivateRoutes';
import Registro from '../components/clienteCorporativo/EmpresaRegistro';
import EmpresaAsignacion4 from '../components/clienteCorporativo/EmpresaAsignacion4';
// import EmpresaRegistro from '../components/clienteCorporativo/EmpresaRegistro';
import EmpresaAsignacion from '../components/clienteCorporativo/EmpresaAsignacion1';
import EmpresaAsignacion2 from '../components/clienteCorporativo/EmpresaAsignacion2';
import EmpresaFacturacion from '../components/clienteCorporativo/EmpresaFacturacion';
import EmpresaResultados from '../components/clienteCorporativo/EmpresaResultados';
import { Route } from 'react-router';
import { useHistory } from 'react-router-dom';

const EmpresaAsociadaRouter = () => {
  let history = useHistory();

  useEffect(() => {
    history.push('/empresa/registro');
  }, [history]);

  return (
    <div>
      <Navbar
        titulo1={'Registro de trabajador'}
        url1={'/empresa/registro'}
        titulo2={'Asignación de pruebas'}
        url2={'/empresa/asignacion1'}
        titulo3={'Facturación'}
        url3={'/empresa/facturacion'}
        titulo4={'Resultados'}
        url4={'/empresa/resultados'}
        titulo5={''}
        url5={''}
        titulo6={''}
        url6={''}
        ruta={'/empresa/registro'}
      />

      <Route
        exact
        path="/empresa/registro"
        component={Registro}
        isAuthenticated={true}
      />
      <Route
        exact
        path="/empresa/asignacion1"
        component={EmpresaAsignacion}
        isAuthenticated={true}
      />
      <Route
        exact
        path="/empresa/asignacion2"
        component={EmpresaAsignacion2}
        isAuthenticated={true}
      />
      <Route exact path="/empresa/asignacion3" component={EmpresaAsignacion4} />
      <Route
        exact
        path="/empresa/facturacion"
        component={EmpresaFacturacion}
        isAuthenticated={true}
      />
      <Route
        exact
        path="/empresa/resultados"
        component={EmpresaResultados}
        isAuthenticated={true}
      />
    </div>
  );
};

export default EmpresaAsociadaRouter;
