import { SearchBar, Hero } from '../components';
import useEvents from '../services/api';

const HomePage = () => {
  const { events, loading, error, setFilterEvents, clearFilters } = useEvents();

  return (
    <section className='py-8 mb-4 text-center text-black'>
      <h1 className='text-5xl font-bold'>Find Your Event</h1>

      <SearchBar
        setFilterEvents={setFilterEvents}
        clearFilters={clearFilters}
      />

      <Hero events={events} loading={loading} error={error} />
    </section>
  );
};

export default HomePage;
