import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useState } from 'react';
const mapContainerStyle = {
  width: '100%',
  height: '475px',
};

const MultipleMarket = ({ listartUbicacion }) => {
  console.log(listartUbicacion);
  // const [listPosition, setListPosition] = useState([]);
  // listartUbicacion.map((data) => setListPosition(data));
  // console.log(listPosition);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyC14u7ry3uBKIHsEnEql4sA2MaebwNJWI4',
  });

  const position = [
    {
      lat: Number(-12.9755647),
      lng: Number(-74.0037597),
    },
    // {
    //   lat: Number(-12.9755647),
    //   lng: Number(-74.0037597),
    // },
    // {
    //   lat: Number(-12.9755647),
    //   lng: Number(-74.0037597),
    // },
    // {
    //   lat: Number(-12.9755647),
    //   lng: Number(-74.0037597),
    // },
    // {
    //   lat: Number(-12.9755647),
    //   lng: Number(-74.0037597),
    // },
    // {
    //   lat: Number(-12.9755647),
    //   lng: Number(-74.0037597),
    // },
  ];

  return (
    isLoaded && (
      <GoogleMap
        id='transit-example'
        mapContainerStyle={mapContainerStyle}
        zoom={5}
        center={{ lng: -75.5888949, lat: -9.9064654 }}
      >
        <Marker position={position} title='hola' />
      </GoogleMap>
    )
  );
};

export default MultipleMarket;
