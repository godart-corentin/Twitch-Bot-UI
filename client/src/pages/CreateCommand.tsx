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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Panel } from "../components";
import { AddCommandData } from "../lib/types";
import { createCommand } from "../services/CommandService";

export const CreateCommand = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [usableByMod, setUsableByMod] = useState(true);
  const [usableByViewers, setUsableByViewers] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: AddCommandData) => {
    setIsSubmitting(true);

    const dataToSubmit = {
      ...data,
      policies: { admin: true, mod: usableByMod, others: usableByViewers },
    };

    const { success, error } = await createCommand(dataToSubmit);
    if (success) {
      navigate("/dashboard/commands");
    } else {
      setFormError(error);
    }
  };

  return (
    <>
      <Heading size="lg" mb="2em">
        Adding a command
      </Heading>
      <Panel maxW="600px">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl mb="1em" isRequired isInvalid={errors.name}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              id="name"
              {...register("name", { required: true, minLength: 2 })}
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
              {...register("command", { required: true, minLength: 1 })}
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
              {...register("message", { required: true, min: 1 })}
            />
            {!errors.message ? (
              <FormHelperText>Enter the message of the command.</FormHelperText>
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
      </Panel>
    </>
  );
};
