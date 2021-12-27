import { Route } from "./lib/types";

import { Dashboard, Commands, Schedulers, Events, Users, Auth } from "./pages";

export const AuthRoutes: Array<Route> = [
  {
    name: "Dashboard",
    path: "/dashboard",
    component: <Dashboard />,
  },
  {
    name: "Commands",
    path: "/dashboard/commands",
    component: <Commands />,
  },
  {
    name: "Schedulers",
    path: "/dashboard/schedulers",
    component: <Schedulers />,
  },
  {
    name: "Events",
    path: "/dashboard/events",
    component: <Events />,
  },
  {
    name: "Users",
    path: "/dashboard/users",
    component: <Users />,
  },
];

export const GuestRoutes: Array<Route> = [
  {
    name: "Auth",
    path: "/",
    component: <Auth />,
  },
];
