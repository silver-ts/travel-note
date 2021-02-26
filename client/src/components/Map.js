import React, { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { useMatch, navigate, useParams } from '@reach/router';

import { useLogEntries } from '../hooks/useLog';
import LogEntry from './LogEntry';

// Setup Mapbox access token
// Read more: https://docs.mapbox.com/mapbox-gl-js/api/properties/#accesstoken
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

// Map using Mapbox Dark theme:
// https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/
// Example: https://github.com/mapbox/mapbox-react-examples/tree/master/basic
const Map = () => {
  const logEntries = useLogEntries();

  // Check if it's a main page or entry details page
  const isMainPage = useMatch('/map');
  const isCreatePage = useMatch('/add-log');
  const { id } = useParams();

  const mapContainerRef = useRef(null);

  // We store the original longitude, latitude, and zoom for the map
  const [lng, setLng] = useState(5);
  const [lat, setLat] = useState(34);
  const [zoom, setZoom] = useState(1.5);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [lng, lat],
      zoom: zoom,
    });

    // Add navigation control (the +/- zoom buttons)
    // map.addControl(new mapboxgl.NavigationControl(), 'bottom-left');

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // add markers to map
    logEntries.forEach(marker => {
      // create a DOM element for the marker
      const el = document.createElement('div');

      // Add custom marker svg
      el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;

      // Add event listener to the marker
      el.addEventListener('click', () => {
        navigate(`/${marker._id}`);
      });

      // add marker to map
      new mapboxgl.Marker(el).setLngLat(marker.location.coordinates).addTo(map);
    });

    // Listener for clicking on the map
    map.on('dblclick', () => {
      console.log('dblclick');

      navigate('/add-log');
    });

    // Clean up on unmount
    return () => map.remove();
  }, [logEntries]);

  return (
    <>
      {isCreatePage && <LogEntry isCreate />}
      {!isMainPage && !isCreatePage && <LogEntry data={logEntries.filter(log => log._id === id)[0]} />}

      <div
        id="map"
        className="h-screen w-full overflow-hidden relative"
        ref={mapContainerRef}
      >
      </div>
    </>
  );
};

export default Map;
