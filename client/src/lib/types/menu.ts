import { IconProp } from "@fortawesome/fontawesome-svg-core";

export type MenuItem = {
  route: {
    path: string;
    name: string;
  };
  icon: IconProp;
};
