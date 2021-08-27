import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '475px',
};

const MultipleMarket = ({ listartUbicacion }) => {
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
        zoomControl={true}
      >
        {listartUbicacion.map((data) => {
          console.log(data);
          return (
            <Marker
              key={data.id}
              position={{
                lat: Number(data.latitud),
                lng: Number(data.longitud),
              }}
            />
          );
        })}
        {listartUbicacion.map((data) => {
          return (
            <InfoWindow
              position={{
                lat: Number(data.latitud),
                lng: Number(data.longitud),
              }}
            >
              <p>
                {data.user.person.name} {data.user.person.pat_lastname}
              </p>
            </InfoWindow>
          );
        })}
      </GoogleMap>
    )
  );
};

export default MultipleMarket;
