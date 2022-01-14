import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import { Loader, Panel } from "../components";
import { AddOrUpdateCommandData, Command } from "../lib/types";
import { getCommandById, updateCommand } from "../services/CommandService";

export const EditCommand = () => {
  const [command, setCommand] = useState<Command | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [usableByMod, setUsableByMod] = useState(true);
  const [usableByViewers, setUsableByViewers] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);

  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCommandById = async (id: string) => {
      const { command: cmd, error } = await getCommandById(id);
      if (cmd) {
        setCommand(cmd);
        setUsableByMod(cmd.policies.mod || false);
        setUsableByViewers(cmd.policies.others || false);
      } else {
        setFormError(error);
      }
      setIsLoading(false);
    };

    if (id) {
      fetchCommandById(id);
    }
  }, [id]);

  const onSubmit = async (data: AddOrUpdateCommandData) => {
    setIsSubmitting(true);

    const dataToSubmit = {
      ...data,
      id: command?.id,
      policies: { admin: true, mod: usableByMod, others: usableByViewers },
    };

    const { success, error } = await updateCommand(dataToSubmit);
    if (success) {
      navigate("/dashboard/commands", {
        state: {
          toast: {
            title: "Command update success",
            message: "The update of the command was successful.",
            status: "success",
          },
        },
      });
    } else {
      setFormError(error);
    }
  };

  return (
    <>
      <Heading size="lg" mb="2em">
        Updating a command
      </Heading>
      <Panel maxW="600px">
        {isLoading ? (
          <Loader />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl mb="1em" isRequired isInvalid={errors.name}>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                id="name"
                {...register("name", {
                  required: true,
                  minLength: 2,
                  value: command?.name,
                })}
              />
              {!errors.name ? (
                <FormHelperText>Enter the name of the command.</FormHelperText>
              ) : (
                <FormErrorMessage>Name is required.</FormErrorMessage>
              )}
            </FormControl>
            <FormControl mb="1em" isRequired isInvalid={errors.command}>
              <FormLabel htmlFor="command">Command</FormLabel>
              <Input
                id="command"
                {...register("command", {
                  required: true,
                  minLength: 1,
                  value: command?.command,
                })}
              />
              {!errors.command ? (
                <FormHelperText>Enter the command.</FormHelperText>
              ) : (
                <FormErrorMessage>Command is required.</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isRequired isInvalid={errors.message} mb="1em">
              <FormLabel htmlFor="message">Message</FormLabel>
              <Textarea
                id="message"
                {...register("message", {
                  required: true,
                  min: 1,
                  value: command?.message,
                })}
              />
              {!errors.message ? (
                <FormHelperText>
                  Enter the message of the command.
                </FormHelperText>
              ) : (
                <FormErrorMessage>Message is required.</FormErrorMessage>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Command usable by:</FormLabel>
              <Stack spacing={5} direction="row">
                <Checkbox colorScheme="orange" isDisabled defaultChecked>
                  Admin
                </Checkbox>
                <Checkbox
                  colorScheme="orange"
                  isChecked={usableByMod}
                  onChange={() => setUsableByMod((state) => !state)}
                >
                  Mod
                </Checkbox>
                <Checkbox
                  colorScheme="orange"
                  isChecked={usableByViewers}
                  onChange={() => setUsableByViewers((state) => !state)}
                >
                  Viewers
                </Checkbox>
              </Stack>
            </FormControl>
            {formError && (
              <Text color="red.500" textAlign="center" my=".5em">
                {formError}
              </Text>
            )}
            <Stack direction="row" justifyContent="flex-end" spacing={4}>
              <Button
                type="submit"
                isLoading={isSubmitting}
                loadingText="Submitting"
                bg="orange.400"
                textColor="white"
                variant="solid"
                _hover={{ bg: "orange.300" }}
              >
                Submit
              </Button>
            </Stack>
          </form>
        )}
      </Panel>
    </>
  );
};
