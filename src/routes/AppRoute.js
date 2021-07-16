import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import { startCkecking } from "../actions/auth";
import Login from "../components/auth/Login";
// import Error404 from '../pages/Error404';
import AdminRouter from "./AdminRouter";
import AgenteVentasRouter from "./AgenteVentasRouter";
import ClinicaProcesaRouter from "./ClinicaProcesaRouter";
import ClinicaTomaRouter from "./ClinicaTomaRouter";
import EmpresaAsociadaRouter from "./EmpresaAsociadaRouter";
import FacturacionRouter from "./FacturacionRouter";
import LaboratoristaRouter from "./LaboratoristaRouter";
import OrganizadorRouter from "./OrganizadorRouter";

import PrivateRoutes from "./PrivateRoutes";
// import PublicRoutes from './PublicRoutes';
import RecepcionistaRouter from "./RecepcionistaRouter";

const AppRoute = () => {
  const dispatch = useDispatch();

  const { role, checking } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startCkecking());
  }, [dispatch]);

  // if (checking) {
  //   return <p>espere....</p>;
  // }

  return (
    <Router>
      <div>
        <Switch>
          <Route
            exact
            path="/"
            component={Login}
            // isAuthenticated={checking}
          />
          {/* RUTAS PRIVADAS */}
          <Route
            path="/admin"
            component={AdminRouter}
            isAuthenticated={checking}
          />
          <Route
            path="/empresa"
            component={EmpresaAsociadaRouter}
            isAuthenticated={checking}
          />
          <Route
            path="/clinica/procesa"
            component={ClinicaProcesaRouter}
            isAuthenticated={checking}
          />
          <Route
            path="/clinica/toma"
            component={ClinicaTomaRouter}
            isAuthenticated={checking}
          />
          <Route
            path="/laboratorio"
            component={LaboratoristaRouter}
            isAuthenticated={checking}
          />
          <Route
            path="/ventas"
            component={AgenteVentasRouter}
            isAuthenticated={checking}
          />
          <Route
            path="/recepcion"
            component={RecepcionistaRouter}
            isAuthenticated={checking}
          />
          <Route
            path="/organizador"
            component={OrganizadorRouter}
            isAuthenticated={checking}
          />

          <Route
            path="/facturacion"
            component={FacturacionRouter}
            isAuthenticated={checking}
          />

          {/* <Route component={Error404} /> */}
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRoute;
