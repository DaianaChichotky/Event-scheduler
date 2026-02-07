import { useState } from 'react';

const SearchBar = ({ setFilterEvents, clearFilters }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  const handleClear = () => {
    setTitle('');
    setDate('');
    clearFilters(); // llama a la función del hook
  };

  return (
    <div className='flex flex-wrap gap-4 mb-6 justify-center'>
      <input
        type='text'
        placeholder='Search by title'
        className='input input-bordered'
        value={title}
        onChange={(e) => {
          const value = e.target.value;
          setTitle(value);
          setFilterEvents((prev) => ({ ...prev, title: value }));
        }}
      />

      <input
        type='date'
        className='input input-bordered'
        value={date}
        onChange={(e) => {
          const value = e.target.value;
          setDate(value);
          setFilterEvents((prev) => ({ ...prev, date: value }));
        }}
      />

      <button type='button' className='btn btn-outline' onClick={handleClear}>
        Clear filters
      </button>
    </div>
  );
};

export default SearchBar;
