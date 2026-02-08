import { MdLocationOn } from 'react-icons/md';
import { MdCalendarToday } from 'react-icons/md';

import { useNavigate } from 'react-router';

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const goToDetails = () => {
    navigate(`/events/${event.id}`);
  };

  return (
    <div className='card bg-base-100 w-96 shadow-sm'>
      <div className='card-body items-center text-center'>
        <h2 className='card-title'>{event.title}</h2>
        <p>{event.description}</p>

        <p className='flex items-center gap-1 text-sm'>
          <MdLocationOn className='text-primary text-lg' />
          {event.location}
        </p>

        <p className='flex items-center gap-1 text-sm opacity-70'>
          <MdCalendarToday className='text-primary text-base' />
          {new Date(event.date).toLocaleString('en-GB', {
            dateStyle: 'medium',
            timeStyle: 'short',
          })}
        </p>

        <div data-theme='cupcake' className='card-actions'>
          <button className='btn btn-primary' onClick={goToDetails}>
            More Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
