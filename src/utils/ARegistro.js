const columnas = [
  {
    name: 'Item',
    selector: 'id',
    sortable: true,
    style: {
      borderBotton: 'none',
    },
  },
  {
    name: 'Razón social',
    selector: 'razon',
    sortable: true,
    style: {
      borderBotton: 'none',
    },
  },
  {
    name: 'RUC',
    selector: 'ruc',
    sortable: true,
    style: {
      borderBotton: 'none',
    },
  },
  {
    name: 'Responsable',
    selector: 'responsable',
    sortable: true,
    right: true,
    style: {
      borderBotton: 'none',
    },
  },
  {
    name: 'Telefono',
    selector: 'telefono',
    sortable: true,
    right: true,
    style: {
      borderBotton: 'none',
    },
  },
  {
    name: 'Correo',
    selector: 'correo',
    sortable: true,
    right: true,
    style: {
      borderBotton: 'none',
    },
  },
  {
    name: 'Actividad',
    selector: 'actividad',
    sortable: true,
    right: true,
    style: {
      borderBotton: 'none',
    },
  },
  {
    name: 'Editar',
    button: true,
    cell: (e) => (
      <button onClick={() => handleEditar(e)} className="table__tablebutton">
        <i className="fas fa-pencil-alt"></i>
      </button>
    ),
  },
  {
    name: 'Eliminar',
    button: true,
    cell: (e) => (
      <button onClick={() => handleDelete(e)} className="table__tablebutton">
        <i className="far fa-trash-alt"></i>
      </button>
    ),
  },
];
