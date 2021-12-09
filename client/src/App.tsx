import React from "react";
import { Route, Routes } from "react-router";

import { Auth, Dashboard } from "./pages";
import UserProvider from "./context/UserContext";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
