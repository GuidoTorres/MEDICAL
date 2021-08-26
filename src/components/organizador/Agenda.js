import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import { fetchGETPOSTPUTDELETEJSON } from '../../helpers/fetch';
import { messages } from '../../helpers/calendar-spain';

moment.locale('es');

const localizer = momentLocalizer(moment);

const Agenda = () => {
  const [listCalendario, setListCalendario] = useState([]);

  useEffect(() => {
    const listFecha = () => {
      fetchGETPOSTPUTDELETEJSON('timetable')
        .then((data) => data.json())
        .then((datos) => setListCalendario(datos));
    };
    listFecha();
  }, []);

  return (
    <div className='container'>
      <Calendar
        localizer={localizer}
        events={listCalendario}
        startAccessor='start'
        endAccessor='end'
        messages={messages}
        selectable={true}
        defaultView={Views.AGENDA}
      />
    </div>
  );
};

export default Agenda;
