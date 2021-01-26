import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import GeoData from '../data/geojson.json';

// Setup Mapbox access token
// Read more: https://docs.mapbox.com/mapbox-gl-js/api/properties/#accesstoken
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

// Map using Mapbox Dark theme
// Read more: https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/
// Example: https://github.com/mapbox/mapbox-react-examples/tree/master/basic
const Map = ({ clicked }) => {
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
    map.addControl(new mapboxgl.NavigationControl(), 'top-left');

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // All markers data in json format
    const geojson = GeoData;

    // add markers to map
    geojson.features.forEach(marker => {
      // create a DOM element for the marker
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundImage = `url(https://placekitten.com/g/${marker.properties.iconSize.join(
        '/',
      )}/)`;
      el.style.width = `${marker.properties.iconSize[0]}px`;
      el.style.height = `${marker.properties.iconSize[1]}px`;

      el.addEventListener('click', () => {
        window.alert(marker.properties.message);
      });

      // add marker to map
      new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).addTo(map);
    });

    // Listener for clicking on the map
    map.on('click', () => {
      clicked();
    });

    // Clean up on unmount
    return () => map.remove();

    // eslint-disable-next-line react-app/react-hooks/exhaustive-deps
  }, []);

  return <div className="flex-1" ref={mapContainerRef} />;
};

Map.propTypes = {
  clicked: PropTypes.func.isRequired,
};

export default Map;
