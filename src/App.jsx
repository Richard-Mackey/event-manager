import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddEvent from "./components/AddEvent.jsx";
import NavBar from "./components/NavBar.jsx";
import Login from "./components/Login.jsx";
import Registration from "./components/Registration.jsx";
import Dashboard from "./components/Dashboard.jsx";
import "./App.css";
import { EventsProvider } from "./components/EventsContext.jsx";
import EditEvent from "./components/EditEvent.jsx";

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
  const [login, setLogin] = useState("login");

  function handleLogin(values) {
    const foundUser = mockUsers.find((user) => user.email === values.email);
    if (foundUser && foundUser.password === values.password) {
      setUser(foundUser);
      return true;
    } else return false;
  }
  function handleRegistration(values) {
    const foundUser = mockUsers.find((user) => user.email === values.email);
    if (foundUser) {
      return false;
    } else {
      const newUser = {
        email: values.email,
        password: values.password,
        firstName: values.firstName,
      };
      mockUsers.push(newUser);
      setUser(newUser);
      return true;
    }
  }

  return user === null ? (
    login === "login" ? (
      <Login handleLogin={handleLogin} setLogin={setLogin} />
    ) : (
      <Registration
        handleRegistration={handleRegistration}
        setLogin={setLogin}
      />
    )
  ) : (
    <EventsProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Dashboard user={user} />} />
          <Route path="/AddEvent" element={<AddEvent />} />
          <Route path="/EditEvent/:id" element={<EditEvent />} />
        </Routes>
      </BrowserRouter>
    </EventsProvider>
  );
}
export default App;
