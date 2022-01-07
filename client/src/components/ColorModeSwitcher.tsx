import * as React from "react";
import {
  useColorMode,
  useColorModeValue,
  Icon,
  IconProps,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

export const ColorModeSwitcher: React.FC<IconProps> = (props) => {
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <Icon
      as={SwitchIcon}
      h={5}
      w={5}
      cursor="pointer"
      onClick={toggleColorMode}
      {...props}
    />
  );
};
