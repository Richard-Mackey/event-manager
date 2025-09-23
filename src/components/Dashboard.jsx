import { useEvents } from "./EventsContext.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Dashboard({ user }) {
  // Context API integration for global event state management
  const { events, deleteEvent, duplicateEvent } = useEvents();
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
    <>
      <div
        className="dashboard-page"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(
            to bottom,
            lch(49.78% 77.6 288.98) 0px,
            lch(49.78% 77.6 288.98) 300px,
            rgb(216, 214, 213) 300px,
            rgb(216, 214, 213) 100%
          )`,
          zIndex: -1,
        }}
      />

      <div
        style={{
          minHeight: "100vh",
          padding: "20px",
          paddingTop: "10px",
        }}
      >
        <h2 className="text-white display-5 text-center">
          {user.firstName}'s Events
        </h2>

        <div className="row">
          {events.map((event) => (
            <div
              className="d-flex col-12 col-md-6 col-lg-3 mb-3 mt-5 text-center"
              key={event.id}
            >
              <div className="card bg-white p-4 rounded shadow d-flex flex-column event-cards h-100">
                <h4 className="card-title fw-bold">{event.name}</h4>
                <div className="card-body flex-grow-1 d-flex flex-column">
                  <div className="flex-grow-1">
                    <h5 className="card-title">
                      {formatDate(event.date)} at {event.starttime}
                    </h5>
                    <p className="card-text">Location: {event.location}</p>
                    <p className="card-text">{event.description}</p>
                  </div>
                  <div className="d-flex justify-content-center mt-3">
                    <div className="btn-group" role="group">
                      <button
                        className="btn btn-outline-primary btn-sm me-2"
                        onClick={() => navigate(`/EditEvent/${event.id}`)}
                      >
                        Edit
                      </button>

                      <div className="dropdown">
                        <button
                          className="btn btn-outline-secondary btn-sm dropdown-toggle me-2"
                          type="button"
                          data-bs-toggle="dropdown"
                        >
                          Duplicate
                        </button>
                        <ul className="dropdown-menu">
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={() => duplicateEvent(event.id, "day")}
                            >
                              Next Day
                            </button>
                          </li>
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={() => duplicateEvent(event.id, "week")}
                            >
                              Next Week
                            </button>
                          </li>
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={() => duplicateEvent(event.id, "month")}
                            >
                              Next Month
                            </button>
                          </li>
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={() => duplicateEvent(event.id, "year")}
                            >
                              Next Year
                            </button>
                          </li>
                        </ul>
                      </div>

                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => {
                          if (
                            confirm(
                              "Are you sure you want to delete this event?"
                            )
                          ) {
                            deleteEvent(event.id);
                          }
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
