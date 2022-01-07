import { Center } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Loader = () => (
  <Center
    position="absolute"
    top="0"
    left="0"
    right="0"
    bottom="0"
    zIndex={2}
    bgColor="rgba(0, 0, 0, 0.2)"
  >
    <FontAwesomeIcon icon="circle-notch" size="2x" color="#fff" spin />
  </Center>
);
