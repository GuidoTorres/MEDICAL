import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import { useSelector } from 'react-redux';
import moment from 'moment';
import OMHorario from './OMHorario';
import OMPaciente from './OMPaciente';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';
import { fetchGETPOSTPUTDELETEJSON } from '../../helpers/fetch';

moment.locale('es');

const localizer = momentLocalizer(moment);

const Calendario = () => {
  const { selectionId } = useSelector((state) => state.organizador);
  const [MPaciente, setMPaciente] = useState(false);
  const [MHorario, setMHorario] = useState(false);
  const [listRegistro, setListRegistro] = useState([]);
  const [listCalendario, setListCalendario] = useState({});
  // const [eventosList, setEventosList] = useState([]);
  const [nTranspor, setNTranspor] = useState('');

  const { users, address, sample } = selectionId;
  const { person } = users[0];
  const { services } = sample[0];
  const { district } = address;

  const { category, description: descripcionservicio } = services[0];

  const { name: nombredistrito } = district;
  const { dni, name: personanombre, pat_lastname, mom_lastname } = person;
  const { name: nombreservicio } = category;

  // const {events} = eventosList

  useEffect(() => {
    const listaTransportista = () => {
      fetchGETPOSTPUTDELETEJSON('transportistas_asignados')
        .then((data) => data.json())
        .then((resp) => setListRegistro(resp));
    };
    listaTransportista();
  }, []);

  useEffect(() => {
    const listFecha = () => {
      fetchGETPOSTPUTDELETEJSON('timetable')
        .then((data) => data.json())
        .then((datos) => setListCalendario(datos));
    };
    listFecha();
  }, []);

  // setEventosList(listCalendario);
  console.log(listCalendario);

  // console.log(listCalendario);

  // const now = moment().minutes(0).seconds(0).add(1, 'hours');
  // const nowPlus = now.clone().add(1, 'hours');

  const events = listRegistro;
  // console.log(events);
  // 3=> acpetado
  // 2=> falta cancelar

  const handlePacienteUbicacion = () => {
    setMPaciente(true);
  };
  const hanleMHorario = () => {
    setMHorario(true);
  };

  const handleOnChange = (e) => {
    setNTranspor({
      ...nTranspor,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container">
      <div className="row">
        <h3>Horarios disponibles</h3>
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">
          <div className="barra">
            <span>Datos del solicitante</span>
            <div className="organizador__datos">
              <div>
                <div>
                  <label>DNI:</label>
                  <input type="text" name="dni" defaultValue={dni} />
                </div>
                <div>
                  <label>Nombre:</label>
                  <input type="text" name="name" defaultValue={personanombre} />
                </div>
              </div>
              <div>
                <div>
                  <label>A. Paterno:</label>
                  <input
                    type="text"
                    name="pat_lastname"
                    defaultValue={pat_lastname}
                  />
                </div>
                <div>
                  <label>A. Materno:</label>
                  <input
                    type="text"
                    name="mom_lastname"
                    defaultValue={mom_lastname}
                  />
                </div>
              </div>
              <div>
                <div>
                  <label>Distrito:</label>
                  <input
                    type="text"
                    name="distrito"
                    defaultValue={nombredistrito}
                  />
                </div>
                <div>
                  <label>Ubicación:</label>
                  <i
                    className="fas fa-map-marker-alt"
                    onClick={handlePacienteUbicacion}
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">
          <div className="barra">
            <span className="">Detalles del pedido</span>
            <div className="organizador__detalle">
              <div>
                <label>Tipo de servicio:</label>
                <input
                  type="text"
                  name="servico"
                  defaultValue={nombreservicio}
                />
              </div>
              <div>
                <label>Plan de atención:</label>
                <input
                  type="text"
                  name="descripcionservicio"
                  defaultValue={descripcionservicio}
                />
              </div>
              <div>
                <label>Cantidad:</label>
                <input type="text" />
              </div>
            </div>

            <span className="">Datos del transportista</span>
            <div className="organizador__datostransportista">
              <div>
                <label>Transportista</label>
                <select
                  className="form-select"
                  name="transportista"
                  onChange={handleOnChange}
                >
                  <option value="">Seleccionar</option>
                  {listRegistro.map((data, index) => {
                    return (
                      <option key={index} value={data.id}>
                        {data.person.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <label>Distrito</label>
                <input type="text" />
              </div>
              <div>
                <label>Ubicación:</label>
                <i className="fas fa-map-marker-alt"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div className="barra">
            <div>
              <span className="">Material disponible</span>
              <div className="organizador__datostransportistas">
                <div>
                  <label>P. Antigeno(kit):</label>
                  <input type="text" />
                </div>
                <div>
                  <label>P. Electroquimioluminiscencia(kit):</label>
                  <input type="text" />
                </div>
                <div>
                  <label>P. Inmunocromatografía(kit):</label>
                  <input type="text" />
                </div>
                <div>
                  <label>P. RT-PCR en tiempo real(kit):</label>
                  <input type="text" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-12">
          <div className="barra">
            <Calendar
              localizer={localizer}
              events={listRegistro}
              startAccessor="start"
              endAccessor="end"
              // messages={messages}
              // eventPropGetter={eventStyleGetter}
              // components={{
              //   event: CalendarEvent,
              // }}
              // onDoubleClickEvent={onDoubleClick}
              // onSelectEvent={onSelectEvent}
              // onView={onViewChange}
              // view={lastView}
              // onSelectSlot={onSelectSlot}
              // selectable={true}
              // step={170}
              defaultView={Views.AGENDA}
              // formats={formats}
            />
          </div>
        </div>
      </div>
      <div>
        <button className="botones fab" onClick={hanleMHorario}>
          <i className="fas fa-plus"></i>
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
        />
      )}
    </div>
  );
};

export default Calendario;
