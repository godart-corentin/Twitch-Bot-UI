import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { MultipleInputHandler, Panel } from "../components";
import { AddOrUpdateSchedulerData } from "../lib/types";
import { createScheduler } from "../services/SchedulerService";

export const CreateScheduler = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [random, setRandom] = useState(false);
  const [messages, setMessages] = useState<{ name: string; value: string }[]>(
    []
  );

  /** Messages */

  const onAddMessage = (message: { name: string; value: string }) => {
    const newMessages = [...messages];
    newMessages.push(message);
    setMessages(newMessages);
  };

  const onChangeMessage = (message: { name: string; value: string }) => {
    let newMessages = [...messages];
    const idx = newMessages.findIndex((val) => val.name === message.name);
    newMessages[idx] = message;
    setMessages(newMessages);
  };

  /** Form */

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: AddOrUpdateSchedulerData) => {
    setIsSubmitting(true);

    const schedulerMessages = [...messages].map((msg) => msg.value);

    const dataToSubmit = {
      ...data,
      messages: schedulerMessages,
      random,
    };

    const { success, error } = await createScheduler(dataToSubmit);
    if (success) {
      navigate("/dashboard/schedulers", {
        state: {
          toast: {
            title: "Scheduler creation success",
            message: "The creation of the scheduler was successful.",
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
        Adding a scheduler
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
              <FormHelperText>Enter the name of the scheduler.</FormHelperText>
            ) : (
              <FormErrorMessage>Name is required.</FormErrorMessage>
            )}
          </FormControl>
          <FormControl mb="1em" isRequired isInvalid={errors.scheduler}>
            <FormLabel htmlFor="minutes">Interval (mins)</FormLabel>
            <NumberInput min={1} max={180}>
              <NumberInputField
                id="minutes"
                {...register("minutes", { required: true, min: 1, max: 180 })}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {!errors.scheduler ? (
              <FormHelperText>Enter the scheduler interval.</FormHelperText>
            ) : (
              <FormErrorMessage>
                Scheduler interval is required.
              </FormErrorMessage>
            )}
          </FormControl>
          <MultipleInputHandler
            id="messages"
            label="Messages"
            array={messages}
            onAddItem={onAddMessage}
            onChangeItem={onChangeMessage}
            mb="1em"
          />
          <Checkbox
            colorScheme="orange"
            isChecked={random}
            onChange={() => setRandom((state) => !state)}
          >
            Random
          </Checkbox>
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
