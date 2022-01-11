import { Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Loader } from "..";
import useWindowDimensions from "../../hooks/window";

import "./DataTable.css";

type DataTableProps<T> = {
  columns: Array<string>;
  mobileColumns?: Array<string>;
  data: Array<T>;
  render: (item: T, isMobile: boolean) => JSX.Element;
  loading?: boolean;
};

export const DataTable = <T extends any>({
  columns,
  mobileColumns,
  data,
  render,
  loading,
}: DataTableProps<T>) => {
  const [isMobile, setIsMobile] = useState(false);

  const { width } = useWindowDimensions();

  useEffect(() => {
    setIsMobile(width < 767);
  }, [width]);

  const displayColumns = (cols: Array<string>) => (
    <>
      {cols.map((column, idx) => (
        <Th key={idx}>{column}</Th>
      ))}
    </>
  );

  return (
    <Table className="dataTable" variant="simple" size="lg">
      <Thead>
        <Tr>
          {mobileColumns
            ? isMobile
              ? displayColumns(mobileColumns)
              : displayColumns(columns)
            : displayColumns(columns)}
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
              <Tr key={idx}>{render(item, isMobile)}</Tr>
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
