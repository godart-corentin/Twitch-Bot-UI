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
  useToast,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { DataTable, Panel } from "../components";
import { LocationToastState, Scheduler } from "../lib/types";
import { deleteScheduler, getSchedulers } from "../services/SchedulerService";

export const Schedulers = () => {
  const tableColumns = [
    "Name",
    "Is Random ?",
    "Minutes",
    "Messages",
    "Actions",
  ];
  const mobileColumns = [
    "Name",
    "Is Random ?",
    "Minutes",
    "Messages",
    "Actions",
  ];

  const [isLoading, setIsLoading] = useState(true);
  const [schedulers, setSchedulers] = useState<Array<Scheduler>>([]);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSchedulerId, setSelectedSchedulerId] = useState<string | null>(
    null
  );

  const location = useLocation();
  const toast = useToast();

  useEffect(() => {
    let mounted = true;
    const fetchSchedulers = async () => {
      if (mounted) {
        const { schedulers: data, error: err } = await getSchedulers();
        setSchedulers(data);
        setError(err);
        setIsLoading(false);
      }
    };

    fetchSchedulers();

    return () => {
      mounted = false;
    };
  }, []);

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

  const selectSchedulerForDelete = (id: string) => {
    setSelectedSchedulerId(id);
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSchedulerId(null);
  };

  const onDeleteScheduler = async () => {
    if (selectedSchedulerId) {
      const { error } = await deleteScheduler(selectedSchedulerId);
      if (error) {
        toast({
          title: "Scheduler deletion failed",
          status: "error",
          description: error,
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Scheduler deletion success",
          status: "success",
          description: "The deletion of the scheduler was successful.",
          duration: 3000,
          isClosable: true,
        });
        const newSchedulers = schedulers.filter(
          (c) => c.id !== selectedSchedulerId
        );
        setSchedulers(newSchedulers);
      }
      setIsModalOpen(false);
      setSelectedSchedulerId(null);
    }
  };

  return (
    <>
      <Heading size="lg" mb="2em">
        Schedulers
      </Heading>
      <SlideFade in={!isLoading} offsetY="20px">
        <Panel
          heading="Scheduler List"
          actions={[
            {
              type: "Button",
              navigationLink: "/dashboard/schedulers/create",
              element: <FontAwesomeIcon icon="plus-circle" />,
            },
          ]}
        >
          <DataTable
            columns={tableColumns}
            mobileColumns={mobileColumns}
            data={schedulers}
            loading={isLoading}
            render={(scheduler, isMobile) => (
              <>
                <Td>{scheduler.name}</Td>
                <Td>{scheduler.random ? "Yes" : "No"}</Td>
                <Td>{scheduler.minutes}</Td>
                <Td>{scheduler.messages.length}</Td>
                <Td>
                  <HStack>
                    <Box
                      transition="color 0.3s ease-out"
                      _hover={{ color: "orange.300" }}
                    >
                      <Link to={`/dashboard/schedulers/update/${scheduler.id}`}>
                        <FontAwesomeIcon icon="edit" />
                      </Link>
                    </Box>
                    <Box
                      transition="color 0.3s ease-out"
                      _hover={{ color: "orange.300" }}
                      cursor="pointer"
                      onClick={() =>
                        selectSchedulerForDelete(scheduler.id as string)
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

        <ModalContent bg={"dark.700"}>
          <ModalHeader>Delete confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Are you sure you wan't to delete this scheduler ?</p>
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
            <Button
              colorScheme="red"
              variant="solid"
              onClick={onDeleteScheduler}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
