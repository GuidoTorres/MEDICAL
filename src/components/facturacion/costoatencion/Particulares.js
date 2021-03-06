/* eslint-disable */
import React, { useEffect, useState } from 'react';

import DataTable from 'react-data-table-component';
import { fetchGETPOSTPUTDELETE } from '../../../helpers/fetch';
import Swal from 'sweetalert2';

import {
  paginacionOpciones,
  mensajesTablaFacturacion,
} from '../../../helpers/tablaOpciones';
import MParticulares from './MParticulares';
import MEmpresa from './MEmpresa';
import MMParticulares from './MMParticulares';
import MReservasMovil from './MReservasMovil';

const Particulares = () => {
  const [busqueda, setBusqueda] = useState(null);
  const [clearRows, setClearRows] = useState(false);
  const [listRegistro, setListRegistro] = useState([]);
  const [listRegistroEmpresas, setListRegistroEmpresas] = useState([]);
  const [listRegistroMovil, setListRegistroMovil] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModalEmpresa, setOpenModalEmpresa] = useState(false);

  const [dataEmpresa, setDataEmpresa] = useState({});
  const [empresas, setEmpresas] = useState([]);
  const [dataParticular, setDataParticular] = useState({});
  const [dataMovil, setDataMovil] = useState({});
  const [particulares, setParticulares] = useState([]);
  const [movil, setMovil] = useState([]);

  const [openModalLiquidarParticular, setOpenModalLiquidarParticular] =
    useState(false);

  const [openModalMovil, setOpenModalMovil] = useState(false);

  const getEmpresas = () => {
    fetchGETPOSTPUTDELETE('liquidacion/empresas')
      .then((info) => info.json())
      .then((info) => {
        setEmpresas(info);
        setBusqueda(null);
        setBusqueda('');
      });
  };

  const getParticulares = () => {
    fetchGETPOSTPUTDELETE('settlement_particular')
      .then((info) => info.json())
      .then((info) => {
        setParticulares(info.data);
        setBusqueda(null);
        setBusqueda('');
      });
  };

  const getMovil = () => {
    fetchGETPOSTPUTDELETE('liquidacion/pending_reservation')
      .then((info) => info.json())
      .then((info) => {
        setMovil(info);
        setBusqueda(null);
        setBusqueda('');
      });
  };
  console.log(movil);
  useEffect(() => {
    getEmpresas();
    getParticulares();
    getMovil();
  }, []);
  // console.log(movil);

  // console.log(empresas);

  const columnas = [
    {
      name: '??tem',
      selector: (row, index) => (index += 1),
      sortable: true,
      grow: 0,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Nombre',
      selector: (row) => (row.person ? row.person.name : ''),
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Apellido',
      selector: (row) =>
        row.person
          ? row.person.pat_lastname + ' ' + row.person.mom_lastname
          : '',
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'DNI',
      selector: (row) => (row.person ? row.person.dni : ''),
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Fecha',
      selector: (row) => (row.date_attention ? row.date_attention : ''),
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Tipo de servicio',
      selector: (row) => (row.service ? row.service.description : ''),
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Plan de atenci??n',
      selector: (row) => (row.service ? row.service.abbreviation : ''),
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'SubTotal',
      selector: 'subtotal',
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Impuesto',
      selector: 'igv',
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Total',
      selector: (row) => row.amount,
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    // {
    //   name: "Liquidar",
    //   button: true,
    //   cell: (e) => (
    //     <button
    //       onClick={() => handleDetalles(e)}
    //       className="table__tablebutton"
    //     >
    //       <i className="far fa-folder-open"></i>
    //     </button>
    //   ),
    // },
  ];

  const columnasEmpresa = [
    {
      name: 'Item',
      selector: (row, index) => (index += 1),
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Raz??n social',
      selector: 'nombre',
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Ruc',
      selector: 'ruc',
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Cant. atenciones',
      selector: 'cant_atenciones',
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Sub total',
      selector: 'sub_total',
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Impuesto',
      selector: 'igv',
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Total',
      selector: 'total',
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Detalles',
      button: true,
      cell: (e) => (
        <button
          onClick={() => handleDetallesEmpresa(e)}
          className='table__tablebutton'
        >
          <i className='far fa-folder-open'></i>
        </button>
      ),
    },
  ];

  const columnasMovil = [
    {
      name: 'Item',
      selector: (row, index) => (index += 1),
      sortable: true,
      grow: 0,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Nombres y apellidos',
      selector: (row) =>
        row.users &&
        row.users[0] &&
        row.users[0].person &&
        row.users[0].person.name
          ? row.users[0].person.name.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            ) +
            ' ' +
            row.users[0].person.pat_lastname.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            ) +
            ' ' +
            row.users[0].person.mom_lastname.replace(
              /(^\w|\s\w)(\S*)/g,
              (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
            )
          : '',
      sortable: true,
      grow: 2,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'DNI',
      selector: (row) =>
        row.users &&
        row.users[0] &&
        row.users[0].person &&
        row.users[0].person.dni
          ? row.users[0].person.dni
          : '',
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Modalidad',
      selector: (row) =>
        row.modality && row.modality.name ? row.modality.name : '',
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Voucher',
      selector: (row) => (row.voucher_type === 1 ? 'Boleta' : 'Factura'),
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Total',
      selector: (row) => (row.total_cost ? row.total_cost : ''),
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
  ];
  // console.log(listRegistroEmpresas);

  useEffect(() => {
    const filtrarElemento = () => {
      if (busqueda !== '' && busqueda !== null) {
        const search = particulares.filter((data) => {
          return (
            // data.id.toString().includes(busqueda) ||
            (data.person
              ? data.person.name
                  .toString()
                  .toLowerCase()
                  .includes(busqueda.toLowerCase())
              : '') ||
            (data.person
              ? data.person.pat_lastname
                  .toString()
                  .toLowerCase()
                  .includes(busqueda.toLowerCase())
              : '') ||
            (data.person
              ? data.person.mom_lastname
                  .toString()
                  .toLowerCase()
                  .includes(busqueda.toLowerCase())
              : '') ||
            (data.person
              ? data.person.dni.toString().includes(busqueda)
              : '') ||
            (data.date_attention
              ? data.date_attention.toString().includes(busqueda)
              : '') ||
            (data.service
              ? data.service.description
                  .toString()
                  .toLowerCase()
                  .includes(busqueda.toLowerCase())
              : '') ||
            (data.service
              ? data.service.abbreviation
                  .toString()
                  .toLowerCase()
                  .includes(busqueda.toLowerCase())
              : '') ||
            (data.amount ? data.amount.toString().includes(busqueda) : '')
          );
        });
        setListRegistro(search);

        /* Filtro para empresas*/
        const searchEmpresas = empresas.filter((data) => {
          return (
            // data.id.toString().includes(busqueda) ||
            (data.nombre
              ? data.nombre
                  .toString()
                  .toLowerCase()
                  .includes(busqueda.toLowerCase())
              : '') ||
            (data.ruc ? data.ruc.toString().includes(busqueda) : '') ||
            (data.cant_atenciones
              ? data.cant_atenciones.toString().includes(busqueda)
              : '') ||
            (data.sub_total
              ? data.sub_total.toString().includes(busqueda)
              : '') ||
            (data.igv ? data.igv.toString().includes(busqueda) : '') ||
            (data.total ? data.total.toString().includes(busqueda) : '')
          );
        });
        setListRegistroEmpresas(searchEmpresas);

        /* Filtro para filtro para movil*/
        const searchMovil = movil.filter((data) => {
          return (
            // data.id.toString().includes(busqueda) ||
            (data.users &&
            data.users[0] &&
            data.users[0].person &&
            data.users[0].person.name
              ? data.users[0].person.name
                  .toString()
                  .toLowerCase()
                  .includes(busqueda.toLowerCase())
              : '') ||
            (data.users &&
            data.users[0] &&
            data.users[0].person &&
            data.users[0].person.dni
              ? data.users[0].person.dni.toString().includes(busqueda)
              : '') ||
            (data && data.modality && data.modality.name
              ? data.modality.name.toString().toLowerCase().includes(busqueda)
              : '') ||
            (data.sub_total ? data.sub_total.toString().includes(busqueda) : '')
          );
        });
        setListRegistroMovil(searchMovil);
      } else {
        setListRegistro(particulares);
        setListRegistroEmpresas(empresas);
        setListRegistroMovil(movil);
      }
    };

    filtrarElemento();
  }, [busqueda]);

  const handleDetalles = (e) => {
    // setOpenModal(true);
    // console.log(dataParticular);
    if (dataParticular.length > 0) {
      // console.log(dataParticular);
      setOpenModalLiquidarParticular(true);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debe elegir al menos un paciente',
      });
    }
  };

  const handleDetallesMovil = (e) => {
    // setOpenModal(true);
    // console.log(dataParticular);
    if (dataMovil.length > 0) {
      // console.log(dataMovil);
      setOpenModalMovil(true);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Debe elegir al menos un paciente',
      });
    }
  };

  const handleDetallesEmpresa = (e) => {
    setOpenModalEmpresa(true);
    setDataEmpresa(e);
  };

  const handleSearch = (e) => {
    setBusqueda(([e.target.name] = e.target.value));
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='table-responsive'>
          <div className='adminregistro__option'>
            <div>
              <input
                type='text'
                placeholder='Buscar'
                name='busqueda'
                value={busqueda}
                onChange={handleSearch}
              />
            </div>
          </div>

          <div class='accordion' id='accordionExample'>
            <div className='accordion-item'>
              <h2 className='accordion-header' id='headingOne'>
                <button
                  className='accordion-button'
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target='#collapseOne'
                  aria-expanded='true'
                  aria-controls='collapseOne'
                >
                  Particular
                </button>
              </h2>
              <div
                id='collapseOne'
                className='accordion-collapse collapse show'
                aria-labelledby='headingOne'
                data-bs-parent='#accordionExample'
              >
                <button className='botones mt-3 mb-1' onClick={handleDetalles}>
                  Liquidar
                </button>
                <DataTable
                  columns={columnas}
                  data={listRegistro}
                  contextMessage={mensajesTablaFacturacion}
                  pagination
                  clearSelectedRows={clearRows}
                  paginationComponentOptions={paginacionOpciones}
                  fixedHeader
                  fixedHeaderScrollHeight='500px'
                  noDataComponent={
                    <div className='spinner'>
                      <i className='fas fa-inbox table__icono'></i>
                      <p style={{ color: 'grey' }}>No hay datos</p>
                    </div>
                  }
                  selectableRows
                  onSelectedRowsChange={(e) =>
                    setDataParticular(e.selectedRows)
                  }
                  // selectableRows
                />
              </div>
            </div>
            <div className='accordion-item'>
              <h2 className='accordion-header' id='headingTwo'>
                <button
                  className='accordion-button collapsed'
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target='#collapseTwo'
                  aria-expanded='false'
                  aria-controls='collapseTwo'
                >
                  Empresa
                </button>
              </h2>
              <div
                id='collapseTwo'
                className='accordion-collapse collapse'
                aria-labelledby='headingTwo'
                data-bs-parent='#accordionExample'
              >
                <DataTable
                  columns={columnasEmpresa}
                  data={listRegistroEmpresas}
                  pagination
                  paginationComponentOptions={paginacionOpciones}
                  fixedHeader
                  fixedHeaderScrollHeight='500px'
                  noDataComponent={
                    <div className='spinner'>
                      <i className='fas fa-inbox table__icono'></i>
                      <p style={{ color: 'grey' }}>No hay datos</p>
                    </div>
                  }
                  // selectableRows
                />
              </div>
            </div>
            <div className='accordion-item'>
              <h2 class='accordion-header' id='headingThree'>
                <button
                  class='accordion-button collapsed'
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target='#collapseThree'
                  aria-expanded='false'
                  aria-controls='collapseThree'
                >
                  Reservas m??vil
                </button>
              </h2>
              <div
                id='collapseThree'
                class='accordion-collapse collapse'
                aria-labelledby='headingThree'
                data-bs-parent='#accordionExample'
              >
                <button
                  className='botones mt-3 mb-1'
                  onClick={handleDetallesMovil}
                >
                  Liquidar
                </button>
                <DataTable
                  columns={columnasMovil}
                  data={listRegistroMovil}
                  contextMessage={mensajesTablaFacturacion}
                  pagination
                  clearSelectedRows={clearRows}
                  paginationComponentOptions={paginacionOpciones}
                  fixedHeader
                  fixedHeaderScrollHeight='500px'
                  noDataComponent={
                    <div className='spinner'>
                      <i className='fas fa-inbox table__icono'></i>
                      <p style={{ color: 'grey' }}>No hay datos</p>
                    </div>
                  }
                  selectableRows
                  onSelectedRowsChange={(e) => setDataMovil(e.selectedRows)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {openModal && (
        <MParticulares openModal={openModal} setOpenModal={setOpenModal} />
      )}
      {openModalEmpresa && (
        <MEmpresa
          openModalEmpresa={openModalEmpresa}
          setOpenModalEmpresa={setOpenModalEmpresa}
          dataEmpresa={dataEmpresa}
          setBusqueda={setBusqueda}
          getEmpresas={getEmpresas}
        />
      )}
      {openModalLiquidarParticular && (
        <MMParticulares
          openModalLiquidarParticular={openModalLiquidarParticular}
          setOpenModalLiquidarParticular={setOpenModalLiquidarParticular}
          dataParticular={dataParticular}
          setBusqueda={setBusqueda}
          getParticulares={getParticulares}
          setClearRows={setClearRows}
        />
      )}

      {openModalMovil && (
        <MReservasMovil
          openModalMovil={openModalMovil}
          setOpenModalMovil={setOpenModalMovil}
          dataMovil={dataMovil}
          setBusqueda={setBusqueda}
          getMovil={getMovil}
          setClearRows={setClearRows}
        />
      )}
    </div>
  );
};

export default Particulares;
