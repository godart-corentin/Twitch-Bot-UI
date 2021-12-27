import { MenuItem } from "./lib/types";

export const menu: Array<MenuItem> = [
  {
    icon: "tachometer-alt",
    route: {
      name: "Dashboard",
      path: "/dashboard",
    }
  },
  {
    icon: "terminal",
    route: {
      name: "Commands",
      path: "/dashboard/commands",
    }
  },
  {
    icon: "calendar-alt",
    route: {
      name: "Schedulers",
      path: "/dashboard/schedulers",
    }
  },
  {
    icon: "bullhorn",
    route: {
      name: "Events",
      path: "/dashboard/events",
    }
  },
  {
    icon: "users",
    route: {
      name: "Users",
      path: "/dashboard/users",
    }
  },
];
