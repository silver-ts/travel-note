import React, { useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { useMatch, navigate, useParams } from '@reach/router';

import { useMap } from '../hooks';
import LogEntry from './LogEntry';
import { getEntryLocation } from '../api/logs';

// Map using Mapbox Dark theme:
// https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/
// Example: https://github.com/mapbox/mapbox-react-examples/tree/master/basic
const Map = () => {
  const isMainPage = useMatch('/map');
  const { id } = useParams();

  const [isCreate, setCreate] = useState(false);
  const [addEntryCoordinates, setAddEntryCoordinates] = useState(null);

  // Map action functions
  const markerClickHandler = id => {
    navigate(`/${id}`);
  };

  const mapDblclickHandler = async (e, map) => {
    const { lat, lng } = e.lngLat;

    new mapboxgl.Marker().setLngLat(e.lngLat).addTo(map);

    // Get country and place names
    const location = await getEntryLocation(lng, lat);

    setAddEntryCoordinates({ coordinates: [lng, lat], ...location });
    setCreate(true);
  };

  // Pass reference to the <div> - map container
  const ref = useMap(markerClickHandler, mapDblclickHandler);

  return (
    <>
      {/* {!isMainPage
        && <LogEntry data={logEntries.filter(log => log._id === id)[0]} />} */}

      {isCreate
        && <LogEntry
          isCreate
          location={addEntryCoordinates}
          onCancel={() => setCreate(false)} />}

      <div
        id="map"
        className="h-screen w-full overflow-hidden relative text-xs"
        ref={ref}
      >
      </div>
    </>
  );
};

export default Map;
