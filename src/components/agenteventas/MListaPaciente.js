/* eslint-disable */
import React, { useEffect, useState } from "react";
import Modal from "react-modal";

import { fetchGETPOSTPUTDELETEJSON } from "../../helpers/fetch";

import { customStyles } from "../../helpers/tablaOpciones";

const MListaPaciente = ({
  dataSelected,
  listapacientes,
  setListaPacientes,
  id,
}) => {
  const [paciente, setPaciente] = useState({});
  const closeModal = () => {
    setListaPacientes(false);
  };

  const getPacientes = () => {
    const data = {
      compania: dataSelected.id,
    };

    fetchGETPOSTPUTDELETEJSON("compania/pacientes", data, "POST")
      .then((res) => res.json())
      .then((res) => setPaciente(res));
  };

  useEffect(() => {
    getPacientes();
  }, []);
  console.log(paciente);
  return (
    <Modal
      isOpen={listapacientes}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal mlista_paciente"
      closeTimeoutMS={200}
      preventScroll={true}
      overlayClassName="modal-fondo"
      ariaHideApp={false}
    >
      <h3 className="title__modal">Listado de pacientes</h3>
      <div className="row">
        <div className="col-12">
          <div className="table-responsive ">
            <label>
              <strong>Cantidad de atenciones:</strong> {paciente.length}
            </label>
            <table className="table mt-2">
              <thead>
                <tr>
                  <th scope="col">Ítem</th>
                  <th scope="col">Nombres y apellidos</th>
                  <th scope="col">Nº de documento</th>
                  <th scope="col">Servicio</th>
                  <th scope="col">Fecha de atención</th>
                </tr>
              </thead>
              <tbody>
                {paciente.length > 0 &&
                  paciente.map((item, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>
                        {item.person.name} {item.person.pat_lastname}{" "}
                        {item.person.mom_lastname}
                      </td>
                      <td>{item.person.dni}</td>
                      <td>{item.service.abbreviation}</td>
                      <td>{item.date_attention}</td>

                      {/* <td>{item.attentions.service.abbreviation}</td> */}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MListaPaciente;
