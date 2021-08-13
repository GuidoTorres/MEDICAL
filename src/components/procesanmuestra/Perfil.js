/* eslint-disable */
import React, { useEffect, useState } from "react";
import logo from "../../assets/icons/Isotipo.png";
import { fetchGETPOSTPUTDELETE } from "../../helpers/fetch";
const Perfil = () => {
  const [dataPerfil, setDataPerfil] = useState({});

  const perfil = () => {
    fetchGETPOSTPUTDELETE("auth/me", null, "POST")
      .then((res) => res.json())
      .then((res) => setDataPerfil(res));
  };

  useEffect(() => {
    perfil();
  }, []);

  console.log(dataPerfil);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">
          <div className="barra procesa__perfil">
            <div>
              <label>Razón social: </label>
              <input
                type="text"
                disabled
                placeholder={dataPerfil.commercial_name}
              />
            </div>
            <div>
              <label>RUC: </label>
              <input type="text" disabled placeholder={dataPerfil.ruc} />
            </div>
            <div>
              <label>Dirección: </label>
              <input type="text" disabled placeholder={dataPerfil.direction} />
            </div>
            <div>
              <label>Ubicación: </label>
              <input type="text" disabled placeholder={dataPerfil.reference} />
            </div>
            <div>
              <label>Referencia: </label>
              <input type="text" disabled placeholder={dataPerfil.reference} />
            </div>
            <div>
              <h5>Mi calificación</h5>
              <div className="calificacion">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-6 ">
          <div className="barra">
            <h5>Logo</h5>
            <div className="procesa__perfil-img">
              <img
                src={dataPerfil.logo}
                alt=""
                style={{
                  border: "1xp solid red",
                  maxWidth: "100%",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
