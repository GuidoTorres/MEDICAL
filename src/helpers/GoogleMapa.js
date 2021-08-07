import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
const mapContainerStyle = {
  width: '100%',
  height: '190px',
};

const Mapa = ({ dataMapa, setDataMapa, editar, dataSelected }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyC14u7ry3uBKIHsEnEql4sA2MaebwNJWI4',
  });

  const { map_latitude, map_length } = dataSelected;

  const position = {
    lat: parseInt(map_latitude),
    lng: parseInt(map_length),
  };

  return isLoaded ? (
    <GoogleMap
      id="transit-example"
      mapContainerStyle={mapContainerStyle}
      zoom={12}
      center={position}
    >
      <Marker position={position} />
    </GoogleMap>
  ) : (
    <></>
  );
};

export default Mapa;
