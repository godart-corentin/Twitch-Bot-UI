import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components";

import UserProvider from "./context/UserContext";
import {
  Auth,
  Commands,
  CreateCommand,
  EditCommand,
  Dashboard,
  Disconnect,
  Events,
  Schedulers,
  Whitelist,
  CreateScheduler,
} from "./pages";

export const App = () => (
  <BrowserRouter>
    <UserProvider>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route path="/dashboard/" element={<Dashboard />} />
          <Route path="/dashboard/commands" element={<Commands />} />
          <Route
            path="/dashboard/commands/create"
            element={<CreateCommand />}
          />
          <Route
            path="/dashboard/commands/update/:id"
            element={<EditCommand />}
          />
          <Route path="/dashboard/schedulers" element={<Schedulers />} />
          <Route
            path="/dashboard/schedulers/create"
            element={<CreateScheduler />}
          />
          <Route path="/dashboard/events" element={<Events />} />
          <Route path="/dashboard/whitelist" element={<Whitelist />} />
          <Route path="/dashboard/disconnect" element={<Disconnect />} />
        </Route>
      </Routes>
    </UserProvider>
  </BrowserRouter>
);
