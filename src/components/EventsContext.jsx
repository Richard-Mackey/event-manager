import { createContext, useContext, useState } from "react";
const EventsContext = createContext();
export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  const generateNewId = () => {
    if (events.length === 0) {
      return 1;
    } else {
      const eventIds = events.map((event) => event.id);
      const findLatestEvent = Math.max(...eventIds);
      return findLatestEvent + 1;
    }
  };

  const addEvent = (eventData) => {
    const newID = generateNewId();
    const newEvent = {
      id: newID,
      ...eventData,
    };
    setEvents([...events, newEvent]);
  };

  const editEvent = (eventId, updatedData) => {
    setEvents(
      events.map((event) => {
        if (event.id === eventId) {
          return { ...event, ...updatedData };
        } else {
          return event;
        }
      })
    );
  };

  const deleteEvent = (eventId) => {
    setEvents(
      events.filter((event) => {
        if (event.id !== eventId) {
          return true;
        } else {
          return false;
        }
      })
    );
  };
  // Add these functions inside EventsProvider, after deleteEvent
  const calculateNewDate = (originalDate, type) => {
    const date = new Date(originalDate);
    switch (type) {
      case "day":
        date.setDate(date.getDate() + 1);
        break;
      case "week":
        date.setDate(date.getDate() + 7);
        break;
      case "month":
        date.setMonth(date.getMonth() + 1);
        break;
      case "year":
        date.setFullYear(date.getFullYear() + 1);
        break;
    }
    return date.toISOString().split("T")[0]; // Return YYYY-MM-DD format
  };

  const duplicateEvent = (eventId, duplicationType) => {
    const originalEvent = events.find((event) => event.id === eventId);
    if (!originalEvent) return;

    const newDate = calculateNewDate(originalEvent.date, duplicationType);
    const duplicatedEvent = {
      ...originalEvent,
      id: generateNewId(),
      date: newDate,
      name: originalEvent.name,
    };

    setEvents([...events, duplicatedEvent]);
  };
  return (
    <EventsContext.Provider
      value={{
        events, // The events array
        addEvent, // The add function
        editEvent, // The edit function
        deleteEvent, // The delete function
        duplicateEvent, // Add this line
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};
export const useEvents = () => {
  return useContext(EventsContext);
};
