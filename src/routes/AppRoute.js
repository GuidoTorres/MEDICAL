import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { startCkecking } from '../actions/auth';
import Login from '../components/auth/Login';
// import Error404 from '../pages/Error404';
import AdminRouter from './AdminRouter';
import AgenteVentasRouter from './AgenteVentasRouter';
import ClinicaProcesaRouter from './ClinicaProcesaRouter';
import ClinicaTomaRouter from './ClinicaTomaRouter';
import EmpresaAsociadaRouter from './EmpresaAsociadaRouter';
import FacturacionRouter from './FacturacionRouter';
import LaboratoristaRouter from './LaboratoristaRouter';
import OrganizadorRouter from './OrganizadorRouter';

import PrivateRoutes from './PrivateRoutes';
// import PublicRoutes from './PublicRoutes';
import RecepcionistaRouter from './RecepcionistaRouter';

const AppRoute = () => {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);
  console.log(role.id);
  useEffect(() => {
    dispatch(startCkecking());
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Switch>
          {/* <PublicRoutes exact path="/" component={Login} isAuthenticated /> */}
          {/* RUTAS PRIVADAS */}
          <PrivateRoutes
            path="/admin"
            component={AdminRouter}
            isAuthenticated
          />
          <PrivateRoutes
            path="/empresa"
            component={EmpresaAsociadaRouter}
            isAuthenticated
          />
          <PrivateRoutes
            path="/clinica/procesa"
            component={ClinicaProcesaRouter}
            isAuthenticated
          />
          <PrivateRoutes
            path="/clinica/toma"
            component={ClinicaTomaRouter}
            isAuthenticated
          />
          <PrivateRoutes
            path="/laboratorio"
            component={LaboratoristaRouter}
            isAuthenticated
          />
          <PrivateRoutes
            path="/ventas"
            component={AgenteVentasRouter}
            isAuthenticated
          />
          <PrivateRoutes
            path="/recepcion"
            component={RecepcionistaRouter}
            isAuthenticated
          />
          <PrivateRoutes
            path="/organizador"
            component={OrganizadorRouter}
            isAuthenticated
          />

          <PrivateRoutes
            path="/facturacion"
            component={FacturacionRouter}
            isAuthenticated
          />

          {/* <Route component={Error404} /> */}
          <Redirect to="/login" />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRoute;
