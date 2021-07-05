import React, { useEffect } from 'react';
import { Route } from 'react-router';
import Estadistica from '../components/recepcion/Estadisticas';
import Historial from '../components/recepcion/Historial';
import Atencion from '../components/recepcion/Atencion';
// import CrearPaciente from '../components/recepcion/MCrearPaciente';
import GenerarAtencion from '../components/recepcion/GenerarAtencion';
import Usuarios from '../components/recepcion/Usuarios';
import Navbar from '../components/ui/Navbar';
import { useHistory } from 'react-router-dom';

const RecepcionistaRouter = () => {
  let history = useHistory();

  useEffect(() => {
    history.push('/recepcion/usuarios');
  }, [history]);

  return (
    <div>
      <Navbar
        titulo1={'Usuarios'}
        url1={'/recepcion/usuarios'}
        titulo2={'Atención'}
        url2={'/recepcion/atencion'}
        titulo3={'Historial'}
        url3={'/recepcion/historial'}
        titulo4={'Estadisticas'}
        url4={'/recepcion/estadisticas'}
        titulo5={''}
        url5={''}
        titulo6={''}
        url6={''}
        ruta={'/recepcion/usuarios'}
      />

      <Route
        exact
        path="/recepcion/usuarios"
        component={Usuarios}
        data={true}
      />

      {/* <Route
        exact
        path="/recepcion/usuarios/crear"
        component={CrearPaciente}
        data={true}
      /> */}
      <Route
        exact
        path="/recepcion/atencion"
        component={Atencion}
        data={true}
      />

      <Route
        exact
        path="/recepcion/historial"
        component={Historial}
        data={true}
      />

      <Route
        exact
        path="/recepcion/estadisticas"
        component={Estadistica}
        data={true}
      />

      <Route
        exact
        path="/recepcion/generar/atencion"
        component={GenerarAtencion}
        data={true}
      />
    </div>
  );
};

export default RecepcionistaRouter;
