import { MdLocationOn } from 'react-icons/md';
import { MdCalendarToday } from 'react-icons/md';

import { useNavigate } from 'react-router';

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const goToDetails = () => {
    navigate(`/events/${event.id}`);
  };

  return (
    <div className='card w-96 shadow-sm rounded-lg bg-zinc-50 text-neutral'>
      <div className='card-body items-center text-center'>
        <h2 className='card-title'>{event.title}</h2>
        <p>{event.description}</p>

        <p className='flex items-center gap-1 text-sm'>
          <MdLocationOn className='text-lg' />
          {event.location}
        </p>

        <p className='flex items-center gap-1 text-sm opacity-70'>
          <MdCalendarToday className='' />
          {new Date(event.date).toLocaleString('en-GB', {
            dateStyle: 'medium',
            timeStyle: 'short',
          })}
        </p>

        <div className='card-actions'>
          <button onClick={goToDetails} className='btn btn-soft btn-accent'>
            More Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
