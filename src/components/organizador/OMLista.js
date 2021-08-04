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
                    // console.log(datos);
                    return (
                      <tr key={index}>
                        {datos.map((data) => {
                          // const servicio = data.services;
                          // console.log(servicio);
                          // return (
                          //   <td key={index}>{servicio.category[0].name}</td>
                          // );
                          // return servicio.map((datas) => {
                          //   return <td key={index}>{datas.category.name}</td>;
                          // });
                        })}
                        {datos.map((data) => {
                          const servicio = data.services;
                          return servicio.map((datas) => {
                            return <td key={index}>{datas.name}</td>;
                          });
                        })}
                        {datos.map((data) => {
                          return <td key={index}>{data.cantidad}</td>;
                        })}{' '}
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
