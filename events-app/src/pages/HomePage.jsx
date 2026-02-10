import { SearchBar, Hero, UpcomingEvents } from '../components';
import useEvents from '../services/api';

const HomePage = () => {
  const {
    events,
    upcomingEvents,
    loading,
    error,
    setFilterEvents,
    clearFilters,
  } = useEvents();

  return (
    <section className='mb-4 text-center p-5 text-neutral'>
      <div>
        <h1 className='text-7xl font-bold'>Events around the world!</h1>
        <p className='mt-6 text-2xl'>
          Don't miss the following events. Pick your location and discover
          what's coming!
        </p>

        <UpcomingEvents upcomingEvents={upcomingEvents} />
      </div>

      <SearchBar
        setFilterEvents={setFilterEvents}
        clearFilters={clearFilters}
      />

      <Hero events={events} loading={loading} error={error} />
    </section>
  );
};

export default HomePage;
