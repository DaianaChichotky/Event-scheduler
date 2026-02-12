import { useEffect, useState, useCallback } from 'react';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const useEvents = () => {
  // states
  const [events, setEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [filterEvents, setFilterEvents] = useState({
    title: '',
    date: '',
    startDate: '',
    endDate: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Headers with token
  const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
  });

  // Fetch all events
  const fetchEvents = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/events?page=1&limit=10`, {
        headers: getAuthHeaders(),
      });

      if (!res.ok) throw new Error('Failed to fetch events');
      const data = await res.json();

      // Order by date
      const sortedEvents = data.results.sort(
        (a, b) => new Date(b.date) - new Date(a.date),
      );

      setEvents(sortedEvents);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Fetch upcoming events
  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        const res = await fetch(`${API_URL}/api/events/upcoming`, {
          headers: getAuthHeaders(),
        });

        if (!res.ok) throw new Error('Failed to fetch upcoming events');
        const data = await res.json();
        setUpcomingEvents(data.results ?? data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUpcoming();
  }, []);

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    eventDate.setHours(0, 0, 0, 0); // normalizamos a medianoche local

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // --- TITLE FILTER ---
    const matchesTitle = filterEvents.title
      ? event.title.toLowerCase().includes(filterEvents.title.toLowerCase())
      : true;

    // --- EXACT DATE FROM DATE PICKER ---
    const matchesCalendarDate =
      filterEvents.date && filterEvents.date !== 'today'
        ? eventDate.getTime() ===
          new Date(filterEvents.date).setHours(0, 0, 0, 0)
        : true;

    // --- TODAY SLICER ---
    const matchesToday =
      filterEvents.date === 'today'
        ? eventDate.getTime() === today.getTime()
        : true;

    // --- THIS WEEK SLICER (LUNES A DOMINGO) ---
    const matchesRange =
      filterEvents.startDate && filterEvents.endDate
        ? (() => {
            const start = new Date(filterEvents.startDate);
            start.setHours(0, 0, 0, 0);
            const end = new Date(filterEvents.endDate);
            end.setHours(23, 59, 59, 999); // incluimos todo el domingo
            return eventDate >= start && eventDate <= end;
          })()
        : true;

    return matchesTitle && matchesCalendarDate && matchesToday && matchesRange;
  });

  // clean filters
  const clearFilters = () => {
    setFilterEvents({
      title: '',
      date: '',
      startDate: '',
      endDate: '',
    });
  };

  // delete events

  const deleteEvent = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/events/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (!res.ok) throw new Error('Failed to delete event');

      // update state without fetching all again
      setEvents((prev) => prev.filter((event) => event.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // edit events

  const editEvent = async (id, updatedData) => {
    try {
      const res = await fetch(`${API_URL}/api/events/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) throw new Error('Failed to update event');

      const updatedEvent = await res.json();

      // update state
      setEvents((prev) =>
        prev.map((event) => (event.id === id ? updatedEvent : event)),
      );
    } catch (err) {
      console.error(err);
    }
  };

  return {
    events: filteredEvents,
    upcomingEvents,
    loading,
    error,
    setFilterEvents,
    clearFilters,
    fetchEvents,
    deleteEvent,
    editEvent,
  };
};

export default useEvents;
