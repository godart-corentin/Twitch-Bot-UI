import {
  Avatar,
  Flex,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import { menu } from "../lib/menu";
import { User } from "../lib/types";

type TopbarProps = {
  routePath: string;
  user: User | null;
};

export const Topbar = ({ routePath, user }: TopbarProps) => {
  const displayMenu = () => {
    return (
      <>
        {menu.map((item, idx) => (
          <Link
            key={idx}
            to={item.route.path}
            style={{
              textDecoration: "none",
            }}
          >
            <Flex alignItems="center" h="30px">
              <FontAwesomeIcon
                icon={item.icon}
                style={{ width: 20 }}
                color={routePath === item.route.path ? "#F6AD55" : undefined}
              />
            </Flex>
          </Link>
        ))}
      </>
    );
  };

  return (
    <Flex
      h="100px"
      w="100%"
      p="3em 1em"
      bg={"dark.700"}
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      position="relative"
      transition="width 0.3s ease-out"
      boxShadow="xl"
    >
      <Flex flexDirection="row" alignItems="center">
        <Flex alignItems="center" textAlign="center" mr="3em" h="30px">
          <FontAwesomeIcon icon={["fab", "twitch"]} size="lg" color="#F6AD55" />
          <Link to="/dashboard" style={{ color: "#F6AD55" }}>
            <Heading fontSize="xl" fontWeight="bold" ml=".25em">
              UIBot
            </Heading>
          </Link>
        </Flex>
        <HStack spacing="2em" alignItems="flex-start" p="1em">
          {displayMenu()}
        </HStack>
      </Flex>
      {user && (
        <Menu>
          <MenuButton
            as={Flex}
            alignItems="center"
            borderRadius="6px"
            cursor="pointer"
          >
            <Avatar size="sm" src={user.picture} name={user.name} />
            <Text
              as="span"
              ml=".7em"
              display="inline"
              sx={{ "@media (max-width: 525px)": { display: "none" } }}
            >
              {user.name}
            </Text>
          </MenuButton>
          <MenuList>
            <MenuItem as={Link} to="/dashboard/disconnect">
              Disconnect
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </Flex>
  );
};
