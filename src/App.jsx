import { useState } from "react";
import Login from "./components/Login.jsx";
import Dashboard from "./components/Dashboard.jsx";
import "./App.css";
import { EventsProvider } from "./components/EventsContext.jsx";
const mockUsers = [
  { email: "john@example.com", password: "password123", firstName: "John" },
  {
    email: "sarah@example.com",
    password: "mypassword",
    firstName: "Sarah",
  },
];
function App() {
  const [user, setUser] = useState(null);

  function handleLogin(values) {
    const foundUser = mockUsers.find((user) => user.email === values.email);
    if (foundUser && foundUser.password === values.password) {
      setUser(foundUser);
      return true;
    } else return false;
  }
  return user === null ? (
    <Login handleLogin={handleLogin} />
  ) : (
    <EventsProvider>
      <Dashboard user={user} />
    </EventsProvider>
  );
}
export default App;
