import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { fetchGETPOSTPUTDELETE, fetchSinToken } from '../../../helpers/fetch';

const Estadistica = () => {
  const [listLugares, setListLugares] = useState([]);
  const [listSubCategoria, setListSubCategoria] = useState([]);
  const [listDistrito, setListDistrito] = useState([]);
  const [listaDistri, setListaDistri] = useState([]);
  const [lugares, setLugares] = useState({
    departamento: false,
    provincia: false,
    distrito: false,
  });

  const { departamento, provincia, distrito } = lugares;

  const getDepartemento = () => {
    fetchSinToken('departamentos')
      .then((data) => data.json())
      .then((resp) => setListLugares(resp.departments));
  };

  useEffect(() => {
    getDepartemento();
  }, []);

  // console.log(listLugares);
  // console.log(listSubCategoria);

  const handleLugares = (e) => {
    if (
      e.target.name === 'departamento' ||
      e.target.name === 'distrito' ||
      e.target.name === 'provincia'
    ) {
      setLugares({ ...lugares, [e.target.name]: e.target.checked });
    }
  };

  useEffect(() => {
    if (!departamento) {
      document.getElementById('departamento').disabled = true;
    } else {
      document.getElementById('departamento').disabled = false;
    }

    if (!provincia) {
      document.getElementById('provincia').disabled = true;
    } else {
      document.getElementById('provincia').disabled = false;
    }

    if (!distrito) {
      document.getElementById('distrito').disabled = true;
    } else {
      document.getElementById('distrito').disabled = false;
    }
  }, [departamento, provincia, distrito]);

  const handleChangeLugares = (e) => {
    if (e.target.name === 'selectDepartamento') {
      const data = listLugares.filter(
        (item) => item.id === parseInt(e.target.value)
      );
      setListSubCategoria(data);
    }

    if (e.target.name === 'selectProvincia') {
      const data = listDistrito.filter(
        (item) => item.provincia === e.target.value
      );

      setListaDistri(data[0].distritos);
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        <h3 className='titulo'>Estadísticas</h3>
        <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6'>
          <div className='barra'>
            <div className='adminestadistica__tipo'>
              <div>
                <div>
                  <div>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      value={departamento}
                      name='departamento'
                      onChange={handleLugares}
                    />
                    <label>Departamento</label>
                  </div>

                  <select
                    className='form-select'
                    aria-label='Default select example'
                    disabled
                    id='departamento'
                    name='selectDepartamento'
                    onChange={(e) => handleChangeLugares(e)}
                  >
                    <option key={0} value=''>
                      Seleccione
                    </option>
                    {/* {console.log(listLugares)} */}
                    {listLugares.map((data) => {
                      return (
                        <option key={data.id} value={data.name}>
                          {data.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <textarea></textarea>
              </div>
              <div>
                <div>
                  <div>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      value={provincia}
                      name='provincia'
                      onChange={handleLugares}
                    />
                    <label>Provincia</label>
                  </div>

                  <select
                    className='form-select'
                    aria-label='Default select example'
                    id='provincia'
                    name='selectProvincia'
                    onChange={handleChangeLugares}
                    disabled
                  >
                    <option key={0} value=''>
                      Seleccione
                    </option>
                    {}
                    {/* {departments.provinces &&
                      departments.provinces.map((datos, i) =>
                        datos.districts.map((data, i) => (
                          <option key={i} value='1'>
                            {data.name}
                          </option>
                        ))
                      )} */}
                  </select>
                </div>
                <textarea></textarea>
              </div>
              <div>
                <div>
                  <div>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      value={distrito}
                      name='distrito'
                      onChange={handleLugares}
                    />
                    <label>Distrito</label>
                  </div>

                  <select
                    className='form-select'
                    aria-label='Default select example'
                    id='distrito'
                    name='selectDistrito'
                    onChange={(e) => handleChangeLugares(e)}
                    disabled
                  >
                    <option selected>Seleccione</option>
                    {/* {departments.provinces &&
                      departments.provinces.map((datos, i) =>
                        datos.districts.map((data, i) => (
                          <option key={i} value='1'>
                            {data.name}
                          </option>
                        ))
                      )} */}
                  </select>
                </div>
                <textarea></textarea>
              </div>
              <div>
                <div>
                  <div>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      value=''
                      id='flexCheckDefault'
                    />
                    <label>Clínica</label>
                  </div>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option>Seleccionar</option>
                    <option value='1'>One</option>
                    <option value='2'>Two</option>
                    <option value='3'>Three</option>
                  </select>
                </div>
                <textarea></textarea>
              </div>
            </div>
            <div className='adminestadistica__tipo'>
              <div>
                <div>
                  <div>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      value=''
                      id='flexCheckDefault'
                    />
                    <label>Tipo de Prueba</label>
                  </div>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Seleccionar</option>
                  </select>
                </div>
                <textarea></textarea>
              </div>
              <div>
                <div>
                  <div>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      value=''
                      id='flexCheckDefault'
                    />
                    <label>Resultado de prueba</label>
                  </div>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Seleccionar</option>
                    <option value='1'>One</option>
                    <option value='2'>Two</option>
                    <option value='3'>Three</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className='barra'>
            <div className='adminestadistica__fecha'>
              <label>Día</label>
              <div className='adminestadistica__subfecha'>
                <div>
                  <label>Inicio:</label>
                  <input type='number' />
                </div>
                <div>
                  <label>Fin:</label>
                  <input type='number' />
                </div>
              </div>
            </div>
            <div className='adminestadistica__fecha'>
              <label>Mes</label>
              <div className='adminestadistica__subfecha'>
                <div>
                  <label>Inicio:</label>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Seleccionar</option>
                    <option value='1'>One</option>
                    <option value='2'>Two</option>
                    <option value='3'>Three</option>
                  </select>
                </div>
                <div>
                  <label>Fin:</label>
                  <select
                    className='form-select'
                    aria-label='Default select example'
                  >
                    <option selected>Seleccionar</option>
                    <option value='1'>One</option>
                    <option value='2'>Two</option>
                    <option value='3'>Three</option>
                  </select>
                </div>
              </div>
            </div>
            <div className='adminestadistica__fecha'>
              <label>Año</label>
              <div className='adminestadistica__subfecha'>
                <div>
                  <label>Inicio:</label>
                  <input type='number' />
                </div>
                <div>
                  <label>Fin:</label>
                  <input type='number' />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6'>
          <div className='barra'>
            {/* <Bar className='bar' data={data} responsive /> */}
            <button className='botones mt-5 '>Graficar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Estadistica;
