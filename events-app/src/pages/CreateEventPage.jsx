import { useState } from 'react';
import { useNavigate } from 'react-router';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const CreateEventPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    latitude: '',
    longitude: '',
  });

  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.title.length > 5000) {
      setMessage('Error: Title must be a maximum of 5000 characters.');
      return;
    }

    const eventData = {
      ...form,
      latitude: parseFloat(form.latitude),
      longitude: parseFloat(form.longitude),
      date: new Date(form.date).toISOString(),
    };

    console.log('Datos a enviar:', eventData);

    try {
      const res = await fetch(`${API_URL}/api/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(eventData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to create event');
      }

      setMessage({
        text: 'Event created successfully! Redirecting to Home Page...',
        type: 'success',
      });

      setForm({
        title: '',
        description: '',
        date: '',
        location: '',
        latitude: '',
        longitude: '',
      });
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      console.error(err);
      setMessage({ text: err.message, type: 'error' });
    }

    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className='flex justify-center  bg-cover m-20'>
      <form
        onSubmit={handleSubmit}
        className='bg-base-100 shadow-lg rounded-lg p-8 w-full max-w-2xl space-y-4'
      >
        <h2
          className='text-3xl font-bold mb-4 uppercase'
          style={{ color: '#6F5A55' }}
        >
          Create Event
        </h2>

        {message && (
          <div
            className={`my-4 p-3 rounded ${
              message.type === 'success'
                ? 'bg-green-200 text-green-800'
                : 'bg-red-200 text-red-800'
            }`}
          >
            {message.text}
          </div>
        )}

        <input
          type='text'
          placeholder='Title'
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className='input input-bordered w-full'
          required
        />
        <textarea
          placeholder='Description'
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className='textarea textarea-bordered w-full'
          required
        />
        <input
          type='datetime-local'
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className='input input-bordered w-full'
          required
        />
        <input
          type='text'
          placeholder='Location'
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          className='input input-bordered w-full'
          required
        />
        <input
          type='number'
          placeholder='Latitude'
          value={form.latitude}
          onChange={(e) => setForm({ ...form, latitude: e.target.value })}
          className='input input-bordered w-full'
          required
        />
        <input
          type='number'
          placeholder='Longitude'
          value={form.longitude}
          onChange={(e) => setForm({ ...form, longitude: e.target.value })}
          className='input input-bordered w-full'
          required
        />

        <button
          type='submit'
          className='mt-4 w-full px-3 py-2 rounded-lg
        bg-[#85CE5D] text-white
        hover:bg-[#6F5A55]
        transition-colors font-semibold cursor-pointer'
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEventPage;
