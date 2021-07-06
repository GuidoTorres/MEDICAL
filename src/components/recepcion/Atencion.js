import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import CodigoBarras from './Modales/CodigoBarras';
import { ratencion } from '../../data/RAtencion';
import { paginacionOpciones } from '../../helpers/tablaOpciones';
import Swal from 'sweetalert2';
import { fetchGETPOSTPUTDELETE } from '../../helpers/fetch';


const Atencion = () => {
  const [busqueda, setBusqueda] = useState('');
  const [listRegistro, setListRegistro] = useState([]);
  const [openModalBar, setOpenModalBar] = useState(false);
  const [dataBarCode, setDataBarCode] = useState({});
  const [attention, setAttention] = useState({})


  const getAttention = () => {
    fetchGETPOSTPUTDELETE('attention')
      .then((data) => data.json())
      .then((datos) => setAttention(datos.data));
  };

  useEffect(()=>{
    getAttention()

  },[])

  console.log(dataBarCode);

  const columnas = [
    {
      name: 'Item',
      selector: 'id',
      sortable: true,
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
    },
    {
      name: 'Nombres y apellidos',
      selector: 'person.name',
      sortable: true,
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
    },
    {
      name: 'Tipo de documento',
      selector: row => row.person.document_type_id === 3 ? "Carné de extranjería" : row.person.document_type_id === 2 ? "Pasaporte" : row.person.document_type_id === 1 ? "DNI" : "" ,
      sortable: true,
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
    },
    {
      name: 'Nº de documento',
      selector: "person.dni" ,
      sortable: true,
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
    },
    {
      name: 'Estado',
      selector: row => row.status === 1 ? "Particular" : "Empresa",
      sortable: true,
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
    },
    {
      name: 'Tipo de prueba',
      selector: 'service.name',
      sortable: true,
      style: {
        color: '#8f9196',
        borderBotton: 'none',
      },
    },
    {
      name: 'Código de barras',
      button: true,
      cell: (e) => (
        <button
          className="table__tablebutton editar"
          onClick={() => openBarcode(e)}
        >
          <i className="fas fa-barcode"></i>
        </button>
      ),
    },
    {
      name: 'Código de barras',
      button: true,
      cell: (e) => (
        <button
          className="table__tablebutton editar"
          onClick={() => generarAtencion(e)}
        >
        <i className="fas fa-angle-right" ></i>
        </button>
      ),
    },
  ];
  


  useEffect(() => {
    const filtrarElemento = () => {
      const search = ratencion.filter((data) => {
        return (
          data.nombre
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLocaleLowerCase()
            .includes(busqueda) ||
          data.dni.toString().includes(busqueda) ||
          data.tipoprueba
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

  const openBarcode = (e) => {
    setDataBarCode(e);
    setOpenModalBar(true);
  };

  const generarAtencion =(e) =>{

    Swal.fire({
      title: '¿Desea Atender al paciente?',
      text: `${e.person.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Atender',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Éxito!', 'Se genero la atención correctamente.', 'success');
      }
    });
  }

  const handleSearch = (e) => {
    setBusqueda(([e.target.name] = e.target.value));
  };
  return (
    <div className="container">
      <div className="row">
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
          </div>

          <DataTable
            columns={columnas}
            data={attention}
            pagination
            paginationComponentOptions={paginacionOpciones}
            fixedHeader
            fixedHeaderScrollHeight="500px"
            noDataComponent={<i className="fas fa-inbox table__icono"></i>}
          />
        </div>
      </div>

      {openModalBar && (
        <CodigoBarras
          openModalBar={openModalBar}
          setOpenModalBar={setOpenModalBar}
          dataBarCode={dataBarCode}
        />
      )}
    </div>
  );
};

export default Atencion;
