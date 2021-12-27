import { Route, Routes } from "react-router";

import {
  Disconnect,
} from "./pages";
import UserProvider from "./context/UserContext";

import { Layout } from "./components";
import { GuestRoutes, AuthRoutes } from './routes'

function App() {
  return (
    <UserProvider>
      <Routes>
        { GuestRoutes.map((route, idx) => <Route path={route.path} element={route.component} /> ) }
        <Route path="/dashboard" element={<Layout />}>
          { AuthRoutes.map((route, idx) => <Route path={route.path} element={route.component} /> ) }
          <Route path="/dashboard/disconnect" element={<Disconnect />} />
        </Route>
      </Routes>
    </UserProvider>
  );
}

export default App;
