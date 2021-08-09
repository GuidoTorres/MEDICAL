import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';

import MapaGoogle from '../../helpers/GoogleMapa';
import { customStyles } from '../../helpers/tablaOpciones';

const OMPaciente = ({ setMPaciente, MPaciente }) => {
  const { selectionId } = useSelector((state) => state.organizador);
  const [state, setState] = useState({});
  const { address } = selectionId;
  const { map_latitude, map_length } = address;
  useEffect(() => {
    setState({
      map_latitude,
      map_length,
    });
  }, [map_latitude, map_length]);
  const [dataMapa, setDataMapa] = useState({
    lat: 0,
    lng: 0,
  });
  const closeModal = () => {
    setMPaciente(false);
  };
  return (
    <Modal
      isOpen={MPaciente}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal modal__pacientemap"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
      ariaHideApp={false}
    >
      <div className="omppaciente__modal">
        <h3 className="title__modal">Ubicación del paciente</h3>
        <div style={{ backgroundColor: 'white' }}>
          <MapaGoogle
            dataMapa={dataMapa}
            setDataMapa={setDataMapa}
            style={{ height: '500px' }}
            dataSelected={state}
          />
        </div>
        <button className="botones mt-3">Cerrar</button>
      </div>
    </Modal>
  );
};

export default OMPaciente;
