import React from 'react';

const EventosCalendario = ({ event }) => {
  const customClass = `rbc-event--${event.type}`;
  return (
    <div className={`${customClass} colores`}>
      <p>hola mundo</p>
    </div>
  );
};

export default EventosCalendario;
