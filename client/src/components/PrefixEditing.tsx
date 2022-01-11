import { useEffect, useState } from "react";
import {
  Editable,
  EditableInput,
  EditablePreview,
  Text,
} from "@chakra-ui/react";
import { getPrefix, updatePrefix } from "../services/PrefixService";
import { Loader } from ".";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const PrefixEditing = () => {
  const [prefix, setPrefix] = useState("!");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPrefix = async () => {
      const { prefix: pfx, error: err } = await getPrefix();
      if (pfx) {
        setPrefix(pfx);
      } else {
        setError(err);
      }
      setIsLoading(false);
    };

    fetchPrefix();
  }, []);

  const onSubmit = async (newValue: string) => {
    if (newValue !== prefix) {
      const { prefix: pfx, error: err } = await updatePrefix(newValue);
      if (pfx) {
        setSuccess(true);
      } else {
        setError(err);
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Editable
          textAlign="center"
          fontSize="3xl"
          fontWeight="bold"
          color="orange.300"
          isPreviewFocusable={true}
          defaultValue={prefix}
          onSubmit={onSubmit}
        >
          <EditablePreview />
          <EditableInput />
        </Editable>
      )}
      {success && (
        <Text textAlign="center" textColor="green.400" mt=".5em">
          Updated <FontAwesomeIcon icon="check-circle" color="#48BB78" />
        </Text>
      )}
      {error && (
        <Text textAlign="center" textColor="red.400" mt=".5em">
          {error}
        </Text>
      )}
    </>
  );
};
