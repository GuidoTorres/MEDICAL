import React, { useEffect } from 'react';
import { Route } from 'react-router';
import Calendario from '../components/organizador/Calendario';
import Perfil from '../components/organizador/Perfil';
import Solicitud from '../components/organizador/Solicitud';
import Transportista from '../components/organizador/Transportista';
import Navbar from '../components/ui/Navbar';
import { useHistory } from 'react-router-dom';

const OrganizadorRouter = () => {
  let history = useHistory();

  useEffect(() => {
    history.push('/organizador/solicitud');
  }, [history]);

  return (
    <div>
      <Navbar
        titulo1={'Solicitudes'}
        url1={'/organizador/solicitud'}
        titulo2={'Transportistas'}
        url2={'/organizador/transportista'}
        titulo3={'Perfil'}
        url3={'/organizador/perfil'}
        titulo4={''}
        url4={''}
        titulo5={''}
        url5={''}
        titulo6={''}
        url6={''}
        ruta={'/organizador/solicitud'}
      />

      <Route exact path="/organizador/solicitud" component={Solicitud} />
      <Route
        exact
        path="/organizador/transportista"
        component={Transportista}
      />
      <Route exact path="/organizador/perfil" component={Perfil} />
      <Route exact path="/organizador/calendario" component={Calendario} />
    </div>
  );
};

export default OrganizadorRouter;
