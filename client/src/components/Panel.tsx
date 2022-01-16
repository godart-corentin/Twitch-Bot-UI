import { Box, BoxProps, Flex, Heading, HStack, Menu } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PanelAction } from "../lib/types";

interface PanelProps extends BoxProps {
  heading?: string;
  actions?: Array<PanelAction>;
}

export const Panel: React.FC<PanelProps> = ({
  heading,
  actions,
  children,
  ...rest
}) => {
  const panelBg = "dark.700";
  const actionBg = "dark.800";
  const actionBgHovered = "dark.750";

  return (
    <Box
      bg={panelBg}
      p="2em"
      borderRadius="lg"
      sx={{ "@media (max-width: 999px)": { p: "1em" } }}
      {...rest}
    >
      {heading || actions ? (
        <Flex justifyContent="space-between" alignItems="center" mb="1em">
          {heading && <Heading size="md">{heading}</Heading>}
          {actions && (
            <HStack>
              {actions.map((action, idx) =>
                action.type === "Button" ? (
                  action.navigationLink ? (
                    <Link to={action.navigationLink} key={idx}>
                      <Box
                        bg={actionBg}
                        p=".5em .7em"
                        borderRadius="md"
                        cursor="pointer"
                        _hover={{
                          bg: actionBgHovered,
                        }}
                        onClick={action.onClick}
                      >
                        {action.element}
                      </Box>
                    </Link>
                  ) : (
                    <Box
                      key={idx}
                      bg={actionBg}
                      p=".5em .7em"
                      borderRadius="md"
                      cursor="pointer"
                      _hover={{
                        bg: actionBgHovered,
                      }}
                      onClick={action.onClick}
                    >
                      {action.element}
                    </Box>
                  )
                ) : (
                  <Menu>{action.element}</Menu>
                )
              )}
            </HStack>
          )}
        </Flex>
      ) : null}
      {children}
    </Box>
  );
};
