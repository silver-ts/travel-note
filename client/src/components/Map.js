import React, { useState, useMemo } from 'react';
import { useParams, navigate } from '@reach/router';
import ReactMapGL, {
  Marker,
  FlyToInterpolator,
  WebMercatorViewport,
  Popup,
} from 'react-map-gl';

import { getEntryLocation } from '../api';
import { useLogEntries } from '../hooks';

import { MarkerIcon } from './icons';
import LogEntry from './LogEntry';
import MarkerPopup from './MarkerPopup';
import Header from './Header';

import s from '../settings';

// Map using Mapbox Dark theme:
// https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/
// Example: https://github.com/mapbox/mapbox-react-examples/tree/master/basic
const Map = () => {
  const { id } = useParams();
  const logID = id !== 'map';

  // const [isCreate, setCreate] = useState(false);
  const [addEntryCoordinates, setAddEntryCoordinates] = useState(null);
  const [showPopup, setShowPopup] = useState(null);

  // Get list of markers from database
  const { logEntries } = useLogEntries();

  // Map configuration
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100vh',
    latitude: 34,
    longitude: 5,
    zoom: 1.5,
  });

  // Cache <Marker>, so that we don't rerender them when the viewport changes
  const markers = useMemo(() => logEntries.map((marker, i) => {
    const [longitude, latitude] = marker.location.coordinates;
    const id = marker._id;

    return (
      <React.Fragment key={i}>
        <Marker
          latitude={latitude}
          longitude={longitude}
          className="z-20">
          <button
            style={{
              transform:
                `translate(${-s.MARKER_SIZE / 2}px,${-s.MARKER_SIZE}px)`,
            }}
            onClick={() => setShowPopup(id)}>
            <MarkerIcon />
          </button>
        </Marker>

        {showPopup === id && <Popup
          latitude={latitude}
          longitude={longitude}
          closeButton={true}
          closeOnClick={false}
          onClose={() => setShowPopup(null)}
          anchor="top"
          className="z-40" >
          <MarkerPopup
            title={marker.title}
            visitDate={marker.visitDate}
            country={marker.location.country}
            clicked={() => navigate(`/${id}`)}
          />
        </Popup>}
      </React.Fragment>
    );
  }), [logEntries, showPopup]);


  // Fly to marker and center it on the screen
  const goToMarker = (lng, lat) => {
    const { longitude, latitude, zoom } = new WebMercatorViewport(viewport)
      .fitBounds([[lng - 0.05, lat - 0.05], [lng + 0.05, lat + 0.05]], {
        padding: { top: 0, bottom: 0, left: 0, right: 480 },
        offset: [0, 0],
      });

    setViewport({
      ...viewport,
      longitude,
      latitude,
      zoom,
      transitionDuration: 2000,
      transitionInterpolator: new FlyToInterpolator(),
    });
  };

  const mapDbclickHandler = async e => {
    const [ lng, lat ] = e.lngLat;

    // Get country and place names
    const location = await getEntryLocation(lng, lat);

    goToMarker(lng, lat);
    setAddEntryCoordinates({ coordinates: [ lng, lat ], ...location });
  };

  const closeSidebarHandler = () => {
    setAddEntryCoordinates(null);
    navigate('/map');
  };

  return (
    <>
      {/* Header */}
      <div className="absolute z-20 top-10 left-32">
        <Header />
      </div>

      {/* Map */}
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/dark-v10"
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        onViewportChange={setViewport}
        onDblClick={mapDbclickHandler}
      >
        {markers}

        {addEntryCoordinates ? (
          <Marker
            latitude={addEntryCoordinates.coordinates[1]}
            longitude={addEntryCoordinates.coordinates[0]}
            className="text-salmon">
            <MarkerIcon />
          </Marker>
        ) : null }
      </ReactMapGL>

      {/* Sidebar */}
      {addEntryCoordinates ? (
        <LogEntry
          isCreate
          entryLocation={addEntryCoordinates}
          onClose={closeSidebarHandler} />
      ) : null }


      {/* Details view */}
      { logID && !addEntryCoordinates
        ? <LogEntry data={logEntries.filter(entry => entry._id === id)[0]} />
        : null
      }
    </>
  );
};

export default Map;
