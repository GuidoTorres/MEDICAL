import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
// import { useCallback, useEffect } from 'react';
// import { memo, useState } from 'react';
const mapContainerStyle = {
  width: '100%',
  height: '475px',
};

const MultipleMarket = ({ listartUbicacion }) => {
  console.log(listartUbicacion);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyC14u7ry3uBKIHsEnEql4sA2MaebwNJWI4',
  });

  return (
    isLoaded && (
      <GoogleMap
        id='transit-example'
        mapContainerStyle={mapContainerStyle}
        zoom={5}
        center={{ lng: -75.5888949, lat: -9.9064654 }}
      >
        <Marker position={listartUbicacion} />
      </GoogleMap>
    )
  );

  // row.corporation ? row.corporation.commercial_name : '',
};

export default MultipleMarket;
