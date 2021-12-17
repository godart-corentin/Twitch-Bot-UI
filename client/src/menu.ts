import { MenuItem } from "./lib/types";

export const menu: Array<MenuItem> = [
  {
    name: "Dashboard",
    icon: "tachometer-alt",
    path: "/dashboard",
  },
  {
    name: "Commands",
    icon: "terminal",
    path: "/dashboard/commands",
  },
  {
    name: "Schedulers",
    icon: "calendar-alt",
    path: "/dashboard/schedulers",
  },
  {
    name: "Events",
    icon: "bullhorn",
    path: "/dashboard/events",
  },
  {
    name: "Users",
    icon: "users",
    path: "/dashboard/users",
  },
];
