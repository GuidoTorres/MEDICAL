import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { startCkecking } from "../actions/auth";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Error404 from "../pages/Error404";
// import { roles } from '../config/roles';
import AdminRouter from "./AdminRouter";
import AgenteVentasRouter from "./AgenteVentasRouter";
import ClinicaProcesaRouter from "./ClinicaProcesaRouter";
import ClinicaTomaRouter from "./ClinicaTomaRouter";
import EmpresaAsociadaRouter from "./EmpresaAsociadaRouter";
import FacturacionRouter from "./FacturacionRouter";
import LaboratoristaRouter from "./LaboratoristaRouter";
import OrganizadorRouter from "./OrganizadorRouter";

import PrivateRoutes from "./PrivateRoutes";
import RecepcionistaRouter from "./RecepcionistaRouter";

const AppRoute = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startCkecking());
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/registrar">
          <Register />
        </Route>

        {/* RUTAS PRIVADAS */}
        <PrivateRoutes path="/admin" component={AdminRouter} isAuthenticated />
        <PrivateRoutes
          path="/empresa"
          component={EmpresaAsociadaRouter}
          isAuthenticated
          rol
        />
        <PrivateRoutes
          path="/clinica/procesa"
          component={ClinicaProcesaRouter}
          isAuthenticated
          rol
        />
        <PrivateRoutes
          path="/clinica/toma"
          component={ClinicaTomaRouter}
          isAuthenticated
          rol
        />
        <PrivateRoutes
          path="/laboratorio"
          component={LaboratoristaRouter}
          isAuthenticated
          rol
        />
        <PrivateRoutes
          path="/ventas"
          component={AgenteVentasRouter}
          isAuthenticated
          rol
        />
        <PrivateRoutes
          path="/recepcion"
          component={RecepcionistaRouter}
          isAuthenticated
          rol
        />
        <PrivateRoutes
          path="/organizador"
          component={OrganizadorRouter}
          isAuthenticated
          rol
        />

        <PrivateRoutes
          path="/facturacion"
          component={FacturacionRouter}
          isAuthenticated
          rol
        />

        <Route component={Error404} />
      </Switch>
    </Router>
  );
};

export default AppRoute;
