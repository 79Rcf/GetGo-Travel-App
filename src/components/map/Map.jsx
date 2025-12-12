import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const Map = ({ center, places }) => {
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);
  const markersLayer = useRef(null);

  useEffect(() => {
    if (!mapInstance.current && mapContainer.current) {

      const map = L.map(mapContainer.current).setView(
        center || [0, 0], 
        center ? 10 : 2 
      );
      mapInstance.current = map;

      const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY;
      
  
      const isRetina = L.Browser.retina;
      const baseUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${apiKey}`;
      const retinaUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey=${apiKey}`;

      L.tileLayer(isRetina ? retinaUrl : baseUrl, {
        attribution: 'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | © OpenStreetMap <a href="https://www.openstreetmap.org/copyright" target="_blank">contributors</a>',
        maxZoom: 20,
      }).addTo(map);
    }


    if (mapInstance.current && center) {
      mapInstance.current.setView(center, 10);
    }


    if (mapInstance.current && places) {
      if (markersLayer.current) {
        markersLayer.current.clearLayers();
      }
      
      markersLayer.current = L.layerGroup().addTo(mapInstance.current);
      
      places.forEach((place) => {
        const coords = place.geometry?.coordinates; 
        const name = place.properties?.name;
        
        if (coords && coords.length >= 2) {
          const [lon, lat] = coords;
          const marker = L.marker([lat, lon]).addTo(markersLayer.current);
          
          if (name) {
            marker.bindPopup(`<b>${name}</b>`);
          }
        }
      });
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [center, places]);

  return (
    <div 
      ref={mapContainer} 
      className="w-full h-full min-h-[400px] rounded-lg"
      style={{ zIndex: 1 }}
    />
  );
};

export default Map;