import { Flex, Heading, Avatar, Text, Tr, Td } from "@chakra-ui/react";
import { FinanceDataType } from "public/model/FinanceData";

type StatementTableItemType = {
  statement: FinanceDataType
}

export default function StatementTableItem(props: StatementTableItemType) {
  return (
    <Tr>
      <Td>
        <Flex align="center">
          <Avatar size="sm" mr={2} src="amazon.jpeg" />
          <Flex flexDir="column">
            <Heading size="sm" letterSpacing="tight">
              {props.statement.establishmentName}
            </Heading>
            <Text fontSize="sm" color="gray">
              {new Date(props.statement.referenceDate).toLocaleString()}
            </Text>
          </Flex>
        </Flex>
      </Td>
      <Td>{props.statement.establishmentType}</Td>
      <Td isNumeric>
        <Text fontWeight="bold" display="inline-table">
          ${props.statement.value}
        </Text>
      </Td>
      <Td>{props.statement.originInstitution}</Td>
    </Tr>
  );
}
