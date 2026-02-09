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
    <section className='mt-8 '>
      <h2
        className='text-2xl font-bold text-left mb-6'
        style={{ color: '#6F5A55' }}
      >
        FIND YOUR NEXT EVENT
      </h2>

      <div className='flex flex-wrap items-center gap-3 ml-5 mb-6'>
        {/* Slicers */}
        {['Today', 'This week'].map((slicer) => {
          const isActive = selectedSlicer === slicer;

          return (
            <button
              key={slicer}
              onClick={() => handleSlicerClick(slicer)}
              className={`
        px-4 py-2 rounded-lg text-sm font-semibold
        transition-colors duration-300 cursor-pointer
        ${
          isActive
            ? 'bg-[#6F5A55] text-white'
            : 'bg-[#85CE5D] text-white hover:bg-[#6F5A55]'
        }
      `}
            >
              {slicer}
            </button>
          );
        })}

        {/* Date picker */}
        <div className='flex items-center gap-2'>
          <input
            type='date'
            value={selectedDate}
            onChange={handleDateChange}
            className='
    px-4 py-2 rounded-lg text-sm font-semibold
    bg-[#85CE5D] text-white
    hover:bg-[#6F5A55]
    transition-colors duration-300
    outline-none
    cursor-pointer
  '
          />
        </div>

        {/* Search input */}
        <div className='relative w-64'>
          <input
            type='text'
            placeholder='Search events'
            value={title}
            onChange={handleTitleChange}
            className='
    w-64 px-3 py-2
    rounded-lg
    bg-[#85CE5D] text-white
    placeholder-white/70
    hover:bg-[#6F5A55]
    transition-colors
    outline-none
    text-sm cursor-pointer font-semibold
  '
          />
          <MdSearch className='absolute right-0 top-1/2 -translate-y-1/2 text-black text-lg' />
        </div>

        {/* Clear button */}
        <button
          onClick={handleClear}
          className='
    px-4 py-2 rounded-lg text-sm font-semibold
    bg-[#6F5A55] text-white
    hover:bg-[#85CE5D]
    transition-colors duration-300
    cursor-pointer
  '
        >
          Clear filters
        </button>
      </div>
    </section>
  );
};

export default SearchBar;
