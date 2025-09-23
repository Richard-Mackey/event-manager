import React from "react";
/**
 * Help component with accessible navigation and table of contents and anchor links
 */

const Help = () => {
  return (
    <div className="help-container text-black mt-4">
      {/* Table of Contents section for easy navigation within the help page */}
      <section className="help-toc">
        <h1>Help & Guide</h1>
        <p>
          Find answers to common questions and learn how to make the most of
          your Event Planner.
        </p>

        <nav className="toc-nav">
          <ul>
            <li>
              <a href="#getting-started" className="text-dark">
                Getting Started
              </a>
            </li>
            <li>
              <a href="#managing-events" className="text-dark">
                Managing Events
              </a>
            </li>
            <li>
              <a href="#navigation" className="text-dark">
                App Navigation
              </a>
            </li>
          </ul>
        </nav>
      </section>

      {/* Getting Started Section */}
      <section id="getting-started" className="help-section">
        <h2>Getting Started</h2>

        <div className="help-subsection">
          <h3>Creating Your Account</h3>
          <ol>
            <li>Click "Register" or "Sign Up" from the main page</li>
            <li>
              Fill in your details:
              <ul>
                <li>
                  <strong>Email:</strong> Must be a valid email format
                </li>

                <li>
                  <strong>Password:</strong> Create a secure password. Password
                  must be at least 8 characters, contain at least one capital
                  letter, one lowercase letter, one special character and no
                  spaces
                </li>
                <li>
                  <strong>Name:</strong> Your name for personalization
                </li>
              </ul>
            </li>
            <li>Click "Register" to complete registration</li>
            <li>
              You'll be automatically logged in and taken to your dashboard
            </li>
            <li>
              An optional feature before registering is to change the background
              on your wallpaper, using the icons at the bottom of the screen.
            </li>
          </ol>
        </div>

        <div className="help-subsection">
          <h3>Understanding Your Dashboard</h3>
          <p>After logging in, your dashboard shows:</p>
          <ul>
            <li>
              <strong>Upcoming Events:</strong> Your next scheduled events
            </li>
            <li>
              <strong>Quick Actions:</strong> Buttons to add new events and
              delete events quickly
            </li>
          </ul>
        </div>
      </section>

      {/* Managing Events Section */}
      <section id="managing-events" className="help-section">
        <h2>Managing Events</h2>

        <div className="help-subsection">
          <h3>Creating a New Event</h3>
          <p>When you click on add event, the page will show:</p>
          <ul>
            <li>
              <strong>Name:</strong> Add a name for your new event
            </li>
            <li>
              <strong>Date:</strong> Add a date for your new event
            </li>
            <li>
              <strong>Start time:</strong> Add a start time for your new event
            </li>
            <li>
              <strong>End time:</strong> Add an end time for your new event. The
              default end time will be one hour after the event starts. You can
              change this to any time <b>after</b> the event start time. If you
              choose an end time <b>before</b> the start time, you will be
              prompted to put a new time in when you click submit
            </li>
            <li>
              <strong>Location:</strong> Add an optional location for your event
            </li>
            <li>
              <strong>Description:</strong> Add any extra details for your event
              such as contact details and links
            </li>
            <li>
              <strong>Submit:</strong> When you click submit, your event will be
              saved and you will be redirected to the dashboard
            </li>
          </ul>
        </div>

        <div className="help-subsection">
          <h3>Editing Events</h3>
          <p>When you click on edit event, the page will show:</p>
          <ul>
            <li>
              <strong>Name:</strong> You have the option to modify the name for
              your event
            </li>
            <li>
              <strong>Date:</strong> You have the option to modify the date for
              your event
            </li>
            <li>
              <strong>Start time:</strong> You have the option to modify the
              start time for your event
            </li>
            <li>
              <strong>End time:</strong> Add an end time for your modified
              event. The default end time will be one hour after the event
              starts. You can change this to any time <b>after</b> the event
              start time. If you choose an end time <b>before</b> the start
              time, you will be prompted to put a new time in when you click
              submit
            </li>
            <li>
              <strong>Location:</strong> You have the option to modify the
              location for your event
            </li>
            <li>
              <strong>Description:</strong> You have the option to modify any
              details about your event
            </li>
            <li>
              <strong>Submit:</strong> When you click submit, your event will be
              saved and you will be redirected to the dashboard
            </li>
          </ul>
        </div>

        <div className="help-subsection">
          <h3>Deleting Events</h3>
          <p>
            If you click the delete event button, a message will appear asking
            whether you want to proceed with deleting your event. If you click
            cancel, you will stay on the dashboard and your event will remain
            the same. If you click ok, the event will be deleted
          </p>
        </div>
      </section>

      {/* Navigation Section */}
      <section id="navigation" className="help-section">
        <h2>App Navigation</h2>
        <p>
          Once logged in, you can navigate to different pages using the
          navigation links at the top of the page
        </p>
      </section>
    </div>
  );
};

export default Help;
