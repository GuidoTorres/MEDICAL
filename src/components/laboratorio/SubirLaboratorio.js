import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { lasubir } from '../../data/LASubir';
import { paginacionOpciones } from '../../helpers/tablaOpciones';
import MSubirLaboratorio from './MSubirLaboratorio';
import MSubirEclea from './MSubirEclea';
import MSubirRapida from './MSubirRapida';
import { fetchGETPOSTPUTDELETE } from '../../helpers/fetch';
import MAnticuerpos from './Modales/MAnticuerpos';

const SubirLaboratorio = () => {
  const [busqueda, setBusqueda] = useState('');
  const [listRegistro, setListRegistro] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [openModal3, setOpenModal3] = useState(false);
  const [openModal4, setOpenModal4] = useState(false);
  const [openModal5, setOpenModal5] = useState(false);

  const [attention, setAttention] = useState({});
  const [dataSelected, setDataSelected] = useState(null);
  const [tipoPrueba, setTipoPrueba] = useState({});
  const [servicios, setServicios] = useState({});
  const [filterData, setFilterData] = useState({});

  const getAtencion = () => {
    fetchGETPOSTPUTDELETE('result')
      .then((data) => data.json())
      .then((datos) => setAttention(datos.data));
  };

  const getServicios = () => {
    fetchGETPOSTPUTDELETE('services')
      .then((data) => data.json())
      .then((datos) => setServicios(datos.data));
  };

  useEffect(() => {
    getAtencion();
    getServicios();
  }, []);

  const columnas = [
    {
      name: 'Ítem',
      selector: 'id',
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Tipo de usuario',
      selector: (row) =>
        tipoPrueba.prueba === row.service.id
          ? row.people_id === 1
            ? 'Particular'
            : 'Empresa'
          : '',
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Nro de documento',
      selector: (row) =>
        tipoPrueba.prueba === row.service.id
          ? row.person && row.person.dni
            ? row.person.dni
            : ''
          : '',
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Fecha',
      selector: (row) =>
        tipoPrueba.prueba === row.service.id
          ? row.date_creation
            ? row.date_creation
            : ''
          : '',
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Nombres y apellidos',
      selector: (row) =>
        tipoPrueba.prueba === row.service.id
          ? row.person && row.person.name && row.person.pat_lastname
            ? row.person.name + ' ' + row.person.pat_lastname
            : ''
          : '',
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },

    {
      name: 'Acción',
      button: true,
      cell: (e) =>
        tipoPrueba.prueba === e.service.id ? (
          <button
            onClick={() => handleModal(tipoPrueba, e)}
            className="table__tablebutton"
          >
            <i className="fas fa-angle-right"></i>
          </button>
        ) : (
          ''
        ),
    },
  ];

  // useEffect(() => {
  //   const filtrarElemento = () => {
  //     const search = filterData.filter((data) => {
  //       return data.person.dni
  //         .normalize('NFD')
  //         .replace(/[\u0300-\u036f]/g, '')
  //         .toLocaleLowerCase()
  //         .includes(busqueda);
  //     });
  //     setListRegistro(search);
  //   };
  //   filtrarElemento();
  // }, [busqueda, filterData]);

  const handleModal = (tipoPrueba, e) => {
    setDataSelected(e);
    console.log(e);
    if (tipoPrueba.prueba === 5) {
      setOpenModal(true);
    } else if (tipoPrueba.prueba === 6) {
      setOpenModal2(true);
    } else if (tipoPrueba.prueba === 7) {
      setOpenModal3(true);
    } else if (tipoPrueba.prueba === 8) {
      setOpenModal4(true);
    } else if (tipoPrueba.prueba === 9) {
      setOpenModal5(true);
    } else {
      console.log('no funciona');
    }
  };

  const filtrarTabla = () => {
    const result = Object.values(attention).filter(
      (data) => data && data.service && data.service.id === tipoPrueba.prueba
    );

    setFilterData(result);
  };

  useEffect(() => {
    filtrarTabla();
  }, [tipoPrueba]);

  const handleSearch = (e) => {
    setBusqueda(([e.target.name] = e.target.value));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="barra">
            <p>Subir resultados</p>
            <div className="laboratorio__resultados">
              <div>
                <label>Categoría</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) =>
                    setTipoPrueba({ ...tipoPrueba, id: e.target.value })
                  }
                >
                  <option>Seleccione</option>
                  <option value="1">COVID-19</option>
                </select>
              </div>
              <div>
                <label>Sub-Categoría</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  disabled={tipoPrueba.id ? false : true}
                  onChange={(e) =>
                    setTipoPrueba({
                      ...tipoPrueba,
                      prueba: Number(e.target.value),
                    })
                  }
                >
                  <option value="">Seleccione</option>
                  {servicios &&
                    servicios[0] &&
                    servicios[0].services &&
                    servicios[0].services.map((data, i) => (
                      <option key={i} value={data.id}>
                        {data.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
          <div className="table-responsive">
            <div className="adminregistro__option">
              <div>
                <input
                  type="text"
                  placeholder="Buscar"
                  name="busqueda"
                  value={busqueda}
                  onChange={handleSearch}
                />
              </div>
              <div>
                {/* <button className="botones">Cargar resultado</button> */}
              </div>
            </div>

            <DataTable
              columns={columnas}
              data={listRegistro}
              pagination
              paginationComponentOptions={paginacionOpciones}
              fixedHeader
              striped
              highlightOnHover
              fixedHeaderScrollHeight="100%"
              noDataComponent={
                <div className="spinner">
                  <i className="fas fa-inbox table__icono"></i>
                  <p style={{ color: 'lightgrey' }}>No hay datos</p>
                </div>
              }
            />
          </div>
        </div>
        {openModal && (
          <MSubirLaboratorio
            openModal={openModal}
            setOpenModal={setOpenModal}
            dataSelected={dataSelected}
            tipoPrueba={tipoPrueba}
            getAtencion={getAtencion}
          />
        )}
        {openModal2 && (
          <MSubirEclea
            openModal={openModal2}
            setOpenModal={setOpenModal2}
            dataSelected={dataSelected}
            tipoPrueba={tipoPrueba}
            getAtencion={getAtencion}
          />
        )}
        {openModal3 && (
          <MAnticuerpos
            openModal={openModal3}
            setOpenModal={setOpenModal3}
            dataSelected={dataSelected}
            tipoPrueba={tipoPrueba}
            getAtencion={getAtencion}
          />
        )}
        {openModal4 && (
          <MSubirRapida
            openModal={openModal4}
            setOpenModal={setOpenModal4}
            dataSelected={dataSelected}
            tipoPrueba={tipoPrueba}
            getAtencion={getAtencion}
          />
        )}
        {/* {openModal5 && (
          <MSubirEclea
            openModal={openModal4}
            setOpenModal={setOpenModal4}
            dataSelected={dataSelected}
            tipoPrueba={tipoPrueba}
            getAtencion={getAtencion}
          />
        )} */}
      </div>
    </div>
  );
};

export default SubirLaboratorio;
