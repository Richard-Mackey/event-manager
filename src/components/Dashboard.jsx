import { useEvents } from "./EventsContext.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Dashboard({ user }) {
  // Apply dashboard-specific gradient background styling
  useEffect(() => {
    document.body.style.background = `linear-gradient(
      to bottom,
      lch(49.78% 77.6 288.98) 0px,
      lch(49.78% 77.6 288.98) 300px,
      rgb(216, 214, 213) 300px,
      rgb(216, 214, 213) 100%
    )`;
    document.body.style.minHeight = "100vh";
    document.body.style.margin = "0";

    return () => {
      // Cleanup: Reset styles to prevent interference with other components
      document.body.style.background = "";
      document.body.style.minHeight = "";
      document.body.style.margin = "";
    };
  }, []);
  // Context API integration for global event state management
  const { events, deleteEvent } = useEvents();
  // React Router navigation hook
  const navigate = useNavigate();
  // Month names array for date display on the cards
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  // date formatting function for user experience
  // allows automatic rendering of dates to more friendly format
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const nthNumber = (number) => {
      if (number > 3 && number < 21) return "th";
      switch (number % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };
    return `${day}${nthNumber(day)} ${month} `;
  }

  return (
    <div>
      <h2 className="text-white display-5 text-center mt-3">
        {/* Personalized welcome section */}
        Welcome {user.firstName}
      </h2>
      <h2 className="text-white display-6 text-center">Your Events</h2>
      {/* Responsive grid layout for event cards */}
      <div className="row">
        {/* Dynamic event rendering using array.map() */}
        {events.map((event) => (
          <div className="d-flex col-12 col-md-6 col-lg-3 mb-3 text-center">
            {/* Bootstrap card component with flexbox for consistent height */}
            <div
              className="card bg-white p-4 rounded shadow d-flex flex-column"
              key={event.id}
            >
              <h4 className="card-title fw-bold">{event.name}</h4>
              <div className="card-body flex-grow-1 d-flex flex-column">
                <div className="flex-grow-1">
                  <h5 className="card-title">
                    {/* Formatted date and time display using custom formatting */}
                    {formatDate(event.date)} at {event.starttime}
                  </h5>
                  <p className="card-text">Location: {event.location}</p>
                  <p className="card-text">{event.description}</p>
                </div>
                {/* Action buttons section - always positioned at bottom */}
                <div className="d-flex mt-3">
                  {/* Edit functionality using React Router navigation */}
                  <button
                    className="me-2"
                    onClick={() => navigate(`/EditEvent/${event.id}`)}
                  >
                    Edit event
                  </button>
                  {/* Delete functionality with user confirmation for data safety */}
                  <button
                    className="me-2"
                    onClick={() => {
                      if (
                        confirm("Are you sure you want to delete this event?")
                      ) {
                        // Context API method to update global state
                        deleteEvent(event.id);
                      }
                    }}
                  >
                    Delete event
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
