import { useEvents } from "./EventsContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Dashboard({ user }) {
  const { events, deleteEvent } = useEvents();
  const navigate = useNavigate();
  console.log("Events from context:", events);

  return (
    <div>
      <h1>Welcome {user.firstName}</h1>
      <div className="container">
        <h2>Your Events</h2>
        {events.map((event) => (
          <div className="card mb-3" key={event.id}>
            <div className="card-header">
              {event.date} at {event.starttime}
            </div>
            <div className="card-body">
              <h5 className="card-title">{event.name}</h5>
              <p className="card-text">Location: {event.location}</p>
              <p className="card-text">{event.description}</p>
              <button onClick={() => navigate(`/EditEvent/${event.id}`)}>
                Edit event
              </button>
              <button
                onClick={() => {
                  if (confirm("Are you sure you want to delete this event?")) {
                    deleteEvent(event.id);
                  }
                }}
              >
                Delete event
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
