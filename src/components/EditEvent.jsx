import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useEvents } from "./EventsContext.jsx";
import { useEffect } from "react";

export default function EditEvent() {
  // Extract event ID from URL parameters for dynamic routing
  const { id } = useParams();
  // Context API integration for global event state management
  const { editEvent, events } = useEvents();
  // React Router navigation for use after form submission
  const navigate = useNavigate();

  const foundEvent = events.find((event) => {
    return event.id === Number(id);
  });
  // brings up event values for editing
  const formik = useFormik({
    initialValues: {
      name: foundEvent.name,
      date: foundEvent.date,
      starttime: foundEvent.starttime,
      endtime: foundEvent.endtime,
      location: foundEvent.location,
      description: foundEvent.description,
    },
    onSubmit: (values) => {
      // Update event in global state using Context API method
      editEvent(Number(id), values);
      // Navigate back to dashboard after successful update
      navigate("/");
    },
  });
  // the following is used to add an arbitary time of 1 hour to the event start time
  // this can be modified by the user
  const convertTimeStringToDate = (time) => {
    const splitTime = time.split(":");
    const hours = parseInt(splitTime[0]);
    const minutes = parseInt(splitTime[1]);
    return new Date(2000, 0, 1, hours, minutes);
  };
  const addOneHour = (date) => {
    const originalTime = date.getTime();
    const timeAfterOneHour = originalTime + 3600000;
    return new Date(timeAfterOneHour);
  };
  const convertDateToTimeString = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const paddedHours = hours.toString().padStart(2, "0");
    const paddedMinutes = minutes.toString().padStart(2, "0");
    return paddedHours + ":" + paddedMinutes;
  };
  useEffect(() => {
    // Only proceed if start time is set and not empty
    if (formik.values.starttime && formik.values.starttime !== "") {
      // Check if current end time is invalid (before or equal to start time)
      if (
        formik.values.endtime &&
        formik.values.endtime <= formik.values.starttime
      ) {
        // Calculate suggested end time (start time + 1 hour)
        const dateObject = convertTimeStringToDate(formik.values.starttime);
        const dateWithOneHour = addOneHour(dateObject);
        const suggestedEndTime = convertDateToTimeString(dateWithOneHour);
        // Automatically update end time field with suggestion
        formik.setFieldValue("endtime", suggestedEndTime);
      }
    }
  }, [formik.values.starttime]);
  // Conditional rendering based on whether event was found
  if (foundEvent) {
    return (
      <div>
        {/* Header section with spacing for fixed navigation */}
        <div style={{ paddingTop: "80px" }}>
          <h1>Edit event page</h1>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              className="form-control mb-3 bg-white text-dark"
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />

            <label htmlFor="date">Date</label>
            <input
              className="form-control mb-3 bg-white text-dark"
              id="date"
              name="date"
              type="date"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.date}
            />
            <label htmlFor="starttime">Start time</label>
            <input
              className="form-control mb-3 bg-white text-dark"
              id="starttime"
              name="starttime"
              type="time"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.starttime}
            />
            <label htmlFor="endtime">End time</label>
            {/* End time field with validation constraint */}
            <input
              className="form-control mb-3 bg-white text-dark"
              id="endtime"
              name="endtime"
              type="time"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.endtime}
              min={formik.values.starttime}
            />
            <label htmlFor="location">Location</label>
            <input
              className="form-control mb-3 bg-white text-dark"
              id="location"
              name="location"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.location}
            />
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control mb-3 bg-white text-dark"
              id="description"
              name="description"
              rows="3"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />
            <button className="btn btn-primary w-100" type="submit">
              Update Event
            </button>
          </form>
        </div>
      </div>
    );
  } else {
    // Error state: Event not found (invalid ID or deleted event)
    return (
      <div>
        <p>Event not found</p>
        {/* navigate back to dashboard on button click */}
        <button onClick={() => navigate("/")}>Back to Dashboard</button>
      </div>
    );
  }
}
