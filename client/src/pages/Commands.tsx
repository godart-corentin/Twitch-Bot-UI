import { Heading, HStack, Td, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

import { DataTable } from "../components";
import { Command } from "../lib/types";
import { getCommands } from "../services/CommandService";

export const Commands = () => {
  const tableColumns = ["Name", "Command", "Message", "Policies", "Actions"];

  const [isLoading, setIsLoading] = useState(true);
  const [commands, setCommands] = useState<Array<Command>>([]);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <>
      <Heading size="lg" mb="2em">
        Commands
      </Heading>
      <DataTable
        columns={tableColumns}
        data={commands}
        loading={isLoading}
        render={(command) => {
          return (
            <>
              <Td>{command.name}</Td>
              <Td>{command.command}</Td>
              <Td>{command.message}</Td>
              <Td>
                <HStack>
                  {command.policies.admin && <FontAwesomeIcon icon="crown" />}
                  {command.policies.mod && (
                    <FontAwesomeIcon icon="shield-alt" />
                  )}
                  {command.policies.others && <FontAwesomeIcon icon="user" />}
                </HStack>
              </Td>
              <Td>Actions</Td>
            </>
          );
        }}
      />
      {error && (
        <Text textAlign="center" textColor="red.500" mt="2em">
          {error}
        </Text>
      )}
    </>
  );
};
