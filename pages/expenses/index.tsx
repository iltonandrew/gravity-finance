import { Flex } from "@chakra-ui/react";
import Content from "components/content/Content";
import Sidebar from "components/sidebar/Sidebar";

export default function ExpensesPage() {
    return (
        <Flex h={[null, null, "100vh"]} maxW="2000px" flexDir={["column", "column", "row"]} overflow="hidden">
            <Sidebar></Sidebar>
            <Content title="Maiores Despesas"></Content>
        </Flex>
    );
}