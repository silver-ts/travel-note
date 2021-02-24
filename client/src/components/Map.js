import React, { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

import { useLogEntries } from '../hooks/useLog';
import LogEntry from './LogEntry';

// Setup Mapbox access token
// Read more: https://docs.mapbox.com/mapbox-gl-js/api/properties/#accesstoken
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

// Map using Mapbox Dark theme
// Read more: https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/
// Example: https://github.com/mapbox/mapbox-react-examples/tree/master/basic
const Map = () => {
  const logEntries = useLogEntries();

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
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

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
      el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-map-pin"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;

      // el.addEventListener('click', () => {
      //   window.alert(marker.properties.message);
      // });

      // add marker to map
      new mapboxgl.Marker(el).setLngLat(marker.location.coordinates).addTo(map);
    });

    // Listener for clicking on the map
    map.on('click', () => {
      console.log('click');
    });

    // Clean up on unmount
    return () => map.remove();
  }, [logEntries]);

  return (
    <>
      <LogEntry />

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
