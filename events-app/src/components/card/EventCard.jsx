import {
  MdLocationOn,
  MdCalendarToday,
  MdEdit,
  MdDelete,
} from 'react-icons/md';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import EditEventModal from './EditEventModal';

const EventCard = ({ event, isLoggedIn, deleteEvent, editEvent }) => {
  const navigate = useNavigate();

  const goToDetails = () => {
    navigate(`/events/${event.id}`);
  };

  // edit Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // save modal

  const handleEditSave = async (updatedData) => {
    await editEvent(event.id, updatedData);
    setIsEditModalOpen(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className='card w-96 shadow-sm rounded-lg bg-zinc-50 text-neutral'>
      <div className='card-body flex flex-col text-center'>
        {/* Title */}
        <h2 className='card-title'>{event.title}</h2>

        {/* Description */}
        <p>{event.description}</p>

        {/* Location */}
        <p className='flex items-center gap-1 text-sm'>
          <MdLocationOn className='text-lg' />
          {event.location}
        </p>

        {/* Dates */}
        <p className='flex items-center gap-1 text-sm opacity-70'>
          <MdCalendarToday />
          {new Date(event.date).toLocaleString('en-GB', {
            dateStyle: 'medium',
            timeStyle: 'short',
          })}
        </p>

        {/* More Details */}
        <div className='card-actions'>
          <button onClick={goToDetails} className='btn btn-soft btn-accent'>
            More Details
          </button>
        </div>

        {/* Edit and Delete */}
        <div className='mt-2'>
          {isLoggedIn && (
            <div className='mt-auto w-full flex justify-end gap-2 pt-2'>
              <button
                onClick={() => setIsEditModalOpen(true)}
                className='p-2 rounded-full hover:bg-yellow-200 transition cursor-pointer'
              >
                <MdEdit className='text-xl text-yellow-600' />
              </button>

              <button
                onClick={() => {
                  const confirmDelete = window.confirm(
                    'Are you sure you want to delete this event?',
                  );
                  if (confirmDelete) deleteEvent(event.id);
                }}
                className='p-2 rounded-full hover:bg-red-200 transition cursor-pointer'
              >
                <MdDelete className='text-xl text-red-600' />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <EditEventModal
        event={event}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleEditSave}
      />

      {/* Toast */}
      {showToast && (
        <div className='fixed top-5 right-5 z-50'>
          <div className='alert alert-success shadow-lg'>
            <span>Event updated successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCard;
