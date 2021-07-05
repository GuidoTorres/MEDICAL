import React, { useState } from 'react';
import Modal from 'react-modal';
// import { useBarcode } from '@createnextapp/react-barcode';

import { customStyles } from '../../helpers/tablaOpciones';
import codigo from '../../assets/img/codigo.png';
// import { Link } from 'react-router-dom';

const MReserva = ({ openModal, setOpenModal }) => {
  //   const [barcode, setBarcode] = useState('lintangwisesa');
  //   const handleChange = (event) => {
  //     setBarcode(event.target.value ? event.target.value : '');
  //   };
  //   const { inputRef } = useBarcode({
  //     value: barcode,
  //     options: {
  //       background: '#ffffff',
  //     },
  //   });
  //   const downloadBarcode = () => {
  //     const canvas = document.getElementById('mybarcode');
  //     const pngUrl = canvas
  //       .toDataURL('image/png')
  //       .replace('image/png', 'image/octet-stream');
  //     let downloadLink = document.createElement('a');
  //     downloadLink.href = pngUrl;
  //     downloadLink.download = 'mybarcode.png';
  //     document.body.appendChild(downloadLink);
  //     downloadLink.click();
  //     document.body.removeChild(downloadLink);
  //   };
  const closeModal = () => {
    setOpenModal(false);
  };
  return (
    <Modal
      isOpen={openModal}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal modal__barcode"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
      preventScroll={true}
      ariaHideApp={false}
    >
      <h3 className="title__modal">Código de barra</h3>
      <div className="container">
        <div className="row">
          <div className="col-12 mprocesan__codigobarra">
            <div>
              <img src={codigo} alt="" />
            </div>
            <button className="botones">Descargar</button>
          </div>
        </div>
      </div>
      {/* <div className="container">
        <div className="row">
          <div>
            <Link to="/">
              <button style={{ marginRight: 10 }} color="secondary"></button>
            </Link>
            <span>Barcode Generator</span>

            <div style={{ marginTop: 30, marginBottom: 30 }}>
              <input
                onChange={handleChange}
                style={{ width: 320 }}
                value={barcode}
                label="Barcode content"
                size="large"
                variant="outlined"
                color="secondary"
              />
            </div>

            <div>
              {barcode !== '' ? (
                <canvas id="mybarcode" ref={inputRef} />
              ) : (
                <p>No barcode preview</p>
              )}
            </div>
            <div>
              {barcode ? (
                <div container style={{ marginTop: 30 }}>
                  <div item xs={10}>
                    <input
                      style={{ fontSize: 18, width: 250, height: 100 }}
                      rowsMax={4}
                      defaultValue={barcode}
                      value={barcode}
                    />
                  </div>
                  <div item xs={2}>
                    <button
                      onClick={downloadBarcode}
                      style={{ marginLeft: 10 }}
                      color="secondary"
                    >
                      asdfsadf
                    </button>
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div> */}
    </Modal>
  );
};

export default MReserva;
