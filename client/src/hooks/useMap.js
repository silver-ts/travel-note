import { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOMServer from 'react-dom/server';
import mapboxgl from 'mapbox-gl';

import { useLogEntries } from '../hooks';
import { MarkerIcon } from '../components/icons';

// Setup Mapbox access token
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const useMap = (onMarkerClick, onMapDblclick) => {
  // Get list of location from database
  const logEntries = useLogEntries();

  const mapContainer = useRef(null);

  const [map, setMap] = useState(null);

  // We store the original longitude, latitude, and zoom for the map
  const [lng, setLng] = useState(5);
  const [lat, setLat] = useState(34);
  const [zoom, setZoom] = useState(1.5);

  // Create a new map, more on:
  // https://sparkgeo.com/blog/build-a-react-mapboxgl-component-with-hooks/
  const initializeMap = useCallback(({ setMap, mapContainer }) => {
    // Map using Mapbox Dark theme
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [lng, lat],
      zoom: zoom,
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-left');

    // Setup startup configurations
    map.on('load', () => {
      setMap(map);
      map.resize();
    });

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // Add custom markers to the map
    logEntries.forEach(marker => {
      const el = document.createElement('div');

      // Convert JSX to HTML string
      const svgMarker = ReactDOMServer.renderToString(MarkerIcon());

      el.innerHTML = svgMarker;

      // Add event listener to the marker
      el.addEventListener('click', () => onMarkerClick(marker._id));

      // Render marker on map
      new mapboxgl.Marker(el).setLngLat(marker.location.coordinates).addTo(map);
    });

    // Listener for double clicking on the map
    map.on('dblclick', e => onMapDblclick(e, map) );

  }, [{ setMap, mapContainer }]);


  // Initialize map when component mounts
  useEffect(() => {
    if (!map) {
      initializeMap({ setMap, mapContainer });
    }

    // Clean up on unmount
    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [map, logEntries]);

  return mapContainer;
};

export default useMap;
