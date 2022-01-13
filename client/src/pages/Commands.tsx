import { Heading, HStack, SlideFade, Td, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { DataTable, Panel, PrefixEditing } from "../components";
import useWindowDimensions from "../hooks/window";
import { Command } from "../lib/types";
import { getCommands } from "../services/CommandService";

export const Commands = () => {
  const tableColumns = ["Name", "Command", "Message", "Policies", "Actions"];
  const mobileColumns = ["Name", "Command", "Policies", "Actions"];

  const [isLoading, setIsLoading] = useState(true);
  const [commands, setCommands] = useState<Array<Command>>([]);
  const [error, setError] = useState<string | null>(null);
  const [shouldMinifyMessage, setShouldMinifyMessage] = useState(false);

  const { width } = useWindowDimensions();

  useEffect(() => {
    let mounted = true;
    const fetchCommands = async () => {
      if (mounted) {
        const { commands: data, error: err } = await getCommands();
        setCommands(data);
        setError(err);
        setIsLoading(false);
      }
    };

    fetchCommands();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (width < 1000) {
      setShouldMinifyMessage(true);
    } else {
      setShouldMinifyMessage(false);
    }
  }, [width]);

  return (
    <>
      <Heading size="lg" mb="2em">
        Commands
      </Heading>
      <SlideFade in={!isLoading} offsetY="20px">
        <Panel heading="Prefix" pos="relative" w="33%" mb="2em">
          <PrefixEditing />
        </Panel>
      </SlideFade>
      <SlideFade in={!isLoading} offsetY="20px">
        <Panel
          heading="Command List"
          actions={[
            {
              type: "Button",
              navigationLink: "/dashboard/commands/create",
              element: <FontAwesomeIcon icon="plus-circle" />,
            },
          ]}
        >
          <DataTable
            columns={tableColumns}
            mobileColumns={mobileColumns}
            data={commands}
            loading={isLoading}
            render={(command, isMobile) => (
              <>
                <Td>{command.name}</Td>
                <Td>{command.command}</Td>
                {!isMobile && (
                  <Td wordBreak="break-all">
                    {shouldMinifyMessage ? "..." : command.message}
                  </Td>
                )}
                <Td>
                  <HStack>
                    {command.policies.admin && (
                      <FontAwesomeIcon icon="crown" color="#F6AD55" />
                    )}
                    {command.policies.mod && (
                      <FontAwesomeIcon icon="shield-alt" color="#68D391" />
                    )}
                    {command.policies.others && (
                      <FontAwesomeIcon icon="user" color="#9F7AEA" />
                    )}
                  </HStack>
                </Td>
                <Td>
                  <HStack>
                    <Link to={`/dashboard/commands/update/${command.id}`}>
                      <FontAwesomeIcon icon="edit" />
                    </Link>
                  </HStack>
                </Td>
              </>
            )}
          />
          {error && (
            <Text textAlign="center" textColor="red.500" mt="2em">
              {error}
            </Text>
          )}
        </Panel>
      </SlideFade>
    </>
  );
};
