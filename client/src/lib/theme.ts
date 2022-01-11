import { extendTheme, ThemeConfig } from "@chakra-ui/react";

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const colors = {
  dark: {
    700: "#24253a",
    750: "#1f2036",
    800: "#1b1c31",
    900: "#111224",
  },
  active: "#F6AD55",
};

const theme = {
  global: {
    body: {
      overflowX: "hidden",
    },
  },
  config,
  colors,
};

// 3. extend the theme
const customTheme = extendTheme(theme);

export default customTheme;
