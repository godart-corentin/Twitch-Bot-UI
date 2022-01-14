import {
  Box,
  Button,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SlideFade,
  Td,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { DataTable, Panel, PrefixEditing } from "../components";
import useWindowDimensions from "../hooks/window";
import { Command, LocationToastState } from "../lib/types";
import { deleteCommand, getCommands } from "../services/CommandService";

export const Commands = () => {
  const tableColumns = ["Name", "Command", "Message", "Policies", "Actions"];
  const mobileColumns = ["Name", "Command", "Policies", "Actions"];

  const [isLoading, setIsLoading] = useState(true);
  const [commands, setCommands] = useState<Array<Command>>([]);
  const [error, setError] = useState<string | null>(null);

  const [shouldMinifyMessage, setShouldMinifyMessage] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCommandId, setSelectedCommandId] = useState<string | null>(
    null
  );

  const { width } = useWindowDimensions();
  const location = useLocation();
  const toast = useToast();

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

  useEffect(() => {
    const locationState = location.state as LocationToastState;
    if (locationState && locationState.toast) {
      toast({
        ...locationState.toast,
        duration: 3000,
        isClosable: true,
      });
    }
  }, [location.state, toast]);

  const selectCommandForDelete = (id: string) => {
    setSelectedCommandId(id);
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCommandId(null);
  };

  const onDeleteCommand = async () => {
    if (selectedCommandId) {
      const { error } = await deleteCommand(selectedCommandId);
      if (error) {
        toast({
          title: "Command deletion failed",
          status: "error",
          description: error,
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Command deletion success",
          status: "success",
          description: "The deletion of the command was successful.",
          duration: 3000,
          isClosable: true,
        });
        const newCommands = commands.filter((c) => c.id !== selectedCommandId);
        setCommands(newCommands);
      }
      setIsModalOpen(false);
      setSelectedCommandId(null);
    }
  };

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
                    <Box
                      transition="color 0.3s ease-out"
                      _hover={{ color: "orange.300" }}
                    >
                      <Link to={`/dashboard/commands/update/${command.id}`}>
                        <FontAwesomeIcon icon="edit" />
                      </Link>
                    </Box>
                    <Box
                      transition="color 0.3s ease-out"
                      _hover={{ color: "orange.300" }}
                      cursor="pointer"
                      onClick={() =>
                        selectCommandForDelete(command.id as string)
                      }
                    >
                      <FontAwesomeIcon icon="trash-alt" />
                    </Box>
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
      <Modal isOpen={isModalOpen} onClose={onCloseModal} isCentered>
        <ModalOverlay />

        <ModalContent bg={useColorModeValue("white", "dark.700")}>
          <ModalHeader>Delete confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Are you sure you wan't to delete this command ?</p>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="gray"
              variant="solid"
              mr={3}
              onClick={onCloseModal}
            >
              Cancel
            </Button>
            <Button colorScheme="red" variant="solid" onClick={onDeleteCommand}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
