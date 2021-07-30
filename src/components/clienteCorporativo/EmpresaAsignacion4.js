import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import Modal from 'react-modal';
import { customStyles, paginacionOpciones } from '../../helpers/tablaOpciones';
import EmpresaAsignacion2 from './EmpresaAsignacion2';

const EmpresaAsignacion4 = ({
  setModaesCorporativo,
  modaesCorporativo,
  data,
}) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function closeModal() {
    setModaesCorporativo(false);
  }

  const columnas = [
    {
      name: 'Tipo de documento',
      selector: (row) =>
        row.person && row.person.document_type_id === 3
          ? 'Carné de extranjería'
          : row.person && row.person.document_type_id === 2
          ? 'Pasaporte'
          : row.person && row.person.document_type_id === 1
          ? 'DNI'
          : '',

      sortable: true,
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
    },
    {
      name: 'Nº de documento',
      selector: (row) => (row.person && row.person.dni ? row.person.dni : ''),
      sortable: true,
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
    },
    {
      name: 'Nombres',
      selector: (row) => (row.person && row.person.name ? row.person.name : ''),
      sortable: true,
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
    },
    {
      name: 'A. Paterno',
      selector: (row) =>
        row.person && row.person.pat_lastname ? row.person.pat_lastname : '',
      sortable: true,
      grow: 2,
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
    },
    {
      name: 'A. Materno',
      selector: (row) =>
        row.person && row.person.mom_lastname ? row.person.mom_lastname : '',
      sortable: true,
      grow: 2,
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
    },
    {
      name: 'Sexo',
      selector: (row) =>
        row.person && row.person.gender_id === 1 ? 'Masculino' : 'Femenino',
      sortable: true,
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
    },
    {
      name: 'Fecha de Nacimiento',
      selector: (row) =>
        row.fecha_nacimiento && row.fecha_nacimiento
          ? row.fecha_nacimiento
          : '',
      sortable: true,
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
    },
    {
      name: 'Cargo',
      selector: (row) =>
        row.person && row.person.workstation ? row.person.workstation : '',
      sortable: true,
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
    },
  ];
  const asignacion = () => {
    setIsOpen(!modalIsOpen);
  };
  return (
    <Modal
      isOpen={modaesCorporativo}
      onRequestClose={closeModal}
      style={customStyles}
      className="modal modal__corporativoxd"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
      preventScroll={true}
      ariaHideApp={false}
      scrollHeight
    >
      <h3 className="title__modal">Usuarios seleccionados</h3>
      <div className="container">
        <div className="row mt-3">
          <div className="col-12">
            <DataTable
              className="dataTable"
              id="table"
              columns={columnas}
              data={data}
              pagination
              paginationComponentOptions={paginacionOpciones}
              fixedHeader
              fixedHeaderScrollHeight="100%"
              noDataComponent={<i className="fas fa-inbox table__icono"></i>}
              striped
              highlightOnHover
            />
          </div>
          <div className="list-botones">
            <button className="botones" onClick={closeModal}>
              Cancelar
            </button>
            <button className="botones" onClick={asignacion}>
              Siguiente
            </button>
          </div>
        </div>
      </div>
      {modalIsOpen && (
        <EmpresaAsignacion2
          modalIsOpen={modalIsOpen}
          setIsOpen={setIsOpen}
          data={data}
          modal1={closeModal}
        />
      )}
    </Modal>
  );
};

export default EmpresaAsignacion4;
