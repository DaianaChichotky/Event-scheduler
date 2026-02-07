const EventCard = ({ event }) => {
  return (
    <div className='card bg-base-100 w-96 shadow-sm'>
      <div className='card-body items-center text-center'>
        <h2 className='card-title'>{event.title}</h2>
        <p>{event.description}</p>
        <p>
          {new Date(event.date).toLocaleString('en-GB', {
            dateStyle: 'medium',
            timeStyle: 'short',
          })}
        </p>
        <p>{event.location}</p>
        <div className='card-actions'>
          <button className='btn btn-primary'>More Details</button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
