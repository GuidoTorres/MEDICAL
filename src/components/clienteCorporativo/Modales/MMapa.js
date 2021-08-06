import React, { useState } from 'react';
import Modal from 'react-modal';
import MapaGoogle from '../../../helpers/GoogleMapa';

import { customStyles } from '../../../helpers/tablaOpciones';

const MMapa = ({ setModalMapa, modalMapa, llmapa }) => {
  const [dataMapa, setDataMapa] = useState({
    lat: 0,
    lng: 0,
  });
  const closeModal = () => {
    setModalMapa(false);
  };

  return (
    <>
      <Modal
        isOpen={modalMapa}
        onRequestClose={closeModal}
        style={customStyles}
        className="modal modal-localizacion"
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
        preventScroll={true}
        ariaHideApp={false}
      >
        <h3 className="title__modal">Ubicación</h3>
        {/* <div className="container"> */}
        {/* <div className="row"> */}
        <div style={{ backgroundColor: 'orange' }}>
          <MapaGoogle
            dataMapa={dataMapa}
            setDataMapa={setDataMapa}
            style={{ height: '500px' }}
            dataSelected={llmapa}
          />
          {/* </div> */}
          {/* </div> */}
        </div>
      </Modal>
    </>
  );
};

export default MMapa;
