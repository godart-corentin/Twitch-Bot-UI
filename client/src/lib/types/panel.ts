export type PanelAction = {
  type: "Button" | "Menu";
  navigationLink?: string;
  element: JSX.Element;
  onClick?: () => void;
};
