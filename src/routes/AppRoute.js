import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  useHistory,
} from 'react-router-dom';
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
import PublicRoutes from './PublicRoutes';
import RecepcionistaRouter from './RecepcionistaRouter';

const AppRoute = () => {
  const dispatch = useDispatch();

  const { checking } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startCkecking());
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Switch>
          <Route
            exact
            path="/"
            component={Login}
            // isAuthenticated={!!checking}
          />

          <PrivateRoutes
            path="/admin"
            component={AdminRouter}
            isAuthenticated={checking}
          />
          <PrivateRoutes
            path="/cliente/corporativo"
            component={EmpresaAsociadaRouter}
            isAuthenticated={checking}
          />
          <PrivateRoutes
            path="/clinica/procesa"
            component={ClinicaProcesaRouter}
            isAuthenticated={checking}
          />
          <PrivateRoutes
            path="/clinica/toma"
            component={ClinicaTomaRouter}
            isAuthenticated={checking}
          />
          <PrivateRoutes
            path="/laboratorio"
            component={LaboratoristaRouter}
            isAuthenticated={checking}
          />
          <PrivateRoutes
            path="/ventas"
            component={AgenteVentasRouter}
            isAuthenticated={checking}
          />
          <PrivateRoutes
            path="/recepcion"
            component={RecepcionistaRouter}
            isAuthenticated={checking}
          />
          <PrivateRoutes
            path="/organizador"
            component={OrganizadorRouter}
            isAuthenticated={checking}
          />

          <PrivateRoutes
            path="/facturacion"
            component={FacturacionRouter}
            isAuthenticated={checking}
          />

          {/* <Route component={Error404} /> */}
          {/* <Redirect to="/" /> */}
        </Switch>
      </div>
    </Router>
  );
};

export default memo(AppRoute);
