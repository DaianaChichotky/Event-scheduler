import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router';
import L from 'leaflet';

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function EventsMap({ events }) {
  const navigate = useNavigate();

  if (!events.length) return null;

  return (
    <div className='flex justify-center'>
      <MapContainer
        center={[events[0].latitude, events[0].longitude]}
        zoom={2}
        className='h-125 w-full max-w-6xl rounded-lg'
      >
        <TileLayer
          url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; OpenStreetMap contributors'
        />

        {events.map((event) => (
          <Marker
            key={event.id}
            position={[event.latitude, event.longitude]}
            icon={markerIcon}
            eventHandlers={{
              click: () => navigate(`/events/${event.id}`),
            }}
          ></Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default EventsMap;
