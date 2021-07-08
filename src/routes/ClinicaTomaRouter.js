import React from 'react';
import Navbar from '../components/ui/Navbar';
import { Route, Switch } from 'react-router';
import Reservas from '../components/tomanmuestra/Reservas';
import Historial from '../components/tomanmuestra/Historial';
import Perfil from '../components/tomanmuestra/Perfil';
// import { useHistory } from 'react-router-dom';

const ClinicaTomaRouter = () => {
  // let history = useHistory();

  // useEffect(() => {
  //   history.push('/clinica/toma/reservas');
  // }, [history]);

  return (
    <div>
      <Navbar
        titulo1={'Reservas'}
        url1={'/clinica/toma/reservas'}
        titulo2={'Historial'}
        url2={'/clinica/toma/historial'}
        titulo3={'Perfil'}
        url3={'/clinica/toma/perfil'}
        titulo4={''}
        url4={''}
        titulo5={''}
        url5={''}
        titulo6={''}
        url6={''}
        ruta={'/clinica/toma/reservas'}
      />
      <Switch>
        <Route
          exact
          path="/clinica/toma/reservas"
          component={Reservas}
          isAuthenticated={true}
        />

        <Route
          exact
          path="/clinica/toma/historial"
          component={Historial}
          isAuthenticated={true}
        />
        <Route exact path="/clinica/toma/perfil" component={Perfil} />
      </Switch>
    </div>
  );
};

export default ClinicaTomaRouter;
