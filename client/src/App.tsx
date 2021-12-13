import React from "react";
import { Route, Routes } from "react-router";

import { Auth, Dashboard } from "./pages";
import UserProvider from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
