import { useState } from 'react';
import { EventCard, EventsMap } from '..';

const Hero = ({ events, loading, error }) => {
  const initialCount = 8;
  const increment = 4;
  const [visibleEvents, setVisibleEvents] = useState(initialCount);

  if (loading)
    return <span className='loading loading-spinner loading-xl'></span>;
  if (error) return <p>Error: {error}</p>;

  const displayedEvents = events.slice(0, visibleEvents);

  const handleShowMore = () => {
    setVisibleEvents((prev) => Math.min(prev + increment, events.length));
  };

  const handleShowLess = () => {
    setVisibleEvents(initialCount);
  };

  return (
    <div>
      {/* Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5'>
        {displayedEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {/* Show More / Show Less */}
      <div className='flex justify-center mt-6 gap-4'>
        {visibleEvents < events.length && (
          <button
            onClick={handleShowMore}
            className='
        px-6 py-3 rounded-lg text-sm font-semibold
        bg-[#85CE5D] text-white
        hover:bg-[#6F5A55]
        transition-colors duration-300 cursor-pointer
      '
          >
            Show More
          </button>
        )}
        {visibleEvents > initialCount && (
          <button
            onClick={handleShowLess}
            className='
        px-6 py-3 rounded-lg text-sm font-semibold
        bg-[#85CE5D] text-white
        hover:bg-[#6F5A55]
        transition-colors duration-300 cursor-pointer
      '
          >
            Show Less
          </button>
        )}
      </div>

      {/* Map */}
      <div className='mt-10'>
        <EventsMap events={events} />
      </div>
    </div>
  );
};

export default Hero;
