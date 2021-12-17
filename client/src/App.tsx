import { Route, Routes } from "react-router";

import {
  Auth,
  Commands,
  Dashboard,
  Disconnect,
  Events,
  Schedulers,
  Users,
} from "./pages";
import UserProvider from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/commands" element={<Commands />} />
        <Route path="/dashboard/schedulers" element={<Schedulers />} />
        <Route path="/dashboard/events" element={<Events />} />
        <Route path="/dashboard/users" element={<Users />} />
        <Route path="/disconnect" element={<Disconnect />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
