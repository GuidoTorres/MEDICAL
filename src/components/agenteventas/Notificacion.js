/* eslint-disable */
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';
import { fetchGETPOSTPUTDELETEJSON } from '../../helpers/fetch';
import { paginacionOpciones } from '../../helpers/tablaOpciones';

const Notificacion = () => {
  const [data, setData] = useState([]);

  const getPending = () => {
    fetchGETPOSTPUTDELETEJSON('settlement_pending')
      .then((res) => res.json())
      .then((res) => setData(res.data));
  };

  useEffect(() => {
    getPending();
  }, []);

  const columnas = [
    {
      name: 'Ítem',
      selector: 'id',
      sortable: true,
      grow: 0,
      style: {
        color: '#8f9196',
        borderBotton: 'none',
        width: '100px',
      },
    },
    {
      name: 'Cliente',
      selector: (row) =>
        row.detail[0].attention.person.name
          ? row.detail[0].attention.person.name +
            ' ' +
            row.detail[0].attention.person.pat_lastname
          : '',
      sortable: true,
      grow: 2,
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
    },

    {
      name: 'Nº de documento',
      selector: (row) =>
        row.detail[0].attention.person.dni
          ? row.detail[0].attention.person.dni
          : '',
      sortable: true,
      sortable: true,
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
    },
    {
      name: 'Fecha',
      selector: (row) => (row.date_issue ? row.date_issue : ''),
      sortable: true,
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
    },
    {
      name: 'Sub total',
      selector: (row) => (row.subtotal ? row.subtotal : ''),
      sortable: true,
      sortable: true,
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
    },
    {
      name: 'Impuesto',
      selector: (row) => (row.igv ? row.igv : ''),
      sortable: true,
      sortable: true,
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
    },
    {
      name: 'Total',
      selector: (row) => (row.amount ? row.amount : ''),
      sortable: true,
      sortable: true,
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
    },
    {
      name: 'Estado',
      selector: (row) => (row.id ? 'Pendiente' : ''),
      sortable: true,
      sortable: true,
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
    },
    {
      name: 'Vencimiento',
      selector: (row) => (row.date_update ? row.date_update : ''),
      sortable: true,
      sortable: true,
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
    },
    {
      name: 'Aprobar',
      button: true,
      cell: (e) => (
        <button
          onClick={() => handleAprobar(e)}
          className="table__tablebutton eliminar"
        >
          <i class="fas fa-check"></i>
        </button>
      ),
    },
    {
      name: 'Rechazar',
      button: true,
      cell: (e) => (
        <button
          onClick={() => handleRechazar(e)}
          className="table__tablebutton eliminar"
        >
          <i class="fas fa-times"></i>
        </button>
      ),
    },
  ];

  const handleAprobar = (e) => {
    fetchGETPOSTPUTDELETEJSON(`settlement_approved/${e.id}`, null, 'POST').then(
      (res) => {
        if (res.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Se aprobó correctamente.',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
          }).then((resp) => {
            if (resp.isConfirmed) {
              getPending();
            }
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: '!Ups¡',
            text: 'Algo salió mal.',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Cerrar',
          });
        }
      }
    );
  };

  const handleRechazar = (e) => {
    fetchGETPOSTPUTDELETEJSON(`settlement_reject/${e.id}`, null, 'POST').then(
      (res) => {
        if (res.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Se rechazó la liquidación.',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
          }).then((resp) => {
            if (resp.isConfirmed) {
              getPending();
            }
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: '!Ups¡',
            text: 'Algo salió mal.',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Cerrar',
          });
        }
      }
    );
  };

  console.log(data);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="table-responsive">
          {/* <div className="adminregistro__option">
            <div>
              <input
                type="text"
                placeholder="Buscar"
                name="busqueda"
                // value={busqueda}
                // onChange={handleSearch}
              />
            </div>
          </div> */}

          <DataTable
            columns={columnas}
            data={data}
            pagination
            paginationComponentOptions={paginacionOpciones}
            fixedHeader
            striped
            highlightOnHover
            fixedHeaderScrollHeight="100%"
            noDataComponent={<i className="fas fa-inbox table__icono"></i>}
          />
        </div>
      </div>
    </div>
  );
};

export default Notificacion;
