/* eslint-disable */
import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "390px",
};

const Mapa = ({ dataMapa, setDataMapa, editar }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyC14u7ry3uBKIHsEnEql4sA2MaebwNJWI4",
  });

  

  const position = {
    lat: dataMapa.lat !== "0" ? Number(dataMapa.lat) : -12.04318,
    lng: dataMapa.lng !== "0" ? Number(dataMapa.lng) : -77.02824,
  };

  return isLoaded ? (
    <GoogleMap
      id="transit-example"
      mapContainerStyle={mapContainerStyle}
      zoom={14}
      center={position}
      onClick={(e) =>
        setDataMapa({ ...dataMapa, lat: e.latLng.lat(), lng: e.latLng.lng() })
      }
    >
      {editar ? <Marker position={position} /> : <Marker position={position} />}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default Mapa;
