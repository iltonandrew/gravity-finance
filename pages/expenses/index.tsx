import { Flex } from "@chakra-ui/react";
import Content from "components/PageComponents/content/Content";
import LoggedPageContainer from "components/PageComponents/LoggedPageContainer";
import Sidebar from "components/PageComponents/sidebar/Sidebar";

export default function ExpensesPage() {
    return (
        <LoggedPageContainer>
            <Sidebar></Sidebar>
            <Content title="Maiores Despesas"></Content>
        </LoggedPageContainer>
    );
}