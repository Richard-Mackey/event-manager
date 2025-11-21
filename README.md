# Event Planner

A React-based web application for managing personal events and schedules. Built with modern web technologies including React Router, Formik, and Bootstrap.

## Features

- **User Authentication**: Registration and login system with form validation
- **Event Management**: Create, edit, delete, and duplicate events
- **Event Duplication**: Smart duplication feature (next day/week/month/year)
- **Responsive Design**: Mobile-first approach with Bootstrap
- **Customisable Interface**: Multiple background watermark options
- **Time Management**: Automatic end time suggestions (start time + 1 hour)
- **User-Friendly Navigation**: Accessible help documentation

## Technologies Used

- **React 18**: Component-based UI framework
- **React Router**: Client-side routing
- **Formik**: Form state management and validation
- **Bootstrap 5**: Responsive styling and components
- **Context API**: Global state management for events
- **CSS3**: Custom styling with media queries

## Project Structure

```
src/
├── components/
│   ├── AddEvent.jsx         # Create new events
│   ├── Dashboard.jsx        # Main event overview
│   ├── EditEvent.jsx        # Modify existing events
│   ├── EventsContext.jsx    # Global state management
│   ├── Help.jsx             # User documentation
│   ├── Login.jsx            # User authentication
│   ├── NavBar.jsx           # Navigation component
│   ├── Registration.jsx     # User registration
│   ├── Login.css            # Login page styles
│   ├── NavBar.css           # Navigation styles
│   └── Registration.css     # Registration page styles
├── App.jsx                  # Root component & routing
├── main.jsx                 # Application entry point
└── index.css                # Global styles
```

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/Richard-Mackey/event-manager
cd event-planner
```

2. **Install dependencies**

```bash
npm install
```

3. **Start development server**

```bash
npm run dev
```

4. **Open in browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## Usage

### Registration

1. Click "Register" from the login page
2. Enter email, password (min 8 characters, with uppercase, lowercase, number, special character), and first name
3. Optionally select a background watermark
4. Submit to create account and auto-login

### Creating Events

1. Navigate to "Add event" from the navigation bar
2. Fill in event details:
   - Name (required)
   - Date (required)
   - Start time (required)
   - End time (auto-suggests 1 hour after start)
   - Location (optional)
   - Description (optional)
3. Submit to save event

### Managing Events

- **Edit**: Click "Edit" button on any event card
- **Duplicate**: Use dropdown to duplicate to next day/week/month/year
- **Delete**: Click "Delete" with confirmation prompt

## Key Features Explained

### Form Validation

- Email format validation using regex
- Password complexity requirements enforced
- Real-time validation feedback with Formik

### Event Context

Global state management using React Context API allows:

- Centralised event data
- CRUD operations across components
- Automatic ID generation for new events

### Responsive Design

- Mobile-first approach
- Breakpoints at 768px and 992px
- Landscape orientation support
- Collapsible navigation on mobile

### Time Logic

When setting event times:

- End time defaults to start time + 1 hour
- Validation prevents end time before start time
- Automatic recalculation when start time changes

## Development Notes

### Mock Authentication

Currently uses in-memory user array (`mockUsers`) for demonstration. In production, this could be replaced with:

- Backend API authentication
- Secure password hashing
- JWT tokens or session management
- Persistent user data storage

### State Persistence

Events are stored in memory via Context API. Future enhancements could implement:

- LocalStorage for client-side persistence
- Backend API for cloud storage
- Database integration (MongoDB, PostgreSQL, etc.)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- [ ] Calendar view for events
- [ ] Event categories and colour coding
- [ ] Recurring events functionality
- [ ] Email notifications/reminders
- [ ] Event sharing capabilities
- [ ] Dark mode toggle
- [ ] Export events (CSV/iCal)
- [ ] Backend API integration
- [ ] Persistent data storage
