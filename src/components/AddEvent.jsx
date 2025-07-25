import { useFormik } from "formik";
import { useEvents } from "./EventsContext.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function AddEvent() {
  useEffect(() => {
    // Apply dashboard-style gradient background for visual consistency
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
      document.body.style.background = "";
      document.body.style.minHeight = "";
      document.body.style.margin = "";
    };
  }, []);
  // Context API integration for global event state management
  const { addEvent } = useEvents();
  // React Router navigation for routing after form submission
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      date: "",
      starttime: "",
      endtime: "",
      location: "",
      description: "",
    },
    onSubmit: (values) => {
      // Add new event to global state via Context API
      addEvent(values);
      // Navigate back to dashboard on creation of new event
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
    // Only proceed if start time has been set by user
    if (formik.values.starttime && formik.values.starttime !== "") {
      const dateObject = convertTimeStringToDate(formik.values.starttime);
      const dateWithOneHour = addOneHour(dateObject);
      const suggestedEndTime = convertDateToTimeString(dateWithOneHour);
      // Auto-suggest: if no end time set, empty end time, or invalid end time
      if (
        !formik.values.endtime ||
        formik.values.endtime === "" ||
        formik.values.endtime <= formik.values.starttime
      ) {
        formik.setFieldValue("endtime", suggestedEndTime);
      }
    }
  }, [formik.values.starttime]);
  return (
    <div>
      {/* Responsive container with centered layout */}
      <div className="container text-center">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <h2 className="text-white display-5 text-center mt-4">
              Add an event
            </h2>
            {/* Form container with responsive padding */}
            <div className="bg-white p-2 p-md-4 rounded shadow">
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
                {/* Description textarea with multiple rows */}
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
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
