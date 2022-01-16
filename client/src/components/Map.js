import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useParams, navigate } from '@reach/router';
import ReactMapGL, {
  Marker,
  FlyToInterpolator,
  WebMercatorViewport,
  Popup,
} from 'react-map-gl';
import { Helmet } from 'react-helmet';

import { getEntryLocation } from '../api';
import { useLogEntries } from '../hooks';
import s from '../settings';

import { MarkerIcon } from './icons';
import { LogEntry, MarkerPopup, Header, NotFound } from '.';

// Map using Mapbox Dark theme:
// https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/
// Example: https://github.com/mapbox/mapbox-react-examples/tree/master/basic
const Map = ({ location }) => {
  const { id } = useParams();
  const isLogID = id !== 'map';
  const isEdit = location.state?.isEdit || false;

  // Get list of markers from the database
  const { logEntries } = useLogEntries();

  const [addEntryCoordinates, setAddEntryCoordinates] = useState(null);
  const [showPopup, setShowPopup] = useState(null);

  // Map configuration
  const [viewport, setViewport] = useState({
    width: 100,
    height: 100,
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
          className="z-20"
        >
          <button
            style={{
              transform:
                `translate(${-s.MARKER_SIZE / 2}px,${-s.MARKER_SIZE}px)`,
            }}
            onClick={() => setShowPopup(id)}>
            <MarkerIcon />
          </button>
        </Marker>

        {showPopup === id && (
          <Popup
            latitude={latitude}
            longitude={longitude}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setShowPopup(null)}
            anchor="top"
            className="z-40"
          >
            <MarkerPopup
              title={marker.title}
              visitDate={marker.visitDate}
              country={marker.location.country}
              clicked={() => navigate(`/${id}`)}
            />
          </Popup>
        )}
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

  // Add a new marker
  const mapDbclickHandler = async e => {
    const [ lng, lat ] = e.lngLat;

    // Get country and place names
    const location = await getEntryLocation(lng, lat);

    // NOTE!
    // "fItBounds" has right padding 480px, so we need to make sure
    // that we don't create WebMercatorViewport when viewport is narrow,
    // in other case app will crush due to the assertion failed error
    if (viewport.width > 500) {
      goToMarker(lng, lat);
    }

    setAddEntryCoordinates({ coordinates: [ lng, lat ], ...location });
  };

  // Hide sidebar
  const closeSidebarHandler = () => {
    setAddEntryCoordinates(null);
  };

  // Log entry that matches current id in the useParams
  const currentEntryLog = logEntries.filter(entry => entry._id === id)[0];

  if (isLogID && !currentEntryLog) {
    return <NotFound />;
  }

  return (
    <>
      <Helmet title={currentEntryLog ? currentEntryLog.title : 'Home'} />

      {/* Header */}
      <div
        data-testid="header"
        className="absolute z-20 sm:top-10 sm:left-32 top-3 left-3"
      >
        <Header logEntries={logEntries} />
      </div>

      {/* Map */}
      <ReactMapGL
        {...viewport}
        width="100%"
        height="100vh"
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
            <div
              style={{
                transform:
                  `translate(${-s.MARKER_SIZE / 2}px,${-s.MARKER_SIZE}px)`,
              }}>
              <MarkerIcon />
            </div>
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
      { isLogID && !addEntryCoordinates && currentEntryLog
        ? <LogEntry
          isEdit={isEdit}
          data={currentEntryLog}
        />
        : null
      }
    </>
  );
};

Map.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      isEdit: PropTypes.bool,
    }),
  }),
};

export default Map;
