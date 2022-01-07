import { Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { Loader } from ".";

type DataTableProps<T> = {
  columns: Array<string>;
  data: Array<T>;
  render: (item: T) => JSX.Element;
  loading?: boolean;
};

export const DataTable = <T extends any>({
  columns,
  data,
  render,
  loading,
}: DataTableProps<T>) => {
  return (
    <Table variant="simple" size="lg">
      <Thead>
        <Tr>
          {columns.map((column, idx) => (
            <Th key={idx}>{column}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {loading ? (
          <Tr>
            <Td colSpan={columns.length}>
              <Loader />
            </Td>
          </Tr>
        ) : (
          <>
            {data.map((item, idx) => (
              <Tr key={idx}>{render(item)}</Tr>
            ))}
            {data.length === 0 && (
              <Tr>
                <Td colSpan={columns.length}>
                  <Text textAlign="center">Nothing to display.</Text>
                </Td>
              </Tr>
            )}
          </>
        )}
      </Tbody>
    </Table>
  );
};
