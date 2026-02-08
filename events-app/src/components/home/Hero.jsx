import { useState } from 'react';
import { EventCard, EventsMap } from '..';

const Hero = ({ events, loading, error }) => {
  const initialCount = 6;
  const increment = 3;
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
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'>
        {displayedEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {/* Show More / Show Less */}
      <div className='flex justify-center mt-6 gap-4'>
        {visibleEvents < events.length && (
          <button
            className='btn btn-outline btn-primary'
            onClick={handleShowMore}
          >
            Show More
          </button>
        )}
        {visibleEvents > initialCount && (
          <button
            className='btn btn-outline btn-secondary'
            onClick={handleShowLess}
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
