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
  return (
    <EventsContext.Provider
      value={{
        events, // The events array
        addEvent, // The add function
        editEvent, // The edit function
        deleteEvent, // The delete function
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};
export const useEvents = () => {
  return useContext(EventsContext);
};
