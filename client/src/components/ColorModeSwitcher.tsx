import * as React from "react";
import { useColorMode, BoxProps, Box } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ColorModeSwitcher: React.FC<BoxProps> = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box cursor="pointer" onClick={toggleColorMode} {...props}>
      <FontAwesomeIcon icon={colorMode === "light" ? "moon" : "sun"} />
    </Box>
  );
};
