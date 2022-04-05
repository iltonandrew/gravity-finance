import Content from "components/PageComponents/content/Content";
import LoggedPageContainer from "components/PageComponents/LoggedPageContainer";
import Sidebar from "components/PageComponents/sidebar/Sidebar";

export default function StatementPage() {
    return (
        <LoggedPageContainer>
            <Sidebar></Sidebar>
            <Content title="Extrato"></Content>
        </LoggedPageContainer>
    );
}