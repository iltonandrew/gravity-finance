import { Table, Thead, Tr, Th, Tbody, Flex, Divider, IconButton, useBoolean, Heading, Text } from "@chakra-ui/react";
import { FinanceDataType } from "public/model/FinanceData";
import { MouseEventHandler } from "react";
import { FiRefreshCcw, FiChevronDown, FiChevronUp } from "react-icons/fi";
import StatementItem from "./StatementItem";

type StatementTableType = {
    title: string;
    lastUpdate: Date;
    enableRefresh?: boolean;
    statements: FinanceDataType[];
    onRefreshClicked?: MouseEventHandler<HTMLButtonElement> | undefined
}

export default function StatementTable(props: StatementTableType) {

  const [ display, toggleDisplay ] = useBoolean(false)

  return (

    <Flex flexDir="column">
      {/* Title */}
      <Flex justifyContent="space-between" mt={8}>
          <Flex align="flex-end">
            <Heading as="h2" size="lg" letterSpacing="tight">
              {props.title}
            </Heading>
            <Text fontSize="small" color="gray" ml={4}>
              {props.lastUpdate && "Ultima atualização " + new Date(props.lastUpdate).toLocaleString()}
            </Text>
          </Flex>
          <IconButton icon={<FiRefreshCcw />} onClick={props.onRefreshClicked} aria-label="aa" />
        </Flex>
      {/* Table */}
      <Flex overflow="auto">
        <Table variant="unstyled" mt={4}>
          <Thead>
            <Tr color="gray">
              <Th>Estabelecimento</Th>
              <Th>Categoria</Th>
              <Th isNumeric>Valor Gasto</Th>
              <Th>Banco</Th>
            </Tr>
          </Thead>
          <Tbody>
            {(display ? props.statements : props.statements.slice(0, 4)).map((statement) => {
              return (
                <StatementItem statement={statement}></StatementItem>
              )
            })}
          </Tbody>
        </Table>
      </Flex>
      {/* Toggle button */}
      <Flex align="center">
        <Divider />
        <IconButton
          icon={display ? <FiChevronUp /> : <FiChevronDown />}
          onClick={toggleDisplay.toggle}
          aria-label="aaa"
        />
        <Divider />
      </Flex>
    </Flex>
  )
}