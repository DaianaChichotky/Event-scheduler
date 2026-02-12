import { useState } from 'react';

const EditEventModal = ({ event, isOpen, onClose, onSave }) => {
  const [form, setForm] = useState(
    event
      ? {
          title: event.title,
          description: event.description,
          date: event.date,
          location: event.location,
          latitude: event.latitude,
          longitude: event.longitude,
        }
      : {
          title: '',
          description: '',
          date: '',
          location: '',
          latitude: '',
          longitude: '',
        },
  );

  const handleSave = () => {
    onSave({
      ...form,
      date: form.date.slice(0, 10), // YYYY-MM-DD
    });
  };

  if (!isOpen) return null;

  return (
    <div className='modal modal-open'>
      <div className='modal-box'>
        <h3 className='font-bold text-lg mb-4'>Edit Event</h3>

        <div className='flex flex-col gap-3'>
          <input
            type='text'
            placeholder='Title'
            className='input input-bordered w-full'
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <textarea
            placeholder='Description'
            className='textarea textarea-bordered w-full'
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <input
            type='text'
            placeholder='Location'
            className='input input-bordered w-full'
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />

          <input
            type='datetime-local'
            className='input input-bordered w-full'
            value={form.date.slice(0, 16)}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </div>

        <div className='modal-action'>
          <button className='btn btn-success' onClick={handleSave}>
            Save
          </button>
          <button className='btn btn-secondary' onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEventModal;
