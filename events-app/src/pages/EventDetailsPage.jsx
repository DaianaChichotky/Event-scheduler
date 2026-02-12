import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { EventMap } from '../components';
import { useNavigate } from 'react-router';
import { MdArrowBack } from 'react-icons/md';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const EventDetailsPage = () => {
  const { id } = useParams(); // take the :id from the URL
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`${API_URL}/api/events/${id}`);
        if (!res.ok) throw new Error('Failed to fetch event');
        const data = await res.json();
        setEvent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) return <p>Loading event...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!event) return <p>No event found</p>;

  return (
    <div className='container mx-auto py-10 px-4' style={{ color: '#5C4B47' }}>
      <h1 className='text-4xl font-bold mb-4'>{event.title}</h1>
      <p className='mb-2 font-bold'>{event.description}</p>
      <p className='mb-2 font-bold'>
        Date: {new Date(event.date).toLocaleString()}
      </p>
      <p className='mb-2 font-bold'>Location: {event.location}</p>

      <EventMap
        lat={event.latitude}
        lng={event.longitude}
        title={event.title}
        address={event.location}
      />

      <button
        className='mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg
          bg-[#5C4B47] text-white hover:bg-[#85CE5D] transition-colors font-semibold cursor-pointer'
        onClick={goHome}
      >
        <MdArrowBack className='text-xl' />
        Go Back
      </button>
    </div>
  );
};

export default EventDetailsPage;
