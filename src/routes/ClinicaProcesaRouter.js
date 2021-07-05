import React, { useEffect } from 'react';
import Navbar from '../components/ui/Navbar';
import { Route } from 'react-router';
import Reservas from '../components/procesanmuestra/Reservas';
import CargarResultado from '../components/procesanmuestra/CargarResultado';
import Perfil from '../components/procesanmuestra/Perfil';
import { useHistory } from 'react-router-dom';

const ClinicaProcesaRouter = () => {
  let history = useHistory();

  useEffect(() => {
    history.push('/clinica/procesa/reservas');
  }, [history]);

  return (
    <div>
      <Navbar
        titulo1={'Reservas '}
        url1={'/clinica/procesa/reservas'}
        titulo2={'Cargar resultados'}
        url2={'/clinica/procesa/resultados'}
        titulo3={'Historial'}
        url3={'/clinica/procesa/historial'}
        titulo4={'Perfil'}
        url4={'/clinica/procesa/perfil'}
        titulo5={''}
        url5={''}
        titulo6={''}
        url6={''}
        ruta={'/clinica/procesa/reservas'}
      />

      <Route exact path="/clinica/procesa/reservas" component={Reservas} />

      <Route
        exact
        path="/clinica/procesa/resultados"
        component={CargarResultado}
      />

      <Route exact path="/clinica/procesa/perfil" component={Perfil} />

      <Route exact path="/clinica/procesa/historial" component={Reservas} />
    </div>
  );
};

export default ClinicaProcesaRouter;
