import { Flex, Heading, Text } from "@chakra-ui/react";
import BankCard from "components/bank/BankCard";
import Content from "components/content/Content";
import Sidebar from "components/sidebar/Sidebar";
import { AuthContext } from "contexts/AuthContext";
import { useContext } from "react";

export default function Bank() {

    let { user } = useContext(AuthContext);

    let banks: string[] = ['BTG', 'BanKoga', 'Nubank']

    return (
        
    <Flex h={[null, null, "100vh"]} maxW="2000px" flexDir={["column", "column", "row"]} overflow="hidden">
      {/* Column 1 */}
      <Sidebar></Sidebar>

      {/* Column 2 */}
      <Content title="Meus Bancos">
        {
          banks.map((bankName) => {
            return (
              <BankCard name={bankName}></BankCard>
            )
          })
        }
      </Content>

      {/* Column 3 */}
      <Flex
        w={["100%", "100%", "30%"]}
        bgColor="#555555"
        p="3%"
        flexDir="column"
        overflow="auto"
        minW={[null, null, "300px", "300px", "400px"]}
      >
        <Text>??</Text>
      </Flex>
    </Flex>
    )
}