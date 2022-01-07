import { extendTheme, ThemeConfig } from "@chakra-ui/react";

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const colors = {
  dark: {
    700: "#24253a",
    800: "#1b1c31",
    900: "#111224",
  },
};

// 3. extend the theme
const theme = extendTheme({ config, colors });

export default theme;
