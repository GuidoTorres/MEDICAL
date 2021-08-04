import React, { useEffect } from 'react';
import { useState } from 'react';
import Modal from 'react-modal';
import { customStyles } from '../../helpers/tablaOpciones';

const OMLista = ({ modalList, setModalList, listRegistro }) => {
  const datos = listRegistro.sample;
  const [lista, setLista] = useState([]);
  const closeModal = () => {
    setModalList(false);
  };

  useEffect(() => {
    setLista([datos]);
  }, [datos]);

  return (
    <Modal
      isOpen={modalList}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal organizador__modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
      ariaHideApp={false}
    >
      <div className="container">
        <h3 className="title__modal">Servicios</h3>
        <div className="row">
          <div className="col-12">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Tipo servicio</th>
                    <th scope="col">Plan de atenciones</th>
                    <th scope="col">Nº Atenciones</th>
                  </tr>
                </thead>
                <tbody>
                  {lista.map((datos, index) => {
                    return (
                      <tr key={index}>
                        <td>hola</td>
                        <td>
                          {datos.map((data, index) => {
                            const servicio = data.services;
                            return servicio.map((datas) => {
                              return <tr key={index}>{datas.name}</tr>;
                            });
                          })}
                        </td>
                        <td>
                          {datos.map((data, index) => {
                            console.log(data);
                            return <tr key={index}>{data.cantidad}</tr>;
                          })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="list-botones">
            <button className="botones" onClick={closeModal}>
              cancelar
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default OMLista;
