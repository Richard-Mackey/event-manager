import { useState } from "react";
import Login from "./components/Login.jsx";
import "./App.css";
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
      setUser(foundUser.firstName);
      return true;
    } else return false;
  }
  return <Login handleLogin={handleLogin} />;
}
export default App;
