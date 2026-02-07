import { useEffect, useState } from 'react';

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/events?page=1&limit=10`;

const useEvents = () => {
  //states
  const [events, setEvents] = useState([]);
  const [filterEvents, setFilterEvents] = useState({ title: '', date: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get events

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Failed to fetch events');
        const data = await res.json();
        // Ordenar cronológicamente (de más cercano a más lejano)
        const sortedEvents = data.results.sort(
          (a, b) => new Date(b.date) - new Date(a.date),
        );

        setEvents(sortedEvents);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // filter by event

  const filteredEvents = events.filter((event) => {
    const matchesTitle = filterEvents.title
      ? event.title.toLowerCase().includes(filterEvents.title.toLowerCase())
      : true;

    const matchesDate = filterEvents.date
      ? event.date.startsWith(filterEvents.date)
      : true;

    return matchesTitle && matchesDate;
  });

  // clean filters

  const clearFilters = () => {
    setFilterEvents({ title: '', date: '' });
  };

  return {
    events: filteredEvents,
    loading,
    error,
    setFilterEvents,
    clearFilters,
  };
};

export default useEvents;
