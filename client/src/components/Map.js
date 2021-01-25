/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';

// Setup Mapbox access token
// Read more: https://docs.mapbox.com/mapbox-gl-js/api/properties/#accesstoken
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

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
      style: 'mapbox://styles/mapbox/streets-v11',
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

    // Clean up on unmount
    return () => map.remove();

    // eslint-disable-next-line react-app/react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
  return <div className="flex-1" ref={mapContainerRef} onClick={clicked} />;
};

Map.propTypes = {
  clicked: PropTypes.func.isRequired,
};

export default Map;
