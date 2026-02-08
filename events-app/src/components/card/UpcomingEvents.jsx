import { MdLocationOn, MdCalendarToday } from 'react-icons/md';

const UpcomingEvents = ({ upcomingEvents }) => {
  return (
    <section className='mt-8 p-5 '>
      <h2 className='text-3xl font-bold text-left ml-5'>Upcoming Events</h2>

      <div className='carousel carousel-start '>
        {upcomingEvents.map((event) => (
          <div key={event.id} className='carousel-item '>
            <div className='card w-full'>
              <div className='card-body'>
                <h3 className='card-title'>{event.title}</h3>

                <p className='flex items-center gap-1 text-sm'>
                  <MdLocationOn className='text-secondary text-lg' />
                  {event.location}
                </p>

                <p className='flex items-center gap-1 text-sm opacity-70'>
                  <MdCalendarToday className='text-secondary' />
                  {new Date(event.date).toLocaleString('en-GB', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UpcomingEvents;
