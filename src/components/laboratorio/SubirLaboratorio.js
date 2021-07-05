import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { lasubir } from '../../data/LASubir';
import { paginacionOpciones } from '../../helpers/tablaOpciones';
import MSubirLaboratorio from './MSubirLaboratorio';

const SubirLaboratorio = () => {
  const [busqueda, setBusqueda] = useState('');
  const [listRegistro, setListRegistro] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const columnas = [
    {
      name: 'Item',
      selector: 'id',
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Tipo de usuario',
      selector: 'tipo',
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'DNI',
      selector: 'dni',
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Fecha',
      selector: 'fecha',
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Nombre',
      selector: 'nombre',
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Apellido',
      selector: 'apellido',
      sortable: true,
      style: {
        borderBotton: 'none',
        color: '#555555',
      },
    },
    {
      name: 'Acción',
      button: true,
      cell: (e) => (
        <button
          onClick={() => handleDetalles(e)}
          className="table__tablebutton"
        >
          <i class="fas fa-angle-right"></i>
        </button>
      ),
    },
  ];

  useEffect(() => {
    const filtrarElemento = () => {
      const search = lasubir.filter((data) => {
        return (
          data.tipo
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLocaleLowerCase()
            .includes(busqueda) ||
          data.dni.toString().includes(busqueda) ||
          data.fecha
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLocaleLowerCase()
            .includes(busqueda) ||
          data.nombre
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLocaleLowerCase()
            .includes(busqueda) ||
          data.apellido
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLocaleLowerCase()
            .includes(busqueda)
        );
      });
      setListRegistro(search);
    };
    filtrarElemento();
  }, [busqueda]);
  //
  const handleDetalles = (e) => {
    // console.log(e);
    setOpenModal(true);
  };

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
                <select class="form-select" aria-label="Default select example">
                  <option value="1">COVID</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div>
                <label>Sub-Categoría</label>
                <select class="form-select" aria-label="Default select example">
                  <option value="1">Antigeno</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
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
                <button className="botones">Cargar resultado</button>
              </div>
            </div>

            <DataTable
              columns={columnas}
              data={listRegistro}
              pagination
              paginationComponentOptions={paginacionOpciones}
              fixedHeader
              fixedHeaderScrollHeight="500px"
              noDataComponent={<i className="fas fa-inbox table__icono"></i>}
            />
          </div>
        </div>
        {openModal && (
          <MSubirLaboratorio
            openModal={openModal}
            setOpenModal={setOpenModal}
          />
        )}
      </div>
    </div>
  );
};

export default SubirLaboratorio;
