import { useEffect, useState, useCallback } from 'react';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const useEvents = () => {
  //states
  const [events, setEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  const [filterEvents, setFilterEvents] = useState({ title: '', date: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all events

  const fetchEvents = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/events?page=1&limit=10`);
      if (!res.ok) throw new Error('Failed to fetch events');
      const data = await res.json();
      // Order by date
      const sortedEvents = data.results.sort(
        (a, b) => new Date(a.date) - new Date(b.date),
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
        const res = await fetch(`${API_URL}/api/events/upcoming`);
        if (!res.ok) throw new Error('Failed to fetch upcoming events');
        const data = await res.json();
        setUpcomingEvents(data.results ?? data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUpcoming();
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
    upcomingEvents,
    loading,
    error,
    setFilterEvents,
    clearFilters,
    fetchEvents,
  };
};

export default useEvents;
