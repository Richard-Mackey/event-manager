import { useEvents } from "./EventsContext.jsx";

export default function Dashboard({ user }) {
  const { events, addEvent, editEvent, deleteEvent } = useEvents();
  console.log("Events from context:", events);
  return (
    <div>
      <h1>Welcome {user.firstName}</h1>
    </div>
  );
}
