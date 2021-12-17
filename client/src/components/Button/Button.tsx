import React from "react";
import styles from "./Button.module.css";

interface ButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {
  variant: "primary" | "secondary" | "danger";
}

export const Button: React.FC<ButtonProps> = ({
  variant,
  children,
  ...rest
}) => {
  return (
    <button className={`${styles.button} ${styles[variant]}`} {...rest}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  onClick: () => {},
  variant: "primary",
};
