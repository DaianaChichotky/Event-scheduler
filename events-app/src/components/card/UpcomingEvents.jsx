import { MdLocationOn, MdCalendarToday } from 'react-icons/md';

const UpcomingEvents = ({ upcomingEvents }) => {
  return (
    <section className='mt-10 '>
      <h2 className='text-2xl font-bold text-left mb-6 text-[#6F5A55]'>
        UPCOMING EVENTS
      </h2>

      <div className='grid gap-2 sm:grid-cols-2 lg:grid-cols-4 justify-items-center'>
        {upcomingEvents.map((event) => (
          <div
            key={event.id}
            className='
              w-full max-w-60 rounded-xl p-5
              bg-[#E6DDD5]
              text-[#6F5A55]
              transition-all duration-300
              hover:bg-[#6F5A55] hover:text-white hover:scale-105 cursor-pointer
            '
          >
            <h3 className='text-lg font-semibold mb-3 text-center'>
              {event.title}
            </h3>

            <p className='flex items-center gap-2 text-sm mb-2'>
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
        ))}
      </div>
    </section>
  );
};

export default UpcomingEvents;
