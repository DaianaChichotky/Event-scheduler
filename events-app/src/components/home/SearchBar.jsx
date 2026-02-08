import { useState } from 'react';
import { MdSearch } from 'react-icons/md';

const SearchBar = ({ setFilterEvents, clearFilters }) => {
  const [title, setTitle] = useState('');
  const [selectedSlicer, setSelectedSlicer] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const handleSlicerClick = (slicer) => {
    setSelectedSlicer(slicer);

    const today = new Date();
    const startOfWeek = new Date();
    startOfWeek.setDate(today.getDate() - today.getDay());
    const endOfWeek = new Date();
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    if (slicer === 'Today') {
      setFilterEvents((prev) => ({
        ...prev,
        date: today.toISOString().split('T')[0],
        startDate: '',
        endDate: '',
      }));
      setSelectedDate('');
    } else if (slicer === 'This week') {
      setFilterEvents((prev) => ({
        ...prev,
        startDate: startOfWeek.toISOString().split('T')[0],
        endDate: endOfWeek.toISOString().split('T')[0],
        date: '',
      }));
      setSelectedDate('');
    }
  };

  const handleDateChange = (e) => {
    const value = e.target.value;
    setSelectedDate(value);
    setFilterEvents((prev) => ({ ...prev, date: value }));
  };

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);
    setFilterEvents((prev) => ({ ...prev, title: value }));
  };

  const handleClear = () => {
    setTitle('');
    setSelectedDate('');
    setSelectedSlicer('');
    clearFilters();
  };

  return (
    <section className='mt-8'>
      <h2 className='text-3xl font-bold text-left ml-5 mb-4'>
        Find your next event
      </h2>

      <div className='flex flex-wrap items-center gap-3 ml-5 mb-6'>
        {/* Slicers */}
        {['Today', 'This week'].map((slicer) => (
          <button
            key={slicer}
            className={`btn btn-sm ${
              selectedSlicer === slicer ? 'btn-primary' : 'btn-outline'
            }`}
            onClick={() => handleSlicerClick(slicer)}
          >
            {slicer}
          </button>
        ))}

        {/* Date picker */}
        <div className='flex items-center gap-2'>
          <input
            type='date'
            className='input input-bordered'
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>

        {/* Search input */}
        <div className='relative w-64'>
          <input
            type='text'
            placeholder='Search events'
            value={title}
            onChange={handleTitleChange}
            className='w-full bg-transparent border-b border-gray-400 outline-none pr-10 text-sm placeholder-gray-500'
          />
          <MdSearch className='absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 text-lg' />
        </div>

        {/* Clear button */}
        <button className='btn btn-outline' onClick={handleClear}>
          Clear filters
        </button>
      </div>
    </section>
  );
};

export default SearchBar;
