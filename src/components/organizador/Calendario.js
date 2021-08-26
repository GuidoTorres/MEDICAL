import React, { useCallback, useEffect, useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import { useSelector } from 'react-redux';
import moment from 'moment';
import OMHorario from './OMHorario';
import OMPaciente from './OMPaciente';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import { fetchGETPOSTPUTDELETEJSON } from '../../helpers/fetch';
import { messages } from '../../helpers/calendar-spain';
import Mapa from '../../helpers/MultipleMarket';

moment.locale('es');

const localizer = momentLocalizer(moment);

const Calendario = () => {
  const { selectionId } = useSelector((state) => state.organizador);

  const [MPaciente, setMPaciente] = useState(false);
  const [MHorario, setMHorario] = useState(false);
  const [listRegistro, setListRegistro] = useState([]);
  const [listCalendario, setListCalendario] = useState([]);
  // const [eventosList, setEventosList] = useState([]);

  const [listaMateriales, setListaMateriales] = useState([]);
  const [listartUbicacion, setListartUbicacion] = useState([]);
  const [dataMapa, setDataMapa] = useState({
    lat: 0,
    lng: 0,
  });

  const [nTranspor, setNTranspor] = useState('');
  const [cambioEstado, setCambioEstado] = useState(null);
  const [condicional, setCondicional] = useState(false);
  const { users, address, sample } = selectionId;
  const { person } = users[0];
  const { services } = sample[0];
  const { district } = address;

  const { category, description: descripcionservicio } = services[0];

  const { name: nombredistrito } = district;
  const { dni, name: personanombre, pat_lastname, mom_lastname } = person;
  const { name: nombreservicio } = category;

  const listaTransportista = () => {
    fetchGETPOSTPUTDELETEJSON('transportistas_asignados')
      .then((data) => data.json())
      .then((resp) => setListRegistro(resp));
  };
  useEffect(() => {
    listaTransportista();
  }, []);

  const ubicacion = useCallback(() => {
    fetchGETPOSTPUTDELETEJSON('transportista/ubicaciones')
      .then((data) => data.json())
      .then((resp) => setListartUbicacion(resp.ubicaciones));
  }, []);
  useEffect(() => {
    ubicacion();
  }, []);

  const listFecha = (data) => {
    fetchGETPOSTPUTDELETEJSON('timetable_transportistas/' + data)
      .then((data) => data.json())
      .then((datos) => setListCalendario(datos));
  };

  const handlePacienteUbicacion = () => {
    setMPaciente(true);
  };
  const hanleMHorario = () => {
    setMHorario(true);
  };

  const materiales = (data) => {
    fetchGETPOSTPUTDELETEJSON(`transportista/${data}/pruebas-asignadas`)
      .then((data) => data.json())
      .then((resp) => setListaMateriales(resp));
  };

  const getCalendario = (e) => {
    //   const datos = listRegistro.filter((item) => item.id === parseInt(e));
    setCondicional(true);
    //   // setEventosList(datos[0].reservaciones_asignadas);
  };

  const handleOnChange = (e) => {
    setNTranspor({
      ...nTranspor,
      [e.target.name]: e.target.value,
    });
    if (parseInt(e.target.value) !== 0) {
      materiales(e.target.value);
      getCalendario(e.target.value);
      listFecha(e.target.value);
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        <h3>Horarios disponibles</h3>
        <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6'>
          <div className='barra'>
            <span>Datos del solicitante</span>
            <div className='organizador__datos'>
              <div>
                <div>
                  <label>DNI:</label>
                  <input type='text' name='dni' defaultValue={dni} />
                </div>
                <div>
                  <label>Nombre:</label>
                  <input type='text' name='name' defaultValue={personanombre} />
                </div>
              </div>
              <div>
                <div>
                  <label>A. Paterno:</label>
                  <input
                    type='text'
                    name='pat_lastname'
                    defaultValue={pat_lastname}
                  />
                </div>
                <div>
                  <label>A. Materno:</label>
                  <input
                    type='text'
                    name='mom_lastname'
                    defaultValue={mom_lastname}
                  />
                </div>
              </div>
              <div>
                <div>
                  <label>Distrito:</label>
                  <input
                    type='text'
                    name='distrito'
                    defaultValue={nombredistrito}
                  />
                </div>
                <div>
                  <label>Ubicación:</label>
                  <i
                    className='fas fa-map-marker-alt'
                    style={{ color: '#009DCA' }}
                    onClick={handlePacienteUbicacion}
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6'>
          <div className='barra'>
            <span className=''>Detalles del pedido</span>
            <div className='organizador__detalle'>
              <div>
                <label>Tipo de servicio:</label>
                <input
                  type='text'
                  name='servico'
                  defaultValue={nombreservicio}
                />
              </div>
              <div>
                <label>Plan de atención:</label>
                <input
                  type='text'
                  name='descripcionservicio'
                  defaultValue={descripcionservicio}
                />
              </div>
              <div>
                <label>Cantidad:</label>
                <input type='text' />
              </div>
            </div>
            <span className=''>Datos del transportista</span>
            <div className='organizador__datostransportista'>
              <div>
                <label>Transportista</label>
                <select
                  className='form-select'
                  name='transportista'
                  onChange={handleOnChange}
                >
                  <option value='0'>Seleccionar</option>
                  {listRegistro.map((data, index) => {
                    return (
                      <option key={index} value={data.id}>
                        {data.person.name} {data.person.pat_lastname}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
          <div className='barra'>
            <Mapa
              dataMapa={dataMapa}
              setDataMapa={setDataMapa}
              listartUbicacion={listartUbicacion}
            />
          </div>
        </div>

        <div className='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>
          <div className='barra'>
            <div className='accordion' id='accordionExample'>
              <div className='accordion-item'>
                <h2 className='accordion-header' id='headingOne'>
                  <button
                    className='accordion-button'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#collapseOne'
                    aria-expanded='true'
                    aria-controls='collapseOne'
                  >
                    Material disponibles
                  </button>
                </h2>
                <div
                  id='collapseOne'
                  className='accordion-collapse collapse show'
                  aria-labelledby='headingOne'
                  data-bs-parent='#accordionExample'
                >
                  <div className='accordion-body'>
                    <table className='table'>
                      <thead>
                        <tr>
                          <th scope='col'>Material</th>
                          <th scope='col'>Cantidad</th>
                        </tr>
                      </thead>
                      <tbody>
                        {listaMateriales.map((data, index) => {
                          const { servicio } = data;
                          return (
                            <tr key={index}>
                              <td>{servicio.description}</td>
                              <td>{data.cantidad}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row mt-3'>
        <div className='col-12'>
          <div className='barra'>
            {condicional && (
              <Calendar
                localizer={localizer}
                events={listCalendario}
                startAccessor='start'
                endAccessor='end'
                messages={messages}
                selectable={true}
                defaultView={Views.AGENDA}
              />
            )}
          </div>
        </div>
      </div>
      <div>
        <button className='botones fab' onClick={hanleMHorario}>
          <i className='fas fa-plus'></i>
        </button>
      </div>
      {MPaciente && (
        <OMPaciente MPaciente={MPaciente} setMPaciente={setMPaciente} />
      )}
      {MHorario && (
        <OMHorario
          MHorario={MHorario}
          setMHorario={setMHorario}
          nTranspor={nTranspor}
          // setCambioEstado={setCambioEstado}
        />
      )}
    </div>
  );
};

export default Calendario;
