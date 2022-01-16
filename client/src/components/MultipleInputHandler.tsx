import {
  Button,
  FormControl,
  FormControlProps,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { ChangeEvent } from "react";

interface MultipleInputHandlerProps extends FormControlProps {
  id: string;
  label: string;
  array: Array<{ name: string; value: string }>;
  onAddItem: (item: { name: string; value: string }) => void;
  onChangeItem: (item: { name: string; value: string }) => void;
}

export const MultipleInputHandler: React.FC<MultipleInputHandlerProps> = ({
  id,
  label,
  array,
  onAddItem,
  onChangeItem,
  ...rest
}) => {
  const addItem = () => {
    onAddItem({ name: `input-${array.length + 1}`, value: "" });
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleMultipleChanges(e);
  };

  const handleMultipleChanges = (e: ChangeEvent<HTMLInputElement>) => {
    let currentInput = array.find((val) => val.name === e.target.name);
    if (currentInput) {
      currentInput.value = e.target.value;

      onChangeItem(currentInput);
    }
  };

  return (
    <FormControl {...rest}>
      <FormLabel htmlFor={id}>
        {label}{" "}
        <Text as="span" color="red.300">
          *
        </Text>
      </FormLabel>
      {array.map((item, key) => (
        <Input
          key={key}
          id={id}
          name={item.name}
          value={item.value}
          onChange={onChange}
          mb=".5em"
        />
      ))}
      <Button
        bg="orange.400"
        textColor="white"
        variant="solid"
        _hover={{ bg: "orange.300" }}
        onClick={addItem}
      >
        Add new message
      </Button>
    </FormControl>
  );
};
