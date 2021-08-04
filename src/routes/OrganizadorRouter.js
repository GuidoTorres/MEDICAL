import { Redirect, Route, Switch } from 'react-router-dom';
import Agenda from '../components/organizador/Agenda';
import Calendario from '../components/organizador/Calendario';
import Perfil from '../components/organizador/Perfil';
import Solicitud from '../components/organizador/Solicitud';
import Transportista from '../components/organizador/Transportista';
import Navbar from '../components/ui/Navbar';

const OrganizadorRouter = () => {
  return (
    <>
      <Navbar
        titulo1={'Solicitudes'}
        url1={'/organizador/solicitud'}
        titulo2={'Agenda'}
        url2={'/organizador/agenda'}
        titulo3={'Transportistas'}
        url3={'/organizador/transportista'}
        titulo4={'Perfil'}
        url4={'/organizador/perfil'}
        titulo5={''}
        url5={''}
        titulo6={''}
        url6={''}
        ruta={'/organizador/solicitud'}
      />
      <div>
        <Switch>
          <Route exact path="/organizador/solicitud" component={Solicitud} />
          <Route
            exact
            path="/organizador/transportista"
            component={Transportista}
          />
          <Route exact path="/organizador/perfil" component={Perfil} />
          <Route exact path="/organizador/calendario" component={Calendario} />
          <Route exact path="/organizador/agenda" component={Agenda} />
          <Redirect to="/organizador/solicitud" />
        </Switch>
      </div>
    </>
  );
};

export default OrganizadorRouter;
