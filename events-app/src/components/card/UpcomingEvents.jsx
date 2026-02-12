import { MdLocationOn, MdCalendarToday } from 'react-icons/md';

const UpcomingEvents = ({ upcomingEvents }) => {
  return (
    <section className='mt-10'>
      <h2 className='text-2xl font-bold text-center mb-6 mt-15 text-neutral'>
        UPCOMING EVENTS
      </h2>

      <div className='carousel w-full rounded-box space-x-4 overflow-x-auto snap-x snap-mandatory'>
        {upcomingEvents.map((event) => (
          <div
            key={event.id}
            className='
              carousel-item
              w-60
              shrink-0
              rounded-xl
              p-5
              bg-success/50
              text-white
              transition-all duration-300
              hover:bg-success hover:text-white hover:scale-105
              cursor-pointer
              snap-start
              flex
              flex-col
              justify-between
              h-40
            '
          >
            {/* Title */}
            <h3 className='text-lg font-semibold h-60 overflow-hidden text-center'>
              {event.title}
            </h3>

            {/* Location and date */}
            <div className='flex flex-col items-center text-center gap-2'>
              <p className='flex items-center gap-2 text-sm'>
                <MdLocationOn />
                {event.location}
              </p>

              <p className='flex items-center gap-2 text-sm opacity-80'>
                <MdCalendarToday />
                {new Date(event.date).toLocaleString('en-GB', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UpcomingEvents;
