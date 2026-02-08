import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix icon issue
const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function EventMap({ lat, lng, title, address }) {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={13}
      style={{ height: '300px', width: '100%' }}
    >
      <TileLayer
        url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; OpenStreetMap contributors'
      />

      <Marker position={[lat, lng]} icon={markerIcon}>
        <Popup>
          <strong>{title}</strong>
          <br />
          {address}
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default EventMap;
