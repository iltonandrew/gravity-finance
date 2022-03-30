import { Table, Thead, Tr, Th, Tbody } from "@chakra-ui/react";
import { FinanceDataType } from "public/model/FinanceData";
import StatementTableItem from "./StatementItem";
import StatementItem from "./StatementItem";

type StatementTableType = {
    statements: FinanceDataType[]
}

export default function StatementTable(props: StatementTableType) {

    return (
        <Table variant="unstyled" mt={4}>
              <Thead>
                <Tr color="gray">
                  <Th>Name of transaction</Th>
                  <Th>Category</Th>
                  <Th isNumeric>Amount</Th>
                </Tr>
              </Thead>
              <Tbody>
              {props.statements?.map((statement) => {
                    return (
                        <StatementItem statement={statement}></StatementItem>
                    )
                    })}
              </Tbody>
            </Table>
    )
}