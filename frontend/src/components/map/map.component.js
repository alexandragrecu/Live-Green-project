import React, { useState, useContext, useEffect } from 'react';
import {
  GoogleMap,
  Marker,
  withScriptjs,
  withGoogleMap,
} from 'react-google-maps';

// context
import { AppContext } from './../../context/appContext';

import bin from './../../assets/images/bin2.png';

const google = window.google;

const places = [
  { name: 'Recycling center 1', lat: 44.419093, lng: 26.1164803 },
  { name: 'Recycling center 2', lat: 44.42178, lng: 26.0480873 },
  { name: 'Recycling center 3', lat: 44.42178, lng: 26.0480873 },
  { name: 'Recycling center 4', lat: 44.405702, lng: 26.1448923 },
  { name: 'Recycling center 5', lat: 44.37504, lng: 26.1471993 },
];

const Map = ({ anchor, scaledSize, zoom }) => {
  const { center } = useContext(AppContext);

  const [zoomIn, setZoomIn] = useState(zoom);
  const getZoom = (z) => {
    setZoomIn(z);
  };
  useEffect(() => {
    if (center[0] !== 44.4372808 && center[1] !== 26.1000002) {
      getZoom(14);
    }
  }, [center]);

  const [selectedCenter, setSelectedCenter] = useState(null);
  console.log(selectedCenter);
  const icon = {
    url: bin,
    scaledSize: new google.maps.Size(scaledSize[0], scaledSize[1]),
    anchor: new google.maps.Point(anchor[0], anchor[1]),
  };

  return (
    <React.Fragment>
      <GoogleMap
        key={1}
        zoom={zoomIn}
        center={{ lat: center[0], lng: center[1] }}
      >
        {places.map((place) => (
          <Marker
            key={place.name}
            icon={icon}
            position={new google.maps.LatLng(place.lat, place.lng)}
            onClick={() => setSelectedCenter(place)}
          >
            {/* {selectedCenter && (
              <InfoWindow
                onCloseClick={() => {
                  setSelectedCenter(null);
                }}
              >
                ddddj
              </InfoWindow>
            )} */}
          </Marker>
        ))}
        <Marker
          position={{
            lat: center[0],
            lng: center[1],
          }}
        />
        {/* ) */}
      </GoogleMap>
    </React.Fragment>
  );
};

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default WrappedMap;
