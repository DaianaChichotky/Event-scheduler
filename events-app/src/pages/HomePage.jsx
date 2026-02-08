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
    <section className='mb-4 text-center text-black p-5'>
      <h1 className='text-5xl font-bold'>Events around the world 🌍!</h1>
      <p className='mt-6'>
        Don't miss the following events! Pick your location and discover what's
        coming!
      </p>

      <div data-theme='forest' className='p-10 space-y-4'>
        <button className='btn btn-primary'>Primario</button>
        <button className='btn btn-secondary'>Secundario</button>
        <div className='card w-64 bg-base-100 shadow-xl'>
          <div className='card-body'>
            <h2 className='card-title'>Card ejemplo</h2>
            <p>Esto refleja el tema forest</p>
          </div>
        </div>
      </div>

      <UpcomingEvents upcomingEvents={upcomingEvents} />

      <SearchBar
        setFilterEvents={setFilterEvents}
        clearFilters={clearFilters}
      />

      <Hero events={events} loading={loading} error={error} />
    </section>
  );
};

export default HomePage;
