import { MenuItem } from "./types";

export const menu: Array<MenuItem> = [
  {
    route: {
      name: "Dashboard",
      path: "/dashboard",
    },
    icon: "tachometer-alt",
  },
  {
    route: {
      name: "Commands",
      path: "/dashboard/commands",
    },
    icon: "terminal",
  },
  {
    route: {
      name: "Schedulers",
      path: "/dashboard/schedulers",
    },
    icon: "calendar-alt",
  },
  {
    route: {
      name: "Events",
      path: "/dashboard/events",
    },
    icon: "bullhorn",
  },
  {
    route: {
      name: "Whitelist",
      path: "/dashboard/whitelist",
    },
    icon: "users",
  },
];
